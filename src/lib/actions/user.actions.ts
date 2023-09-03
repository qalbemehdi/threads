"use server"
import dbConnect from "@/lib/dbConn";
import User from "@/lib/models/user.model";
import {revalidatePath} from "next/cache";
import Thread from "@/lib/models/thread.model";
import {FilterQuery} from "mongoose";
import dbConn from "@/lib/dbConn";


interface Params{
    userId: String,
    username: String,
    name: String,
    bio: String,
    image: String,
    path: string,

}

export async function updateUser(
    {
        userId,
        username,
        name,
        bio,
        image,
        path,

    }:Params
    ){
   await dbConnect();
   try {
     const user= await User.findOneAndUpdate(
           {id:userId},
           {
               username:username.toLowerCase(),
               name:name,
               bio:bio,
               image:image,
               onboarded:true
           },
           {upsert:true,new:true}
       )



       console.log(user)
       if(path==='/profile/edit'){
           revalidatePath(path)
       }
   }
   catch (e:any) {
       throw new Error(`failed to create/update user ${e.message}`)
   }
}
export async function fetchUser(userId:string)
{
    try {
        await dbConnect();
        return await User.findOne({id:userId});
    }
    catch (e:any) {
        throw new Error(e.message)
    }
}
export async function fetchUserPosts(userId:string){
    await dbConnect();
    const posts=await Thread.find({author:userId,$or: [{parentId: null}, {parentId: {$exists:false}}]})
        .sort({createdAt:-1})
        .populate({
            path:'author',
            model:User
        })
        .populate({
            path:'children',
            model:Thread,
            populate:{
                path:'author',
                model:User,
                select:'name id image'
            }
        }).exec()

    return posts;
}

export async function fetchUsers({
                                     userId,
                                     pageNumber,
                                     searchString,
                                     pageSize,
                                 }:{
    userId:string,
    pageNumber:number,
    searchString:string,
    pageSize:number
}){
try {
    await dbConnect();
    const query:FilterQuery<typeof User>={
        id:{$nin:userId}
    }

    if(searchString.trim()!==''){
        query.$or=[ { username: { $regex: searchString, $options: 'i' } },
            { name: { $regex: searchString, $options: 'i' } },];
    }
    const skipAmount=(pageNumber-1)*pageSize;
    const usersQuery=await User.find(query)
        .skip(skipAmount)
        .limit(pageSize)
        .sort({"_id":1}).exec()
     const totalUserCount=await User.countDocuments(query);

    //My own Logic
    const isNext=(totalUserCount-pageNumber*pageSize)>0
   // console.log( isNext)
    return {usersQuery,isNext}
}
catch (e:any) {
    throw new Error(e.message)
}
}

export async function getActivity(userId:string){
    try {
        await dbConnect();
        const userThreads=await Thread.find({author:userId});
        const childThreads=userThreads.reduce((acc,userThread)=>(acc.concat(userThread.children)),[])
        const replies=await Thread.find({_id:{$in:childThreads},author:{$nin:userId}
        }).populate({
            path:'author',
            model:User,
            select:'name image _id'
        })
        console.log(replies)
        return replies

    }
    catch (e:any) {
        throw new Error(e.message)
    }
}