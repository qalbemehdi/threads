import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import {fetchUser} from "@/lib/actions/user.actions";
import { fetchThreads } from "@/lib/actions/thread.action";
import ThreadCard from "@/components/cards/ThreadCard";



async function Home({
                        searchParams,
                    }: {
    searchParams: { [key: string]: string | undefined };
}) {
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding");

    const result = await fetchThreads(
        searchParams.page ? +searchParams.page : 1,
        30
    );

    return (
        <>
            <h1 className='head-text text-left'>Home</h1>

            <section className='mt-9 flex flex-col gap-10'>
                {result.postsQuery.length === 0 ? (
                    <p className='no-result'>No threads found</p>
                ) : (
                    <>
                        {result.postsQuery.map((post) => (
                            <ThreadCard

                                key={post._id}
                                id={post._id}
                                currentUserId={user.id}
                                parentId={post.parentId}
                                content={post.text}
                                author={post.author}
                                community={post.community}
                                createdAt={post.createdAt}
                                comments={post.children}
                            />
                        ))}
                    </>
                )}
            </section>


        </>
    );
}

export default Home;