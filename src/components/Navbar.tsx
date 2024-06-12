import React from "react";
import { FaUser } from "react-icons/fa";
import { TbShareplay } from "react-icons/tb";
import Logo from "./Logo";
import { useSelector } from "react-redux";
import { RootState } from "../config/store";

type Props = {};

const Navbar = (props: Props) => {
  const { currentuser } = useSelector((state: RootState) => state.user);
  return (
    <div className="h-[70px] bg-slate-700 flex items-center justify-between px-2 text-white">
      <Logo />
      {/* profile */}
      <div className="flex items-center gap-3">
        <div className="w-[30px] h-[30px] flex items-center justify-center bg-white rounded-full">
          <FaUser className="text-secondary" />
        </div>
        <p>{currentuser && currentuser?.result?.firstname}</p>
      </div>
    </div>
  );
};

export default Navbar;
