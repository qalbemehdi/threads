import React from 'react';
import {currentUser} from "@clerk/nextjs";
import {fetchUser, getActivity} from "@/lib/actions/user.actions";
import {redirect} from "next/navigation";
import Link from 'next/link';
import Image from "next/image";

const Page = async() => {
    const user = await currentUser();
    if(!user) return null;
    const userInfo=await fetchUser(user.id);
    if(!userInfo?.onboarded) redirect('/onboarding')

    const activity= await getActivity(userInfo?._id)

    return (
        <section className={`mt-10 flex flex-col gap-5`}>
            <h1 className={`head-text mb-5`}>Activity</h1>
            <section className={`mt-5 flex flex-col gap-5`}>
                {activity.map((activity)=>(
                    <Link key={activity._id} href={`/thread/${activity.parentId}`}>
                        <article className={`activity-card`}>
                            <div className={`w-8 h-8 relative rounded-[50%]`}>
                                <Image src={activity.author.image} alt={'profile-photo'}
                                       fill
                                       className={"rounded-[50%] object-cover"}
                                />
                            </div>
                            <p className={`!text-small-regular text-light-1`}>
                                <span className={`mr-1 text-primary-500`}>{activity.author.name}</span>
                                {" "}
                                replied to your thread
                            </p>
                        </article>
                    </Link>
                ))}
            </section>
        </section>
    );
};

export default Page;