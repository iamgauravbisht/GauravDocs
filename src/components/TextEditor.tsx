import "./TextEditor.css";
import { useState, useEffect, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import Quill, { TextChangeHandler } from "quill";
import Delta from "quill-delta";
import useMyContext from "../store/useMyContext";

interface ServerToClientEvents {
  "receive-changes": (delta: Delta) => void;
  "load-document": (
    delta: Delta,
    title: string,
    role: string,
    owner: string
  ) => void;
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
  const { state, dispatch } = useMyContext();

  // const [loaded, setLoaded] = useState(false); // Add a loaded flag
  const [quill, setQuill] = useState<Quill | null>(null);
  const [socket, setSocket] = useState<Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null>(null);

  useEffect(() => {
    const s: Socket<ServerToClientEvents, ClientToServerEvents> = io(
      "https://gauravdoc-a6df4891978f.herokuapp.com"
    );
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket == null || quill == null) return;

    socket.once("load-document", (delta: Delta, title, role, owner) => {
      if (role == "read&write" || role == "owner" || role == "read") {
        dispatch({ type: "SET_CURRENT_DOCUMENT_NAME", payload: title });
        dispatch({ type: "SET_CURRENT_DOCUMENT_OWNER", payload: owner });
        quill.setContents(delta);
        quill.enable();
        if (role === "read") {
          quill.disable();
        }
      }
      if (role == "unauthorized") {
        quill.disable();
      }
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

  useEffect(() => {
    if (socket == null || quill == null) return;
    const handler = (delta: Delta) => {
      quill.updateContents(delta);
      console.log("recieve-changes:", delta);
    };
    socket.on("receive-changes", handler);

    return () => {
      socket.off("receive-changes", handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler: TextChangeHandler = async (delta, _oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };

    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
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
