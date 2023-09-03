import React from 'react';
import {currentUser} from "@clerk/nextjs";
import {fetchUser} from "@/lib/actions/user.actions";
import {redirect} from "next/navigation";
import ProfileHeader from '@/components/shared/ProfileHeader';
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {profileTabs} from "@/constants";
import Image from "next/image";
import ThreadTabs from "@/components/shared/ThreadTabs";

const Page =async ({params}:{params:{id:string}}) => {
    const user=await currentUser();
    if(!user) return null;
    const userInfo=await fetchUser(params.id)
    // console.log(userInfo._id)
    return (
        <section>
            <ProfileHeader
            accountId={userInfo._id}
            authUserId={user.id}
            name={userInfo.name}
            username={userInfo.username}
            imageUrl={userInfo.image}
            bio={userInfo.bio}
            />
            <div className={`mt-9`}>
                <Tabs defaultValue="threads" className="w-full ">
                    <TabsList className="tab ">
                        {
                            profileTabs.map((tab:any)=>(
                                <TabsTrigger className={`tab`} key={tab.value} value={tab.value}>

                                        <Image className={`object-contain`} src={tab.icon} alt={'icon'} width={24} height={24}/>
                                       <p className={`max-sm:hidden`}>{tab.label}</p>
                                    {tab.value==='threads' &&(
                                        <p className={'ml-1 rounded-sm bg-light-4 px-2 py-1 text-tiny-medium text-light-2'}>
                                            {userInfo?.threads?.length}</p>
                                    )}

                                </TabsTrigger>
                            ))
                        }
                    </TabsList>
                    {
                        profileTabs.map((tab)=>(
                            <TabsContent key={`content-${tab.label}`}
                                         value={tab.value}
                                         className={`w-full text-light-1`}
                            >
                                  <ThreadTabs
                                      currentUserId={user.id}
                                      accountId={userInfo._id}
                                      accountType="User"
                                  />

                            </TabsContent>
                        ))
                    }

                    <TabsContent value="password">

                    </TabsContent>
                </Tabs>
            </div>
        </section>
    );
};

export default Page;