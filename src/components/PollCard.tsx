import { Link, useNavigate } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { timeFormatter } from "@/utils";
import { BsTrash3 } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import useStore from "@/store";
import { useApiMutate } from "@/hooks";
import { BiLoaderAlt } from "react-icons/bi";

export interface PollProps {
  _id: string;
  question: string;
  description: string;
  user: {
    _id: string;
    name: string;
  };
  createdAt: string;
  votes: number;
}

const PollCard = ({
  poll,
  auth = false,
}: {
  poll: PollProps;
  auth?: boolean;
  mutate?: () => void;
}) => {
  const { _id, question, description, createdAt, votes, user } = poll;
  const navigate = useNavigate();
  const { setModal, setActivePollId } = useStore();
  const { mutate, isPending } = useApiMutate({
    url: `/polls/${_id}`,
    method: "delete",
    onSuccess: navigate,
  });

  const handleUpdate = () => {
    setActivePollId(_id);
    setModal("UpdatePoll");
  };

  return (
    <div className="relative w-full p-5 shadow-md rounded bg-white dark:bg-background/50">
      <h3 className="text-xl">{question}</h3>
      <p className="opacity-75 text-sm">{description}</p>
      <div className="mt-3 flex flex-wrap gap-3 items-baseline justify-between">
        <div className="flex flex-wrap gap-3">
          <span className="opacity-50 text-sm text-nowrap">
            Publish by <Badge variant={"secondary"}>{user.name}</Badge>, created
            at <Badge variant={"secondary"}>{timeFormatter(createdAt)}</Badge>
          </span>
        </div>
        <div className="flex gap-2 ">
          <Link to={`/polls/${_id}`}>
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
                onClick={() => mutate(null)}
                disabled={isPending}
              >
                {isPending ? (
                  <BiLoaderAlt className="animate animate-spin" />
                ) : (
                  <BsTrash3 />
                )}
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
          {votes} Votes
        </Badge>
      </div>
    </div>
  );
};

export default PollCard;
