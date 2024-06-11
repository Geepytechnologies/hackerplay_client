import React from "react";

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
    <div className="flex-1 text-[1.4rem] bg-primary">
      {result ? <>{getOutput()}</> : null}
    </div>
  );
};

export default CodeOutput;
