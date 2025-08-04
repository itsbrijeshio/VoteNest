import { Progress } from "./ui/progress";
import React from "react";

export interface OptionProps {
  id: string;
  text: string;
  votes: number;
  _count: {
    votes: number;
  };
}

const Option = ({
  option,
  votes,
  setActive = () => {},
  active = null,
}: {
  pollId: string;
  option: OptionProps;
  votes: number;
  setActive: (state: string | null) => void;
  active: string | null;
}) => {
  const { id, text, _count } = option;
  const percentage =
    votes === 0 || _count.votes === 0
      ? 0
      : Math.round((_count.votes * 100) / votes);

  const handleChange = (events: React.ChangeEvent<HTMLInputElement>) => {
    if (events.target.id == id) setActive(id);
  };

  return (
    <label htmlFor={id} className="cursor-pointer">
      <input
        type="radio"
        id={id}
        name={"option"}
        className="hidden"
        onChange={handleChange}
      />
      <div
        id={id}
        className={`w-full flex flex-col gap-2 shadow-md p-4 border ${
          active == id && "border-primary"
        } bg-background`}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl">{text}</h3>
          <h3 className="text-md">{percentage}%</h3>
        </div>
        <Progress value={percentage} className="bg-secondary" />
        <div className="text-start">
          <p className="opacity-75 text-sm">
            <strong>{_count?.votes} Votes</strong>
          </p>
        </div>
      </div>
    </label>
  );
};

export default Option;
