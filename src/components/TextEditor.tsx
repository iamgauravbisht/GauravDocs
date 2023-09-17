import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./TextEditor.css";

export default function TextEditor(): JSX.Element {
  const [value, setValue] = useState("");

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={setValue}
      className="w-full min-h-screen max-w-4xl mb-40 mx-5 flex flex-col justify-start items-center gap-4 relative "
    />
  );
}
