import toast from "react-hot-toast";
import { Option } from "@/components";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { timeFormatter } from "@/utils";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useMutate } from "@/hooks";
import type { OptionProps } from "@/components/Option";

const SinglePoll = () => {
  const [active, setActive] = useState<string | null>(null);
  const { pollId } = useParams();
  const [search] = useSearchParams();
  const isPrivate = search.get("private") === "true";
  const { mutate, data } = useMutate(
    `/polls${isPrivate ? "/" : "/public/"}${pollId}`,
    "get",
    null,
    false
  );
  const voteMutate = useMutate(`/polls/public/vote/${pollId}`, "post", {
    optionId: active,
  });

  const handleVote = async () => {
    if (!active) return;
    voteMutate.mutate();
    toast.success("Your vote submitted!");
  };

  useEffect(() => {
    mutate();
  }, [mutate, voteMutate.isPending]);

  return (
    <section className="max-w-[800px]  flex flex-col md:flex-row md:items-center gap-10 mx-auto">
      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-bold">{data?.data?.title}</h2>
          <p className="opacity-75">{data?.data?.description}</p>
          <p className="opacity-75 text-sm">
            Publish on{" "}
            <Badge variant={"outline"}>
              {timeFormatter(data?.data?.createdAt)}
            </Badge>
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {data?.data?.options?.map((option: OptionProps, index: number) => (
            <Option
              key={index}
              option={option}
              votes={data?.data?._count.votes}
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
            disabled={!active}
            onClick={handleVote}
          >
            Submit your Vote
          </Button>
        </div>
        <div className="p-5 bg-background shadow-md">
          <span className="text-sm opacity-75 font-bold">Votes</span>
          <h2 className="text-2xl">{data?.data?._count.votes}</h2>
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
