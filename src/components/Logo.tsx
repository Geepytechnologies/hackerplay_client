import React from "react";
import { TbShareplay } from "react-icons/tb";

type Props = {};

const Logo = (props: Props) => {
  return (
    <div className="flex gap-2 items-center">
      <TbShareplay className="text-white text-[2rem]" />
      <p className="font-vibes text-white text-[1.5rem] leading-[24px] tracking-[2px]">
        Hackerplay
      </p>
    </div>
  );
};

export default Logo;
