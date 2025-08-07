import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { HiPlus } from "react-icons/hi2";
import { BiLoaderAlt } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { useApiMutate, useApiQuery } from "@/hooks";
import useStore from "@/store";

interface Poll {
  question?: string;
  description?: string;
  options?: string[];
}

const UpdatePoll = () => {
  const { activePollId } = useStore();
  const { data } = useApiQuery({ url: `/polls/${activePollId}` });
  const [optionCount, setOptionCount] = useState<number>(2);
  const { mutate, isPending } = useApiMutate({
    url: `/polls/${activePollId}`,
    method: "patch",
  });

  const handleUpdateForm = (e: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const poll: Poll = {
      options: [],
      question: "",
      description: "",
    };
    for (const [key, value] of form.entries()) {
      if (key.includes("option") && poll.options) {
        poll.options.push(value as string);
      }
      if (key == "question") {
        poll.question = value as string;
      }
      if (key == "description") {
        poll.description = value as string;
      }
    }
    mutate(poll);
  };

  const handleIncOption = () => {
    if (optionCount >= 6) return;
    setOptionCount((prev) => prev + 1);
  };

  const handleDecOption = () => {
    if (optionCount <= 2) return;
    setOptionCount((prev) => prev - 1);
  };

  useEffect(() => {
    const count = data?.data?.options?.length || 2;
    setOptionCount(count);
  }, [data]);

  return (
    <form onSubmit={handleUpdateForm} className="flex flex-col gap-5">
      {/* Title */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="question_field">Question</Label>
        <Input
          type="text"
          name="question"
          id="question_field"
          placeholder="Type your question here"
          required
          defaultValue={data?.data?.question}
        />
      </div>

      {/* Description */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="description_field">Description (optional)</Label>
        <Textarea
          name="description"
          id="description_field"
          className="resize-none"
          defaultValue={data?.data?.description}
        />
      </div>

      {/* Options */}
      <div className="flex flex-col gap-2">
        <Label>Answer Options</Label>
        <div className="max-h-[200px] overflow-y-scroll flex flex-col gap-2 py-2">
          {Array.from({ length: optionCount }).map((_, index) => {
            const key = `option${index + 1}`;
            return (
              <div key={key} className="relative">
                <Input
                  type="text"
                  name={`option${key}`}
                  placeholder={`Option ${index + 1}`}
                  defaultValue={data?.data?.options[index]?.text}
                  required
                />
                {optionCount > 2 && (
                  <Button
                    type="button"
                    variant={"ghost"}
                    className="absolute right-0 top-0"
                    onClick={handleDecOption}
                  >
                    <MdClose />
                  </Button>
                )}
              </div>
            );
          })}
        </div>
        <div>
          <Button type="button" variant={"secondary"} onClick={handleIncOption}>
            <HiPlus />
            Add option
          </Button>
        </div>
      </div>

      {/* Submit */}
      <div className="border-t pt-5">
        <Button type="submit" className="w-32">
          {isPending ? <BiLoaderAlt className="animate-spin" /> : "Update Poll"}
        </Button>
      </div>
    </form>
  );
};

UpdatePoll.heading = "Edit Poll";

export default UpdatePoll;
