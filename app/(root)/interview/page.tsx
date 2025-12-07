import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/actions/auth.action";

const Page = async () => {
  const user = await getCurrentUser();

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h2 className="mb-2">Create New Interview</h2>
        <p className="text-text-tertiary">
          Configure your mock interview settings and let AI generate personalized questions
        </p>
      </div>

      <Agent
        userName={user?.name!}
        userId={user?.id}
        profileImage={user?.profileURL}
        type="generate"
      />
    </div>
  );
};

export default Page;
