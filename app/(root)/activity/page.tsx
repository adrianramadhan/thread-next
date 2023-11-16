import ProfileHeader from "@/components/shared/ProfileHeader";
import { fetchUser, getactivity } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  // getActivity
  const activity = await getactivity(userInfo._id);

  return (
    <section>
      <h1 className='head-text mb-10'>Activity</h1>

      <section className='mt-10 flex flex-col gap-5'>
        {activity.length > 0 ? (
          <>
            {activity.map((activity) => (
              <Link
                key={activity._id}
                href={`/thread/${activity.parentId}`}
              ></Link>
            ))}
          </>
        ) : (
          <p>No activity yet</p>
        )}
      </section>
    </section>
  );
}

export default Page;
