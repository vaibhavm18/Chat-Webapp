import { removeChatRoom } from "@/features/chatroom/chatRoomSlice";
import { closeChat } from "@/features/responsive/responsiveSlice";
import { AlertDialog, AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdOutlineLogout } from "react-icons/md";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Profile } from "../Profile";
import ProfilePhoto from "../ProfilePhoto";
import { Button } from "../ui/button";
import Exist from "./Exist";

type Props = {
  username: string;
  id: string;
  leave: (id: string) => Promise<AxiosResponse<any, any>>;
  removeFromList: (data: any) => void;
};
export default function ChatHeader({
  username,
  id,
  leave,
  removeFromList,
}: Props) {
  const dispatch = useDispatch();
  const hideChat = () => {
    dispatch(closeChat());
  };

  const mutation = useMutation({
    mutationKey: ["exit group"],
    retry: 1,
    mutationFn: async (id: string) => await leave(id),
    onSuccess() {
      removeChatRoom();
      removeFromList(id);
    },
    onError(error: { response: { data: { message: string } } }) {
      const e = error.response.data.message;
      toast.error(e, {
        position: "top-center",
        className: "bg-[#222436] text-white",
      });
    },
  });

  const onPress = () => {
    mutation.mutateAsync(id);
  };

  return (
    <>
      <ToastContainer />
      <div className="py-2 px-2 text-sm  xs:text-lg flex gap-3 sm:gap-6 items-center bg-[#222436] rounded-2xl ">
        <Profile>
          <ProfilePhoto />
        </Profile>
        <span>{username}</span>
        <AlertDialog>
          <span className="absolute right-4 flex gap-6">
            <Button variant={"ghost"} onClick={hideChat} className="lg:hidden">
              <IoMdArrowRoundBack />
            </Button>
            <AlertDialogTrigger>
              <MdOutlineLogout className={"text-lg"} />
            </AlertDialogTrigger>
          </span>
          <Exist onPress={onPress} />
        </AlertDialog>
      </div>
    </>
  );
}
