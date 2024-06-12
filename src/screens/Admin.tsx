import React, { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import GenericPie from "../components/charts/GenericPie";
import { LuCalendarDays } from "react-icons/lu";
import { IoMdInformationCircle } from "react-icons/io";
import { CONSTANTS } from "../constants";
import axios from "axios";

type Props = {};

const Admin = (props: Props) => {
  const [users, setUsers] = useState([]);
  const [attempts, setAttempts] = useState([]);

  const getUsers = async () => {
    try {
      const res = await axios.get(`${CONSTANTS.SERVERURL}/user`);
      setUsers(res.data);
    } catch (error) {}
  };
  const getAttempts = async () => {
    try {
      const res = await axios.get(`${CONSTANTS.SERVERURL}/attempts`);
      setAttempts(res.data);
    } catch (error) {}
  };
  useEffect(() => {
    getUsers();
    getAttempts();
  }, []);
  return (
    <AdminLayout>
      <div className="flex flex-col">
        {/* box indicators */}
        <div className="flex items-center justify-center gap-3 mt-5">
          {/* indicator1 */}
          <div className="flex items-center px-4 bg-[#7A6EFE] gap-8 h-[100px] w-[200px] rounded-[20px]">
            <div className="w-[38px] h-[38px] flex items-center justify-center rounded-full bg-[#ffffff7c]">
              <LuCalendarDays className="text-white" />
            </div>
            <div className="flex items-center flex-col text-white">
              <h2 className="text-[32px] font-[600]">
                {users && users?.length}
              </h2>
              <h2 className="text-[14px] font-[400]">Total Users</h2>
            </div>
          </div>
          {/* indicator2 */}
          <div className="flex items-center px-4 bg-[#FF5363] gap-8 h-[100px] w-[200px] rounded-[20px]">
            <div className="w-[38px] h-[38px] flex items-center justify-center rounded-full bg-[#ffffff7c]">
              <LuCalendarDays className="text-white" />
            </div>
            <div className="flex flex-col items-center text-white">
              <h2 className="text-[32px] font-[600]">
                {attempts && attempts.length}
              </h2>
              <h2 className="text-[14px] text-center font-[400]">
                Total User Attempts
              </h2>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2">
          {/* Users */}

          <div className=" w-[300px] shadow-xl">
            <div className="flex items-center justify-between px-2 py-4">
              <div className="flex flex-col">
                <p className="font-[500] text-black">Active Users</p>
                <p className="font-[400] text-[#4F4F4F] text-[14px]">Rate</p>
              </div>
              <IoMdInformationCircle className="text-[#BDBDBD] text-[25px]" />
            </div>
            <hr />
            {/* Gravidity diagram */}
            <GenericPie
              colors={["#14A673", "#c953c9"]}
              series={[users && users.length, 0]}
            />

            {/* info about chart */}
            <div className="flex gap-7 px-2 py-4">
              <div className="flex gap-2 items-center">
                <div className="w-[7px] h-[7px] bg-[#14A673]"></div>
                <span>Active</span>
              </div>
              <div className="flex gap-2 items-center">
                <div className="w-[7px] h-[7px]  bg-[#c953c9]"></div>
                <span>Inactive</span>
              </div>
            </div>
          </div>
          {/* Attempts */}

          <div className=" w-[300px] shadow-xl">
            <div className="flex items-center justify-between px-2 py-4">
              <div className="flex flex-col">
                <p className="font-[500] text-black">Attempts</p>
                <p className="font-[400] text-[#4F4F4F] text-[14px]">Rate</p>
              </div>
              <IoMdInformationCircle className="text-[#BDBDBD] text-[25px]" />
            </div>
            <hr />
            {/* Gravidity diagram */}
            <GenericPie
              colors={["#14A673", "#c953c9"]}
              series={[attempts && attempts.length, 0]}
            />

            {/* info about chart */}
            <div className="flex gap-7 px-2 py-4">
              <div className="flex gap-2 items-center">
                <div className="w-[7px] h-[7px] bg-[#14A673]"></div>
                <span>Success</span>
              </div>
              <div className="flex gap-2 items-center">
                <div className="w-[7px] h-[7px]  bg-[#c953c9]"></div>
                <span>Fail</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Admin;
