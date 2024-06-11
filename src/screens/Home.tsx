import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Editor } from "@monaco-editor/react";
import Playground from "../components/Playground";
import CodeOutput from "../components/CodeOutput";
import axios from "axios";
import { CONSTANTS } from "../constants";
import { languages } from "../utils/languages";

type Props = {};

const Home = (props: Props) => {
  const defaultcode = "// Welcome to the hackerplay playground";
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(defaultcode);
  const [codeOutput, setCodeOutput] = useState();
  const [language, setLanguage] = useState(languages[13]);
  const [customInput, setCustomInput] = useState("");

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
        "x-rapidapi-key": "44d10f7a1amsh3b7d41e7bfe2b2fp192341jsnfc61a36f9c21",
        "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
      },
    };
    try {
      let response = await axios.request(options);
      console.log(response);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setLoading(false);
        setCodeOutput(response.data);
        // showSuccessToast(`Compiled Successfully!`);
        console.log("response.data", response.data);
        return;
      }
    } catch (err) {
      console.log("err", err);
      setLoading(false);
      //   showErrorToast();
    }
  };
  const compileCode = async () => {
    setLoading(true);
    const formData = {
      language_id: language.id,
      source_code: btoa(code),
      stdin: btoa(customInput),
    };
    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "x-rapidapi-key": "44d10f7a1amsh3b7d41e7bfe2b2fp192341jsnfc61a36f9c21",
        "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
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
      console.log("res.data", response.data);
      const token = response.data.token;
      checkStatus(token);
    } catch (err: any) {
      let error = err.response ? err.response.data : err;
      let status = err.response ? err.response.status : "Network Error";
      console.log("status", status);
      if (status === 429) {
        console.log("too many requests", status);
        // showErrorToast(
        //   `Quota of 100 requests exceeded for the Day! Please read the blog on freeCodeCamp to learn how to setup your own RAPID API Judge0!`,
        //   10000
        // );
      }
      console.log("catch block...", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Navbar />
      <button
        onClick={compileCode}
        className="bg-secondary text-white py-2 px-3 rounded-md"
      >
        Compile
      </button>
      <div className="flex flex-col md:flex-row">
        <Playground onChange={onChange} code={code} />
        <CodeOutput result={codeOutput} />
      </div>
    </div>
  );
};

export default Home;
