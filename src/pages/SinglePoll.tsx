import { Option } from "@/components";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { timeFormatter } from "@/utils";
import type { OptionProps } from "@/components/Option";
import { useApiMutate } from "@/hooks";
import { useEffect, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { useAuth } from "@/auth";

const SinglePoll = () => {
  const { pollId } = useParams();
  const { authenticated } = useAuth();
  const [active, setActive] = useState<string | null>(null);
  const queryApi = useApiMutate({
    url: `/polls/${pollId}`,
    method: "get",
  });
  const mutateApi = useApiMutate({
    url: `/polls/${authenticated ? "private" : "public"}/vote/${pollId}`,
    method: "post",
    onSuccess: () => {
      queryApi.mutate(null);
    },
  });

  const handleSubmitVote = () => {
    mutateApi.mutate({ optionId: active });
  };

  useEffect(() => {
    queryApi.mutate(null);
  }, []);

  if (queryApi.isPending) {
    return <div>Loading...</div>;
  }

  const poll = queryApi?.data?.data;
  if (!poll) {
    return <div>No poll found</div>;
  }

  return (
    <section className="max-w-[800px]  flex flex-col md:flex-row md:items-center gap-10 mx-auto">
      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-bold">{poll.question}</h2>
          <p className="opacity-75">{poll.description}</p>
          <p className="opacity-75 text-sm">
            Publish by <Badge variant={"outline"}>{poll.user.name}</Badge>,
            created at{" "}
            <Badge variant={"outline"}>{timeFormatter(poll.createdAt)}</Badge>
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {poll.options?.map((option: OptionProps, index: number) => (
            <Option
              key={index}
              option={option}
              totalVotes={poll.votes}
              pollId={pollId as string}
              setActive={setActive}
              active={active}
            />
          ))}
        </div>
      </div>
      <div className="w-[200px] flex flex-col gap-4">
        <div>
          <Button
            type="button"
            className="w-full rounded-none"
            disabled={!active || mutateApi.isPending}
            onClick={handleSubmitVote}
          >
            {mutateApi.isPending ? <BiLoaderAlt /> : "Submit your Vote"}
          </Button>
        </div>
        <div className="p-5 bg-background shadow-md">
          <span className="text-sm opacity-75 font-bold">Votes</span>
          <h2 className="text-2xl">{poll.votes}</h2>
        </div>
        <div>
          <Button type="button" variant={"secondary"} className="rounded-none">
            Report abuse
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SinglePoll;
