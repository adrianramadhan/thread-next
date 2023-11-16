import { fetchUserPosts } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";
import ThreadCard from "../cards/ThreadCard";

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

const ThreadsTab = async ({ currentUserId, accountId, accountType }: Props) => {
  let result = await fetchUserPosts(accountId);

  if (!result) redirect("/");

  return (
    <section className='mt-9 flex flex-col gap-10'>
      {result.threads.map((thread: any) => (
        <ThreadCard
          key={thread._id}
          id={thread._id}
          currentuserId={currentUserId}
          parentId={thread.parentId}
          content={thread.text}
          author={
            accountType === "User"
              ? { name: result.name, image: result.image, id: result._id }
              : { name: thread.name, image: thread.image, id: thread._id }
          }
          community={thread.community}
          createdAt={thread.createdAt}
          comments={thread.chilren}
        />
      ))}
    </section>
  );
};

export default ThreadsTab;
