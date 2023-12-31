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
import { Input } from "@/components/ui/input"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {userValidation} from "@/lib/validations/user";
import {z} from "zod";
import Image from "next/image";
import {isBase64Image} from "@/lib/utils";
import {useUploadThing} from "@/lib/validations/uploadthing";
import {updateUser} from "@/lib/actions/user.actions";
import {usePathname, useRouter} from "next/navigation";
import {Textarea} from "@/components/ui/textarea";
import {useUser} from "@clerk/nextjs";





const AccountProfile = ({user, btnTitle}:any) => {
    const cur=useUser();
    const [files, setFiles] = useState<File[]>([])
     const {startUpload}=useUploadThing('media');
    const router=useRouter();
    const pathname=usePathname();

    console.log(user)
    const handleImage=(e:ChangeEvent<HTMLInputElement>,fieldChange:(value:string)=>void)=>{
        e.preventDefault();
        const fileReader=new FileReader();
        if(e.target.files && e.target.files.length>0)
        {

            const file=e.target.files[0];
            setFiles(Array.from(e.target.files))

            if(!file.type.includes('image'))return;

            fileReader.onload=async (event)=>{
                const imageDataUrl=event.target?.result?.toString()||'';
                fieldChange(imageDataUrl)
            }
            fileReader.readAsDataURL(file)
        }

    }
    async function onSubmit(values: z.infer<typeof userValidation>) {
        // Do something with the form values.
        const blob=values.profile_photo;
        const hasImageChanged=isBase64Image(blob);
        // ✅ This will be type-safe and validated.
        if(hasImageChanged){
                  const imageRes= await startUpload(files)

            if(imageRes && imageRes[0].fileUrl)
            {
                values.profile_photo=imageRes[0].fileUrl;
               await cur.user?.setProfileImage({file:files[0]})
            }
        }
        //This is quite messed up because you have to match the sequence of Database
        //for example if id is the first element you have to provide the first element id only here.
        // await  updateUser(
        //     user.id,
        //     values.username,
        //     values.name,
        //     values.bio,
        //     values.profile_photo,
        //     pathname
        //     )This is better approach
        await updateUser({
            userId:user.id,
            username:values.username,
            name:values.name,
            bio:values.bio,
            image:values.profile_photo,
            path:pathname
        });
           if(pathname==='/profile/edit'){
               router.back();
           }else{
               router.push('/')
           }
    }

    const form=useForm({
        resolver:zodResolver(userValidation),
        defaultValues:{
            profile_photo:user?.profile_photo||'',
            name:user?.firstname||'',
            username:user?.username||'',
            bio:''
        }
    });
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col justify-start gap-10">
                <FormField
                    control={form.control}
                    name="profile_photo"
                    render={({ field }) => (
                        <FormItem className={`flex items-center gap-4`}>
                            <FormLabel className={`account-form_image-label`}>
                                {
                                    field.value?(
                                        <Image src={field.value} alt={'profile photo'}
                                               width={96} height={96} priority

                                               layout="responsive"
                                               className={`rounded-full object-contain`}/>
                                    ):(
                                        <Image src={'/assets/profile.svg'} alt={'profile photo'}
                                               width={24} height={24}
                                               className={`rounded-full object-contain`}/>
                                    )
                                }
                            </FormLabel>
                            <FormControl className={`flex-1 text-base-semibold text-gray-200`}>
                                <Input type='file' accept='image/*' placeholder="Upload a photo"
                                className='account-form_image-input' onChange={(e)=>handleImage(e,field.onChange)}/>
                            </FormControl>


                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className={`flex flex-col w-full gap-3`}>
                            <FormLabel className={`text-base-semibold text-light-2`}>
                             Name
                            </FormLabel>
                            <FormControl >
                                <Input type='text'
                                       className='account-form_input no-focus' {...field} />
                            </FormControl>


                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem className={`flex flex-col w-full gap-3`}>
                            <FormLabel className={`text-base-semibold text-light-2`}>
                                Username
                            </FormLabel>
                            <FormControl >
                                <Input type='text'
                                       className='account-form_input no-focus' {...field} />
                            </FormControl>


                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        <FormItem className={`flex flex-col w-full gap-3`}>
                            <FormLabel className={`text-base-semibold text-light-2`}>
                                bio
                            </FormLabel>
                            <FormControl >
                                <Textarea
                                       className='account-form_input  no-focus' rows={6} {...field} />
                            </FormControl>


                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
};

export default AccountProfile;