import { Editor } from "@monaco-editor/react";
import React, { useState } from "react";

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
    <div className="rounded-md bg-[red] min-w-[60%] h-full shadow-4xl">
      <Editor
        height="85vh"
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
