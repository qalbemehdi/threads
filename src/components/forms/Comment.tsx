"use client"
import React from 'react';
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {commentValidation, threadValidation} from "@/lib/validations/thread";
import {usePathname, useRouter} from "next/navigation";
import {z} from "zod";
import {addCommentToThread, createThread} from "@/lib/actions/thread.action";
import Image from "next/image";
import {ObjectId} from "mongoose";
interface Props{
    threadId:string,
    currentUserImg:string,
    currentUserId:string
}
const Comment = ({threadId,currentUserImg, currentUserId}:Props) => {
    const router=useRouter();
    const pathname=usePathname();


    async function onSubmit(values: z.infer<typeof commentValidation>) {
        await addCommentToThread({
            commentText:values.thread,
            userId:currentUserId,
            threadId:threadId,
            path:pathname

        })
        console.log(threadId)
        form.reset();
        router.refresh();
    }
    const form=useForm({
        resolver:zodResolver(commentValidation),
        defaultValues:{
            thread:'',
        }
    });
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
                  className="comment-form">
                <FormField
                    control={form.control}
                    name="thread"
                    render={({ field }) => (
                        <FormItem className={`flex flex-row items-center w-full gap-3`}>
                            <FormLabel className={`text-base-semibold text-light-2`}>
                                <Image
                                    className={`rounded-full object-cover`}
                                    src={currentUserImg} alt={'profile image'}
                                    width={48} height={48}
                                />
                            </FormLabel>
                            <FormControl  className='border-none bg-transparent' >
                                <Input type='text'
                                       placeholder='Comment...'
                                       className='no-focus text-light-1
                                       outline-none !m-0'
                                     {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button className={`comment-form_btn`} type="submit">Reply</Button>
            </form>
        </Form>
    );
};

export default Comment;