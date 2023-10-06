import DisplaysDocs from "./DisplaysDocs";
import { Button } from "./ui/button";
import useMyContext from "../store/useMyContext";

export default function Home(): JSX.Element {
  const { dispatch } = useMyContext();
  function generateRandomUniqueString(length: number): string {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    // You can add a unique identifier to ensure uniqueness
    const timestamp = Date.now().toString(36);
    result += timestamp;

    return result;
  }

  const handleCreateDoc = () => {
    // create document id
    const newDocId = generateRandomUniqueString(120);
    dispatch({ type: "SET_CREATE_DOCUMENT_ID", payload: `${newDocId}` });
    // set appState to editor and open the same document which you just created
    dispatch({ type: "SET_APPSTATE", payload: "editor" });
  };

  return (
    <div className="max-w-[600px] w-full min-w-[200px]">
      <Button className="mb-1" onClick={handleCreateDoc}>
        Create Doc
      </Button>
      <DisplaysDocs />
    </div>
  );
}
