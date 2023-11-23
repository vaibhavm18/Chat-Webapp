import ProfilePhoto from "../ProfilePhoto";
import { Profile } from "../Profile";
import { MdOutlineLogout } from "react-icons/md";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@radix-ui/react-alert-dialog";
import { AlertDialogFooter, AlertDialogHeader } from "../ui/alert-dialog";
export default function ChatHeader() {
  return (
    <div className="relative py-2 px-2 text-sm  xs:text-lg flex gap-3 sm:gap-6 items-center bg-[#222436] rounded-2xl ">
      <Profile>
        <ProfilePhoto />
      </Profile>
      <div className="flex flex-col ">
        <span>username username</span>
        <span>last seen: 12:08</span>
      </div>
      <AlertDialog>
        <span className="absolute right-2 sm:right-6 top-5 p-2 cursor-pointer transition-all hover:bg-[#1e2030]  rounded-full">
          <AlertDialogTrigger>
            <MdOutlineLogout className={"text-lg"} />
          </AlertDialogTrigger>
        </span>
        <AlertDialogContent className="bg-[#1e2030] border border-white rounded-2xl absolute right-8">
          <AlertDialogHeader className="p-2 ">
            <AlertDialogTitle className="text-center">
              Are you sure ?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter className="px-4 py-2">
            <AlertDialogAction className="bg-green-500 px-2 rounded-2xl">
              Continue
            </AlertDialogAction>
            <AlertDialogCancel className="bg-red-500 px-2 rounded-2xl">
              Cancel
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
