import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { HiPlus } from "react-icons/hi2";
import { BiLoaderAlt } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { useMutate, useQuery } from "@/hooks";
import useStore from "@/store";

const UpdatePoll = () => {
  const { activePollId } = useStore();
  const [optionCount, setOptionCount] = useState<number>(2);
  const { data, isSuccess } = useQuery(`/polls/${activePollId}`);
  const { isPending, mutate } = useMutate(`/polls/${activePollId}`, "patch");

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    onSubmit: (values: any) => {
      const poll: any = {
        title: values.title,
        description: values.description,
        options: [],
      };

      Object.keys(values).forEach((key) => {
        if (key.startsWith("option")) {
          poll.options.push(values[key]);
        }
      });

      console.log("Final Poll Data →", poll);
      mutate(poll);
    },
  });

  const { handleSubmit, handleChange, values, setValues } = formik;

  useEffect(() => {
    if (isSuccess && data?.data) {
      const pollData = data.data;
      const formValues: any = {
        title: pollData.title || "",
        description: pollData.description || "",
      };

      pollData.options?.forEach((opt: any, i: number) => {
        formValues[`option${i + 1}`] = opt.text;
      });

      setValues(formValues);
      setOptionCount(pollData.options?.length || 2);
    }
  }, [isSuccess, data, setValues]);

  const handleIncOption = () => {
    if (optionCount >= 6) return;
    setOptionCount((prev) => prev + 1);
  };

  const handleDecOption = () => {
    if (optionCount <= 2) return;
    setOptionCount((prev) => prev - 1);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Title */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="question_field">Question</Label>
        <Input
          type="text"
          name="title"
          id="question_field"
          placeholder="Type your question here"
          required
          value={values.title}
          onChange={handleChange}
        />
      </div>

      {/* Description */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="description_field">Description (optional)</Label>
        <Textarea
          name="description"
          id="description_field"
          className="resize-none"
          value={values.description}
          onChange={handleChange}
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
                  name={key}
                  placeholder={`Option ${index + 1}`}
                  required
                  value={values[key] || ""}
                  onChange={handleChange}
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
        <Button type="submit" className="w-32" disabled={isPending}>
          {isPending ? <BiLoaderAlt className="animate-spin" /> : "Update Poll"}
        </Button>
      </div>
    </form>
  );
};

UpdatePoll.heading = "Edit Poll";

export default UpdatePoll;
