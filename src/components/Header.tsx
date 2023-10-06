import { ModeToggle } from "@/components/mode-toggle";
import { Account } from "@/components/Account";
import SearchBox from "./SearchBox";
import AddUsers from "./AddUsers";
import ShowAllUsers from "./ShowAllUsers";
import { Button } from "@/components/ui/button";
import useMyContext from "@/store/useMyContext";

const Header = (): JSX.Element => {
  const { state } = useMyContext();

  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur ">
      <div className="container px-1 sm:px-8 flex h-14 items-center justify-between max-w-7xl">
        {/* if user not logged in */}
        {state.appState === "auth" ? (
          <>
            <h2 className="text-2xl font-bold tracking-tight">
              Welcome to gauravDocs
            </h2>
            <ModeToggle />
          </>
        ) : null}

        {/* logedin state  */}
        {state.appState === "home" ? (
          <>
            <Account />
            <div className="flex items-center justify-between gap-2">
              <SearchBox />
              <ModeToggle />
            </div>
          </>
        ) : null}

        {/* texteditor Header */}
        {state.appState === "editor" ? (
          <>
            <Button>Home</Button>
            <div className="flex items-center justify-between gap-2">
              <ShowAllUsers />
              <AddUsers />
              <ModeToggle />
            </div>
          </>
        ) : null}
      </div>
    </header>
  );
};
export default Header;
