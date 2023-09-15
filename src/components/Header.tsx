import { ModeToggle } from "@/components/mode-toggle";
import { Account } from "@/components/Account";
import SearchBox from "./SearchBox";

const Header = (): JSX.Element => {
  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur ">
      <div className="container px-1 sm:px-8 flex h-14 items-center justify-between max-w-7xl">
        {/* <h2 className="text-2xl font-bold tracking-tight">
          Welcome to gauravDocs
        </h2>
          <ModeToggle />
        */}
        <Account />
        <div className="flex items-center justify-between">
          <SearchBox />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};
export default Header;
