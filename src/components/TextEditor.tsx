import "./TextEditor.css";
import { useState, useEffect, useCallback } from "react";
// import "react-quill/dist/quill.snow.css";
import { io, Socket } from "socket.io-client";
import Quill, { TextChangeHandler } from "quill";
// import {
//   createDoc,
//   // updateDocument,
//   recentDocs,
//   allDocs,
// } from "@/authController/docController";
// import { createDoc } from "../authController/docController";
// import DeltaOperation from "quill";
import useMyContext from "../store/useMyContext";

interface ServerToClientEvents {
  "receive-changes": (delta: unknown) => void;
  "load-document": (delta: unknown) => void;
}
interface ClientToServerEvents {
  "send-changes": (delta: unknown) => void;
  "get-document": (documentId: string, userId: string) => void;
  "save-document": (delta: unknown) => void;
}
const SAVE_INTERVAL_MS = 2000;

const Toolbar_Options = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  //   [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"], // remove formatting button
];

export default function TextEditor(): JSX.Element {
  // const [value, setValue] = useState<string>("");
  const { state, dispatch } = useMyContext();

  const [quill, setQuill] = useState<Quill | null>(null);
  const [socket, setSocket] = useState<Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null>(null);

  useEffect(() => {
    const s: Socket<ServerToClientEvents, ClientToServerEvents> = io(
      "http://localhost:3000"
    );
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket == null || quill == null) return;
    const handler = (delta) => {
      quill.updateContents(delta);
    };
    socket.on("receive-changes", handler);

    return () => {
      socket.off("receive-changes", handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler: TextChangeHandler = async (
      delta
      // _oldDelta,
      // source: string
    ) => {
      socket.emit("send-changes", delta);
    };
    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    socket.once("load-document", (delta, title) => {
      quill.setContents(delta);
      dispatch({ type: "SET_CURRENT_DOCUMENT_NAME", payload: title });
      quill.enable();
    });

    socket.emit("get-document", state.currentDocumentId, state.userId);
  }, [socket, quill, state.currentDocumentId, state.userId, dispatch]);

  useEffect(() => {
    if (socket == null || quill == null) return;
    const interval = setInterval(() => {
      socket.emit("save-document", quill.getContents());
    }, SAVE_INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  const wrapperRef = useCallback((wrapper: HTMLDivElement | null) => {
    if (wrapper === null) return;
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: {
        toolbar: Toolbar_Options,
      },
    });

    q.disable();
    q.setText("Loading...");

    setQuill(q);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="wrapper flex flex-col items-center w-full"
    ></div>
  );
}
