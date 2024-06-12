import { Editor } from "@monaco-editor/react";
import React, { useState } from "react";
import { FaCode } from "react-icons/fa";

type Props = {
  onChange: any;
  language?: string;
  code?: string;
  theme?: string;
};

const Playground = ({ onChange, language, code, theme }: Props) => {
  const [value, setValue] = useState(code || "");

  const handleChange = (value: any) => {
    setValue(value);
    onChange("code", value);
  };
  return (
    <div className="rounded-md shadow-4xl border-l border-gray-400">
      <div className="flex items-center gap-3 p-2">
        <FaCode className="text-red-300" /> Code
      </div>
      <Editor
        height="400px"
        language={language || "javascript"}
        value={value}
        theme={theme}
        defaultValue={code}
        onChange={handleChange}
      />
    </div>
  );
};

export default Playground;
