import React, { useEffect, useState } from "react";
import { RxDashboard } from "react-icons/rx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../Logo";
import { BiLogOut } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { SIGNOUT } from "../../config/slices/userSlice";

type Props = {};

const Menu = (props: Props) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState("");

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location]);
  const logout = () => {
    dispatch(SIGNOUT());
    navigate("/signin");
  };
  return (
    <div className="w-[300px]  bg-primary h-screen overflow-hidden">
      <div className="p-3 flex items-center justify-center h-[70px]">
        <Logo />
      </div>
      <div className="p-3 mt-4 gap-4 flex flex-col">
        {/* dashboard */}
        <Link
          to="/admin"
          className={`flex gap-2 my-2 items-center rounded-md  p-2  ${
            currentPage === "/admin"
              ? "bg-secondary text-white drop-shadow-lg"
              : " hover:text-[black] hover:bg-gray-200"
          }`}
        >
          <RxDashboard />
          <p>Dashboard</p>
        </Link>
        {/* Logout */}
        <div
          onClick={logout}
          className={`flex gap-2 my-2 items-center text-white rounded-md cursor-pointer  p-2 `}
        >
          <BiLogOut />
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
