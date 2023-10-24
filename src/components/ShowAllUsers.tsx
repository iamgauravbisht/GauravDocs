import { Button } from "@/components/ui/button";
// import AddUserForm from "./AddUserForm";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  // SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { addUsers } from "@/authController/docController";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  // DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  // DropdownMenuSub,
  // DropdownMenuSubContent,
  // DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { getAllUsers } from "@/authController/docController";
import useMyContext from "@/store/useMyContext";

type User = {
  id: string;
  username: string;
  rights: string;
};

export default function ShowAllUsers(): JSX.Element {
  const [allUsers, setAllUsers] = useState([]);
  const { state } = useMyContext();
  const [addUserId, setAddUserId] = useState("");
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [addUserError, setAddUserError] = useState<string>("");

  const handleAddUser = async () => {
    setAddUserError("");
    try {
      if (!selectedValue) {
        setAddUserError("Please select a role");
      }
      if (!addUserId) {
        setAddUserError("Please enter a user id");
      }
      const check = await addUsers(
        state.currentDocumentId,
        addUserId,
        selectedValue
      );

      if (check.error) {
        setAddUserError(check.error);
      } else {
        setAddUserId("");
        setSelectedValue("");
        updateUsersList();
      }
    } catch (err) {
      console.log(err);
      setAddUserError("internal server error");
    }
  };

  const updateUsersList = async () => {
    const data = await getAllUsers(state.currentDocumentId);
    setAllUsers(data.users);
  };

  // useEffect(() => {
  //   updateUsersList();
  // }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild onClick={updateUsersList}>
        <Button variant="outline">All Users</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>All Users</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem key={state.currentDocumentId}>
            {state.currentDocumentOwner}
            <DropdownMenuShortcut>owner</DropdownMenuShortcut>
          </DropdownMenuItem>
          {allUsers.length > 0
            ? allUsers.map((data: User) => {
                if (data) {
                  return (
                    <DropdownMenuItem key={data.id}>
                      {data.username}
                      <DropdownMenuShortcut>{data.rights}</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  );
                } else {
                  return null;
                }
              })
            : null}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {/* <AddUserForm /> */}
          {addUserError ? (
            <small className="text-red-500 ml-1">{addUserError}</small>
          ) : null}
          <Input
            id="addUserId"
            placeholder="addUserId"
            value={addUserId}
            onChange={(e) => setAddUserId(e.target.value)}
            className="mb-2"
          />
          <Select onValueChange={(value) => setSelectedValue(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="read">read</SelectItem>
                <SelectItem value="read&write">read&write</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button className="w-full mt-2" onClick={handleAddUser}>
            Add User
          </Button>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
