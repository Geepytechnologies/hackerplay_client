import React from "react";
import { MdOutput } from "react-icons/md";

type Props = {
  result: any;
};

const CodeOutput = ({ result }: Props) => {
  const getOutput = () => {
    let statusId = result?.status?.id;

    if (statusId === 6) {
      // compilation error
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {atob(result?.compile_output)}
        </pre>
      );
    } else if (statusId === 3) {
      return (
        <pre className="px-2 py-1 font-normal text-xs text-green-500">
          {atob(result.stdout) !== null ? `${atob(result.stdout)}` : null}
        </pre>
      );
    } else if (statusId === 5) {
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {`Time Limit Exceeded`}
        </pre>
      );
    } else {
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {atob(result?.stderr)}
        </pre>
      );
    }
  };
  return (
    <div className=" min-h-[400px] p-2">
      <div className="rounded-md border h-full border-gray-300">
        <div className="flex items-center gap-3 p-2">
          <MdOutput className="text-teal-500" /> Output
        </div>
        {result ? <>{getOutput()}</> : null}
      </div>
    </div>
  );
};

export default CodeOutput;
