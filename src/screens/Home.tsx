import React, { useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { Editor } from "@monaco-editor/react";
import Playground from "../components/Playground";
import CodeOutput from "../components/CodeOutput";
import axios from "axios";
import { CONSTANTS } from "../constants";
import { languages } from "../utils/languages";
import { IoPlayOutline } from "react-icons/io5";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import Question from "../components/Question";
import { useDispatch, useSelector } from "react-redux";
import { SETQUESTION } from "../config/slices/userSlice";
import { Actions, Attempt } from "../utils/actions";
import { RootState } from "../config/store";
import { ErrorToast, SuccessToast } from "../utils/Toasts";
import { ToastContainer, toast } from "react-toastify";
import { FaAngleRight } from "react-icons/fa6";

type Props = {};

const Home = (props: Props) => {
  const { currentuser, question } = useSelector(
    (state: RootState) => state.user
  );
  const defaultcode = "// Welcome to the hackerplay playground";
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(defaultcode);
  const [codeOutput, setCodeOutput] = useState();
  const [language, setLanguage] = useState(languages[0]);
  const [customInput, setCustomInput] = useState("");
  const sidebar = useRef<HTMLDivElement>(null);

  const onChange = (action: any, data: any) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };
  const checkStatus = async (token: string) => {
    const options = {
      method: "GET",
      url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
      params: {
        base64_encoded: "true",
        fields: "*",
      },
      headers: {
        "x-rapidapi-key": `${CONSTANTS.API_KEY}`,
        "x-rapidapi-host": `${CONSTANTS.API_HOST}`,
        "Content-Type": "application/json",
      },
    };
    try {
      let response = await axios.request(options);
      // console.log(response);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        toast.warn("Still Processing");
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setLoading(false);
        setCodeOutput(response.data);
        SuccessToast("Compiled Successfully!");
        // console.log("response.data", response.data);
        return;
      }
    } catch (err) {
      ErrorToast("Compilation Failed");
      setLoading(false);
      //   showErrorToast();
    }
  };
  const compileCode = async () => {
    console.log(code);
    setLoading(true);

    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "x-rapidapi-key": `${CONSTANTS.API_KEY}`,
        "x-rapidapi-host": `${CONSTANTS.API_HOST}`,
        "Content-Type": "application/json",
      },
      data: {
        language_id: language.id,
        source_code: btoa(code),
        stdin: btoa(customInput),
      },
    };
    try {
      const response = await axios.request(options);
      // console.log("res.data", response.data);
      const token = response.data.token;
      SuccessToast("Code received!");
      checkStatus(token);
      //     const data:Attempt = {
      //       input: btoa(code),
      // output: string,
      // result: string,
      // status: string,
      // userId: currentuser.result.id,
      // questionId: question
      //     }
      //     await Actions.createAttempt(data)
    } catch (err: any) {
      let error = err.response ? err.response.data : err;
      let status = err.response ? err.response.status : "Network Error";
      if (status === 429) {
        ErrorToast("Too many requests");
      }
      ErrorToast(error);
    } finally {
      setLoading(false);
    }
  };
  const open = () => {
    if (sidebar.current) {
      sidebar.current.style.width = "400px";
    }
  };
  const close = () => {
    if (sidebar.current) {
      sidebar.current.style.width = "0px";
    }
  };
  const dispatch = useDispatch();
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <div className="bg-[#f0f0f0] flex px-2 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <AiOutlineMenuUnfold onClick={open} className="text-[1.8rem]" />
          <p className="">Problem List</p>
        </div>
        <button
          onClick={compileCode}
          className="bg-secondary w-[100px] text-white py-2 px-3 rounded-md flex justify-center items-center gap-2"
        >
          {!loading && (
            <div className="flex gap-2 items-center">
              <IoPlayOutline className="text-[1.8rem]" /> Run
            </div>
          )}
          {loading && <div className="loader"></div>}
        </button>
      </div>
      <div className="flex flex-row">
        <Question />
        <div className="flex flex-col w-[50%]">
          <Playground onChange={onChange} code={code} />
          <CodeOutput result={codeOutput} />
        </div>
      </div>
      {/* sidebar */}
      <div
        ref={sidebar}
        className={`bg-white top-0 left-0 sidebar h-screen z-[888]`}
      >
        <div className="flex h-[90px] items-center justify-between px-3">
          <div className="flex gap-2 items-center text-[1.2rem] text-gray-600">
            <p className="">Problem List </p>
            <FaAngleRight />
          </div>
          <div
            onClick={close}
            className="border flex border-[#7d3e91] rounded-sm p-1"
          >
            <IoMdClose className="text-[#7d3e91] text-[20px]" />
          </div>
        </div>
        <div className="flex flex-col p-4 gap-4">
          <div
            onClick={() => dispatch(SETQUESTION(1))}
            className="bg-[#fafafa] rounded-md py-6 px-2 text-[1.2rem] cursor-pointer font-[500]"
          >
            1. Two Sum
          </div>
          <div
            onClick={() => dispatch(SETQUESTION(2))}
            className="bg-[#fafafa] rounded-md py-6 px-2 text-[1.2rem] cursor-pointer font-[500]"
          >
            2. Add Two Numbers
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
