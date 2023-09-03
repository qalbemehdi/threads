'use server'
import dbConnect from "@/lib/dbConn";
import Thread from "@/lib/models/thread.model";
import User from "@/lib/models/user.model";
import {revalidatePath} from "next/cache";
import comment from "@/components/forms/Comment";
import mongoose, {ObjectId} from "mongoose";

interface Params{
    text:string,
    author:string,
    communityId:string | null,
    path:string,
}
interface Comment{
    threadId:string,
    commentText:string,
    userId:string,
    path:string
}
export async function createThread({text,author,communityId,path}:Params){
try {
    await dbConnect();
    const createdThread=await Thread.create({
        text,
        author,
        community:communityId,
        parentId:null,
    });

    await User.findByIdAndUpdate(author,{
        $push:{threads:createdThread._id}
    })
    revalidatePath(path)
}
  catch (e:any) {
      throw new Error("This is the error : "+e.message )
  }
}

export async function fetchThreads(pageNumber=1,pageSize=20){
    await dbConnect();
    const skipAmount=(pageNumber-1)*pageSize
    const postsQuery=await Thread.find({$or: [{parentId: null}, {parentId: {$exists:false}}]})
        .sort({_id:-1})
        .skip(skipAmount)
        .limit(pageSize)
        .populate({path:'author',model:User})
        .populate({
            path:'children',
            populate:{
                path:'author',
                model:User,
                select:'_id name parentId image'
            }
        }).exec()

    const totalPostCount=await Thread.countDocuments({parentID:{$in:[null,undefined]}})
    const isNext=totalPostCount > skipAmount + postsQuery.length;
    return{postsQuery,isNext};
}

export async function fetchThreadById(id:String){
    try {
        await dbConnect();
        const thread= await Thread.findOne({_id:id})
            .populate({
                path:'author',
                model:User,
                select:'_id id name image'
            })
            .populate({
                path:'children',
                options: { sort: { '_id': -1 } },
                populate:[
                    {
                        path:'author',
                        model:User,
                        select:"_id id name parentId image"
                    },
                    {
                        path:'children',
                        model:Thread,
                        populate:{
                            path:'author',
                            model:User,
                            select:'_id id name parentId image'
                        }
                    }
                ]
            }).exec();
        // console.log(thread)
        return thread;
    }
    catch (e:any) {
        throw new Error(e.message)
    }

}

export async function addCommentToThread(
    {
        threadId,
        commentText,
        userId,
        path
    }:Comment
){
    await dbConnect()
    try {
        const originalThread= await Thread.findById(threadId);
        if(!originalThread){
            throw new Error("Thread not Found")
        }
         const commentThread=new Thread({
             text:commentText,
             author:userId,
             parentId:threadId
         })
        const savedCommentThread = await commentThread.save();

        originalThread.children.push(savedCommentThread._id);
        await originalThread.save();
         revalidatePath(path)
    }
    catch (e:any) {
            throw new Error(`Error adding comment to thread:${e.message}`)
    }
}