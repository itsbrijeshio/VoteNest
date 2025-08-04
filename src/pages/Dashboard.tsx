import { useAuth } from "@/auth";
import { Pagination } from "@/components";
import type { PollProps } from "@/components/PollCard";
import PollCard from "@/components/PollCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutate } from "@/hooks";
import { greet } from "@/utils";
import { useEffect, useState } from "react";
import { GrSearch } from "react-icons/gr";
import { BiLoaderAlt } from "react-icons/bi";
import { useFormik } from "formik";

const Dashboard = () => {
  const { user } = useAuth();
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const { mutate, isPending, data } = useMutate(
    `/polls?page=${page}&query=${query}`,
    "get",
    null,
    false
  );

  const { handleSubmit, handleChange } = useFormik({
    initialValues: {
      public: "",
      query: "",
    },
    onSubmit: (data) => setQuery(data?.query),
  });

  useEffect(() => {
    mutate();
  }, [mutate, page, query]);

  return (
    <section className="max-w-[700px] flex flex-col gap-5 mx-auto">
      {/* Greet Header */}
      <div>
        <h2 className="text-2xl mb-2">
          {greet()}, <strong className="text-primary">{user?.name}</strong>
        </h2>
      </div>

      {/* Filter */}
      <form onSubmit={handleSubmit} className="flex items-center bg-background">
        <Input
          type="text"
          name="query"
          className="text-sm"
          placeholder="Search for a poll"
          disabled={isPending}
          onChange={handleChange}
        />
        <Select name="public">
          <SelectTrigger className="max-w-[180px]">
            <SelectValue placeholder="Visibility" />
          </SelectTrigger>
          <SelectContent onChange={handleChange}>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="true">Public</SelectItem>
            <SelectItem value="false">Private</SelectItem>
          </SelectContent>
        </Select>
        <Button type="submit" size={"sm"} disabled={isPending}>
          {isPending ? <BiLoaderAlt /> : <GrSearch />}
        </Button>
      </form>

      {/* List of polls */}
      <div className="flex flex-col gap-8">
        {!isPending &&
          data?.data?.map((poll: PollProps, index: number) => (
            <PollCard key={index} poll={poll} auth={true} mutate={mutate} />
          ))}
      </div>

      {/* Not found */}
      {!isPending && data?.data?.length === 0 && (
        <div className="h-[200px] flex items-center justify-center gap-1 opacity-75">
          <GrSearch size={25} />
          <span>Not found polls</span>
        </div>
      )}

      {/* Pagination */}
      <Pagination page={page} setPage={setPage} length={data?.data?.length} />
    </section>
  );
};

export default Dashboard;
