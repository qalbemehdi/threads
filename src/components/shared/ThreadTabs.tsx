import React from 'react';
import {fetchUserPosts} from "@/lib/actions/user.actions";
import ThreadCard from "@/components/cards/ThreadCard";
interface Props{
    currentUserId:string,
    accountId:string,
    accountType:string
}
const ThreadTabs =async ({currentUserId,accountId,accountType}:Props) => {

    const posts= await fetchUserPosts(accountId)
     // console.log(accountId)
    return (
       <section className={`mt-9 flex flex-col gap-10`}>
           {posts.map((thread)=>(
               <ThreadCard key={thread._id}
                           id={thread._id}
                           parentId={thread.parentId}
                           currentUserId={currentUserId}
                           content={thread.text}
                           author={thread.author}
                           community={thread.community}
                           createdAt={thread.createdAt}
                           comments={thread.comments}
               />
           ))}
       </section>
    );
};

export default ThreadTabs;