import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useFormik } from "formik";
import { useState } from "react";
import { HiPlus } from "react-icons/hi2";
import { MdClose } from "react-icons/md";
import { BiLoaderAlt } from "react-icons/bi";
import { useApiMutate } from "@/hooks";

interface Poll {
  question?: string;
  description?: string;
  options?: string[];
}

const NewPoll = () => {
  const [option, setOption] = useState<number>(2);
  const { mutate, isPending } = useApiMutate({
    url: "/polls",
    method: "post",
  });

  const { handleSubmit, handleChange } = useFormik({
    initialValues: {
      question: "",
      description: "",
    },
    onSubmit: (data: {
      question: string;
      description: string;
      [key: string]: string;
    }) => {
      const poll: Poll = {
        options: [],
        question: data.question,
        description: data.description,
      };
      for (const x in data) {
        if (x.includes("option")) poll?.options?.push(data[x]);
      }
      mutate(poll);
    },
  });

  const handleIncOption = () => {
    if (option > 5) return;
    setOption((pre) => pre + 1);
  };

  const handleDecOption = () => {
    if (option < 3) return;
    setOption((pre) => pre - 1);
  };

  return (
    <section className="max-w-[700px] flex flex-col gap-10 mx-auto">
      <div className="text-center">
        <h2 className="text-2xl">Create a Poll</h2>
        <p className="opacity-75">
          Complete the below fields to create your poll.
        </p>
      </div>
      <div className="p-5 bg-background rounded-md border-t-2 border-primary shadow-md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor="question_field">Question</Label>
            <Input
              type="text"
              name="question"
              id="question_field"
              placeholder="Type your question here"
              required
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="description_field">Description (optional)</Label>
            <Textarea
              name="description"
              id="description_field"
              className="resize-none"
              onChange={handleChange}
            ></Textarea>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Answer Options</Label>
            {Array.from(Array(option).keys())?.map((_, index) => (
              <div key={index} className="relative">
                <Input
                  type="text"
                  name={`option${index + 1}`}
                  placeholder={`Option ${index + 1}`}
                  required
                  onChange={handleChange}
                />
                <Button
                  type="button"
                  variant={"ghost"}
                  className="absolute right-0 top-0"
                  onClick={handleDecOption}
                >
                  <MdClose />
                </Button>
              </div>
            ))}
            <div>
              <Button
                type="button"
                variant={"secondary"}
                onClick={handleIncOption}
              >
                <HiPlus />
                Add option
              </Button>
            </div>
          </div>
          <div className="border-t pt-5">
            <Button type="submit" className="w-32" disabled={isPending}>
              {isPending ? (
                <BiLoaderAlt className="animate-spin" />
              ) : (
                "Create Poll"
              )}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default NewPoll;
