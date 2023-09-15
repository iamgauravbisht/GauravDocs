import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import cross from "@/assets/cross.svg";

export default function SearchBox(): JSX.Element {
  const [showSearchBox, setShowSearchBox] = useState<boolean>(false);

  const showSearchBoxHandler = () => {
    setShowSearchBox((prevState) => !prevState);
  };

  return (
    <div className=" max-w-[700px] min-w-[200px] flex justify-center items-center  relative">
      {showSearchBox ? (
        <>
          <Input type="search" className="max-w-[200px]" />
          <img
            src={cross}
            alt="close"
            className="cursor-pointer"
            onClick={showSearchBoxHandler}
          />
        </>
      ) : (
        <Button onClick={showSearchBoxHandler}>Search Document</Button>
      )}
    </div>
  );
}
