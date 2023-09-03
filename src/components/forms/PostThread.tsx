'use client'
import React, {ChangeEvent, useState} from 'react';
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {usePathname, useRouter} from "next/navigation";
import {Textarea} from "@/components/ui/textarea";
import {threadValidation} from "@/lib/validations/thread";
import {createThread} from "@/lib/actions/thread.action";


const PostThread = ({userId}:any) => {

    const router=useRouter();
    const pathname=usePathname();


    async function onSubmit(values: z.infer<typeof threadValidation>) {
              await createThread({
                  text:values.thread,
                  author:values.accountId,
                  communityId:null,
                  path:pathname

              })
        router.push("/")
        router.refresh();
    }

    const form=useForm({
        resolver:zodResolver(threadValidation),
        defaultValues:{
          thread:'',
            accountId:userId
        }
    });
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col justify-start gap-10">
                <FormField
                    control={form.control}
                    name="thread"
                    render={({ field }) => (
                        <FormItem className={`mt-10 flex flex-col w-full gap-3`}>
                            <FormLabel className={`text-base-semibold text-light-2`}>
                                Content
                            </FormLabel>
                            <FormControl  className='no-focus border border-dark-4
                                                    bg-dark-3 text-light-1' >
                                <Textarea
                                    rows={15} {...field} />
                            </FormControl>


                        </FormItem>
                    )}
                />
                <Button className={`bg-primary-500`} type="submit">Submit</Button>
            </form>
        </Form>
    );
};

export default PostThread;