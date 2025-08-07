import { Progress } from "./ui/progress";
import React from "react";

export interface OptionProps {
  _id: string;
  text: string;
  votes: number;
}

const Option = ({
  option,
  totalVotes,
  setActive = () => {},
  active = null,
}: {
  pollId: string;
  option: OptionProps;
  totalVotes: number;
  setActive: (state: string | null) => void;
  active: string | null;
}) => {
  const { _id, text, votes } = option;
  const percentage =
    totalVotes === 0 || votes === 0
      ? 0
      : Math.round((votes * 100) / totalVotes);

  const handleChange = (events: React.ChangeEvent<HTMLInputElement>) => {
    if (events.target.id == _id) setActive(_id);
  };

  return (
    <label htmlFor={_id} className="cursor-pointer">
      <input
        type="radio"
        id={_id}
        name={"option"}
        className="hidden"
        onChange={handleChange}
      />
      <div
        id={_id}
        className={`w-full flex flex-col gap-2 shadow-md p-4 border ${
          active == _id && "border-primary"
        } bg-background`}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl">{text}</h3>
          <h3 className="text-md">{percentage}%</h3>
        </div>
        <Progress value={percentage} className="bg-secondary" />
        <div className="text-start">
          <p className="opacity-75 text-sm">
            <strong>{votes} Votes</strong>
          </p>
        </div>
      </div>
    </label>
  );
};

export default Option;
