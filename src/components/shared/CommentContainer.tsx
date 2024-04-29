// 'use client'
// import React, { useEffect,experimental_useOptimistic as useOptimistic, useState } from 'react';
// import ThreadCard from '../cards/ThreadCard';
// import Comment from '../forms/Comment';
// import { fetchThreadById, getReactionsData } from '@/lib/actions/thread.actions';

// interface CommentContainerProps {
//   paramsId: string;
//   userId: string;
//   user: any;
// }

// const CommentContainer: React.FC<CommentContainerProps> = ({ paramsId, userId, user }) => {
//   const [thread, setThread] = useState<any>(null);
//   const [reactionData, setReactionData] = useState<any>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [data, submitOptimistically ] = useOptimistic(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const fetchedThread = await fetchThreadById(paramsId);
//         setThread(fetchedThread);

//         const reactionsData = await getReactionsData({
//           userId,
//           posts: fetchedThread.children,
//           parentId: fetchedThread._id,
//         });

//         setReactionData(reactionsData); // Set reactions data once fetched

//         setLoading(false); // Data loading complete
//       } catch (error) {
//         console.error('Error fetching thread data:', error);
//         // Handle error
//         setLoading(false); // Ensure loading state is updated
//       }
//     };

//     fetchData();
//   }, [paramsId, userId]);



//   return (
//  <>
//       {/* <div>
//         <ThreadCard
//           id={thread?._id}
//           currentUserId={user.id}
//           parentId={thread?.parentId}
//           content={thread?.text}
//           author={thread?.author}
//           community={thread?.community}
//           createdAt={thread?.createdAt}
//           comments={thread?.children}
//           reactions={reactionData?.parentReactions.users}
//           reactState={reactionData?.parentReactionState}
//         />
//       </div>

//       <div className="mt-7">
//         <Comment
//           threadId={paramsId}
//           currentUserImg={user?.imageUrl}
//           currentUserId={userId}
//           // Pass submit handler to Comment component
//         />
//       </div>

//       <div className="mt-10">
//         {thread?.children?.map((childItem: any, idx: number) => (
//           <ThreadCard
//             key={childItem._id}
//             id={childItem._id}
//             currentUserId={user?.id}
//             parentId={childItem.parentId}
//             content={childItem.text}
//             author={childItem?.author}
//             community={childItem.community}
//             createdAt={childItem.createdAt}
//             comments={childItem.children}
//             reactions={reactionData?.childrenReactions[idx].users}
//             reactState={reactionData?.childrenReactionState[idx]}
//             isComment
//           />
//         ))}
//       </div> */}
//     </>
//   );
// };

// export default CommentContainer;
