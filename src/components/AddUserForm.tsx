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
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { addUsers } from "@/authController/docController";
import useMyContext from "@/store/useMyContext";

export default function AddUserForm(): JSX.Element {
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
      }
    } catch (err) {
      console.log(err);
      setAddUserError("internal server error");
    }
  };

  return (
    <>
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
    </>
  );
}
