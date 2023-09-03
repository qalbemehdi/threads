//app/page.tsx
import React from "react";
import {fetchThreads} from "@/lib/actions/thread.action";
import {currentUser} from "@clerk/nextjs";
import ThreadCard from "@/components/cards/ThreadCard";

export default async function Home() {
           const {postsQuery,isNext}=await fetchThreads(1,30);
           const user=await currentUser();
    return (
      <>
        <h1 className="head-text text-left bg-dark-1">Home</h1>

          <section className={`mt-9 flex flex-col gap-10`}>
              {
                  postsQuery.length===0?(
                      <p className={`no-result`}>No threads found</p>
                  ):(
                      postsQuery.map(post=>(

                          <ThreadCard key={post._id}
                                      id={post._id}
                                      parentId={post.parentId}
                                      currentUserId={user?.id || ""}
                                      content={post.text}
                                      author={post.author}
                                      community={post.community}
                                      createdAt={post.createdAt}
                                      comments={post.children}

                          />
                      ))
                  )
              }
          </section>
      </>
  )
}