import React from 'react';
import AccountProfile from "@/components/forms/AccountProfile";
import {currentUser} from "@clerk/nextjs";

const Page =async () => {
    interface UserData {
        profile_photo: string;
        id: string | undefined ;
        username: string;
        firstname: string;
        lastname: string;
    }
    const user=await currentUser();

    const userInfo={}

    const userData:UserData={
        profile_photo: user?.imageUrl||"",
        id:user?.id,
        username:user?.username||"",
        firstname:user?.firstName||"",
        lastname:user?.lastName||""
    }
    return (

        <main className='bg-dark-1 min-h-screen '>
            <div className={`flex flex-col max-w-3xl mx-auto px-10 py-20`}>
                <h1 className={`head-text`}>Onboarding</h1>
                <p className={`mt-3 text-base-regular text-light-2`}>Complete your profile now to use Threads</p>

                <section className={`mt-9 bg-dark-2 p-10`}>
                      <AccountProfile user={userData} btnTitle={"Continue"}/>
                </section>
            </div>
        </main>
    );
};

export default Page;