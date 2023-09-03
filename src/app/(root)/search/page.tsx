import React from 'react';
import {currentUser} from "@clerk/nextjs";
import {fetchUser, fetchUsers} from "@/lib/actions/user.actions";
import {redirect} from "next/navigation";
import UserCard from "@/components/cards/UserCard";

const Page =async () => {
    const user=await currentUser()
    if(!user)return null
    const userInfo =await fetchUser(user.id)
    if(!userInfo?.onboarded) redirect('/onboarding')
    const {usersQuery,isNext}=await fetchUsers(
        {
            userId:user.id,
            pageNumber:1,
            searchString:'',
            pageSize:20,
        })
    return (
        <section className={`text-light-1`}>
            search
            <div className={`mt-14 flex flex-col gap-9`}>
                {usersQuery.length === 0 ? (
                    <p className={`no-result`}>No users</p>
                ):(
                    <>
                        {usersQuery.map((person)=>(
                            <UserCard key={person.id}
                                id={person.id} name={person.name}
                                      username={person.username}
                                      imgUrl={person.image}
                                      personType={'User'}/>
                        ))}
                    </>
                )}
            </div>
        </section>
    );
};

export default Page;