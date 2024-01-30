import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function NewGroup() {
  const [groupname, setGroupname] = useState("");
  const [description, setDescription] = useState("");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="py-[5px] rounded-xl bg-gray-400 w-full
             text-black text-lg font-medium"
        >
          Create
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] bg-[#1e2030]">
        <DialogHeader>
          <DialogTitle className="text-center">Create Group</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Groupname
            </Label>
            <Input
              id="name"
              value={groupname}
              onChange={(e) => {
                setGroupname(e.target.value);
              }}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Description
            </Label>
            <Input
              id="username"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter className="flex flex-row justify-around items-center">
          <Button type="submit">Create</Button>
          <DialogClose asChild>
            <Button type="submit">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
