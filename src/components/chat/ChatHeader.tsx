import { closeChat } from "@/features/responsive/responsiveSlice";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@radix-ui/react-alert-dialog";
import { MdOutlineLogout } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Profile } from "../Profile";
import ProfilePhoto from "../ProfilePhoto";
import { AlertDialogFooter, AlertDialogHeader } from "../ui/alert-dialog";
import { Button } from "../ui/button";

type Props = {
  username: string;
  id: string;
};
export default function ChatHeader({ username, id }: Props) {
  const dispatch = useDispatch();

  const hideChat = () => {
    dispatch(closeChat());
  };
  return (
    <div className="relative py-2 px-2 text-sm  xs:text-lg flex gap-3 sm:gap-6 items-center bg-[#222436] rounded-2xl ">
      <Profile>
        <ProfilePhoto />
      </Profile>
      <span>{username}</span>
      <AlertDialog>
        <span className="absolute right-4 flex gap-6">
          <Button variant={"ghost"} onClick={hideChat}>
            {"<"}-
          </Button>
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
