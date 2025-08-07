import { useAuth } from "@/auth";
import type { PollProps } from "@/components/PollCard";
import PollCard from "@/components/PollCard";
import { useApiQuery } from "@/hooks";
import { greet } from "@/utils";
import { GrSearch } from "react-icons/gr";

const Dashboard = () => {
  const { user } = useAuth();
  const { isPending, data } = useApiQuery({ url: "/polls/private" });

  return (
    <section className="max-w-[700px] flex flex-col gap-5 mx-auto">
      {/* Greet Header */}
      <div>
        <h2 className="text-2xl mb-2">
          {greet()}, <strong className="text-primary">{user?.name}</strong>
        </h2>
      </div>

      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold">Public Polls</h2>
        <p className="opacity-75">
          Below are the public polls that you can vote on.
        </p>
      </div>

      {/* List of polls */}
      <div className="flex flex-col gap-8">
        {!isPending &&
          data?.data?.map((poll: PollProps, index: number) => (
            <PollCard key={index} poll={poll} auth={true} />
          ))}
      </div>

      {/* Not found */}
      {!isPending && data?.data?.length === 0 && (
        <div className="h-[200px] flex items-center justify-center gap-1 opacity-75">
          <GrSearch size={25} />
          <span>Not found polls</span>
        </div>
      )}
    </section>
  );
};

export default Dashboard;
