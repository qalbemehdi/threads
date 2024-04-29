import React from 'react'

const PostSkeleton = () => {
  return (
    <section className="mt-9 flex flex-col gap-10">
    {[1,2,3].map((index)=>{
       return  <article key={index} className="flex w-full flex-col rounded-xl bg-dark-2 p-7 ">
       <div className="flex items-start justify-between animate-pulse">
           <div className="flex w-full flex-1 flex-row gap-4">
               <div className="flex flex-col items-center">
                   <a className="relative h-11 w-11 bg-gray-800 rounded-full" href="/profile/user_2famoMy74vCDrazIQ2szAP3qaz3">
                       <div
                           className="cursor-pointer rounded-full"
                           style={{ position: 'absolute', height: '100%', width: '100%', inset: '0px', color: 'transparent' }}
                       />
                   </a>
                   <div className="thread-card_bar"></div>
               </div>
               <div className="flex w-full flex-col">
                   <div className="w-fit mb-2.5" >
                       <h4 className="h-2.5 bg-gray-800 rounded-full dark:bg-gray-700 w-32 "></h4>
                   </div>
                   <div className="h-2 bg-gray-800 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
                   <div className="h-2 bg-gray-800 rounded-full dark:bg-gray-700 mb-2.5"></div>
                   <div className="h-2 bg-gray-800 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
                   <div className="undefined mt-5 flex flex-col gap-3">
                       <div className="flex gap-3.5">
                           {
                               [1,2,3,4].map((index)=>{
                                   return <div key={index} className="h-5 bg-gray-800 rounded-full dark:bg-gray-700 w-5 mb-2.5"></div>

                               })
                           }
                       </div>
                       <div className="flex flex-row gap-2"></div>
                   </div>
               </div>
           </div>
           <div className="flex flex-row gap-2"></div>
       </div>
       <div className="flex flex-row gap-2 animate-pulse">
           <div className="ml-1 mt-3 flex items-center gap-2">
               <div className="h-6 bg-gray-800 rounded-full dark:bg-gray-700 w-6"></div>

               <div>
                   <p className="h-2.5 w-10 rounded-full bg-gray-800 mt-1 text-subtle-medium text-gray-1"></p>
               </div>
           </div>
       </div>
   </article>
    })}
   
</section>
  )
}

export default PostSkeleton