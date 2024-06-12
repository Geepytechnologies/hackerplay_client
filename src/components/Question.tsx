import React from "react";
import { TbFileDescription } from "react-icons/tb";
import Question1 from "./questions/Question1";
import { useSelector } from "react-redux";
import { RootState } from "../config/store";
import Question2 from "./questions/Question2";

type Props = {};

const Question = (props: Props) => {
  const { question } = useSelector((state: RootState) => state.user);
  return (
    <div className="w-[50%] min-h-screen">
      <div className="bg-[#fcfcfc]">
        <div className="flex items-center gap-2 p-2">
          <TbFileDescription className="text-blue-400 text-[1.2rem]" />
          <p>Description</p>
        </div>
      </div>
      {/* Question */}
      <div className="p-2">
        {question == 1 && <Question1 />}
        {question == 2 && <Question2 />}
      </div>
    </div>
  );
};

export default Question;
