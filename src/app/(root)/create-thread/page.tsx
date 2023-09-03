import React from 'react';
import {currentUser} from "@clerk/nextjs";
import {fetchUser} from "@/lib/actions/user.actions";
import {redirect} from "next/navigation";
import PostThread from "@/components/forms/PostThread";


const Page = async () => {
    const user= await currentUser();
    if(!user) return null;
    const userInfo:any=await fetchUser(user.id)
    console.log(userInfo?._id)
    if(!userInfo?.onboarded) redirect('/onboarding')
    return (

            <>
                <h1 className={`head-text`}>Create Thread</h1>
                <PostThread userId={userInfo._id}/>
            </>


    );
};

export default Page;