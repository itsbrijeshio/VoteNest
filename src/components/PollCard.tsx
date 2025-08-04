import { Link } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { timeFormatter } from "@/utils";
import { useMutate } from "@/hooks";
import { BsTrash3 } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { BiLoaderAlt } from "react-icons/bi";
import { useEffect } from "react";
import useStore from "@/store";

export interface PollProps {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  isPublic: boolean;
  _count: {
    votes: number;
  };
}

const PollCard = ({
  poll,
  auth = false,
  mutate = () => {},
}: {
  poll: PollProps;
  auth?: boolean;
  mutate?: () => void;
}) => {
  const { id, title, description, createdAt, isPublic, _count } = poll;
  const deleteMutate = useMutate(`/polls/${id}`, "delete");
  const { setModal, setActivePollId } = useStore();

  const handleDelete = () => deleteMutate.mutate();

  const handleUpdate = () => {
    setActivePollId(id);
    setModal("UpdatePoll");
  };

  useEffect(() => {
    if (deleteMutate.isSuccess) mutate();
  }, [deleteMutate.isSuccess, mutate]);

  return (
    <div className="relative w-full p-5 shadow-md rounded bg-white dark:bg-background/50">
      <h3 className="text-xl">{title}</h3>
      <p className="opacity-75 text-sm">{description}</p>
      <div className="mt-3 flex flex-wrap gap-3 items-baseline justify-between">
        <div className="flex flex-wrap gap-3">
          <span className="opacity-50 text-sm text-nowrap">
            Publish on{" "}
            <Badge variant={"secondary"}>{timeFormatter(createdAt)}</Badge>
          </span>
          <span className="opacity-50 text-sm text-nowrap">
            Visibility{" "}
            <Badge variant={"secondary"}>
              {isPublic ? "Public" : "Private"}
            </Badge>
          </span>
        </div>
        <div className="flex gap-2 ">
          <Link to={`/polls/${id}?private=${auth}`}>
            <Button className="rounded-none " size={"sm"}>
              <MdOutlineKeyboardDoubleArrowRight className="text-5xl" />
              View
            </Button>
          </Link>
          {auth && (
            <>
              <Button
                variant={"secondary"}
                className="rounded-none "
                size={"sm"}
                onClick={handleUpdate}
              >
                <CiEdit />
              </Button>
              <Button
                variant={"destructive"}
                className="rounded-none "
                size="sm"
                disabled={deleteMutate.isPending}
                onClick={handleDelete}
              >
                {deleteMutate.isPending ? <BiLoaderAlt /> : <BsTrash3 />}
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="absolute top-[-10px] right-[-10px] flex flex-col gap-1">
        <Badge
          variant={"outline"}
          className="text-sm text-primary bg-background"
        >
          {_count.votes} Votes
        </Badge>
      </div>
    </div>
  );
};

export default PollCard;
