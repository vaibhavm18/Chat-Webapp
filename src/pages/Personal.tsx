import { RootState } from "@/app/store";
import Preview from "@/components/inbox/Preview";
import UserList from "@/components/inbox/UserList";
import { Button } from "@/components/ui/button";
import { useSocket } from "@/context/SocketProvider";
import { setChatRoom } from "@/features/chatroom/chatRoomSlice";
import { chatOpen } from "@/features/responsive/responsiveSlice";
import { addNewChat } from "@/features/user/chatSlice";
import { removeListUser } from "@/features/user/userListSlice";
import { addUser } from "@/features/user/userSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Personal() {
  const dispatch = useDispatch();
  const socket = useSocket();
  const username = useSelector((state: RootState) => state.auth.username);
  const users = useSelector((state: RootState) => state.personal.users);

  const [userListOpen, setUserListOpen] = useState(false);

  const hidePersonalList = () => {
    setUserListOpen(false);
  };

  const openChat = (id: string, username: string) => {
    dispatch(setChatRoom({ id, name: username, typeOfChat: "Personal" }));
    dispatch(chatOpen());
  };

  useEffect(() => {
    socket?.on("personal chat", (data: any) => {
      dispatch(addNewChat({ chatId: data.sender._id, message: data }));
    });
  }, []);

  useEffect(() => {
    socket?.on("accept friend request", (data: any) => {
      dispatch(removeListUser({ _id: data.user._id }));
      dispatch(addUser({ _id: data.user._id, username: data.user.username }));
    });
  }, []);

  return (
    <>
      {!userListOpen ? (
        <div className=" flex-grow bg-[#222436] rounded-lg relative overflow-auto py-4">
          <div className="absolute  m-2 left-0 right-0 top-0 grid grid-cols-1 gap-2">
            {users.map((val) => (
              <Preview
                _id={val._id}
                username={val.username}
                key={val._id}
                openChat={openChat}
              />
            ))}
            <div className="h-6"></div>
            <div className="flex items-center justify-center gap-4">
              <Button
                className="w-full rounded-xl text-lg bg-gray-400 hover:bg-gray-300 text-black"
                onClick={() => {
                  setUserListOpen(true);
                }}
              >
                Add Friend
              </Button>
            </div>
            <div className="h-32"></div>
          </div>
        </div>
      ) : (
        <UserList hidePersonalList={hidePersonalList} />
      )}
    </>
  );
}
