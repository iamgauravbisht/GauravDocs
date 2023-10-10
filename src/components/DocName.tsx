import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useMyContext from "@/store/useMyContext";
import { saveName } from "@/authController/docController";

export function DocName() {
  const { state, dispatch } = useMyContext();
  const nameChangeHandler = async () => {
    await saveName(state.currentDocumentId, state.currentDocumentName);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{state.currentDocumentName}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Name</DialogTitle>
          <DialogDescription>
            Update Name then Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              New Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
              value={state.currentDocumentName}
              onChange={(e) =>
                dispatch({
                  type: "SET_CURRENT_DOCUMENT_NAME",
                  payload: e.target.value,
                })
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={nameChangeHandler}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
