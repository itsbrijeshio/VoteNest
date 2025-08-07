import { PollCard } from "@/components";
import { useApiQuery } from "@/hooks";
import type { PollProps } from "@/components/PollCard";
import { GrSearch } from "react-icons/gr";

const Home = () => {
  const { isPending, data } = useApiQuery({ url: "/polls" });
  return (
    <section className="max-w-[700px] flex flex-col gap-5 mx-auto">
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
            <PollCard key={index} poll={poll} />
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

export default Home;
