import { RootState } from "@/app/store";
import Preview from "@/components/inbox/Preview";
import UserList from "@/components/inbox/UserList";
import { setChatRoom } from "@/features/chatroom/chatRoomSlice";
import { chatOpen } from "@/features/responsive/responsiveSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Personal() {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.personal.users);
  const [userListOpen, setUserListOpen] = useState(false);

  const hidePersonalList = () => {
    setUserListOpen(false);
  };

  const openChat = (id: string, username: string) => {
    dispatch(setChatRoom({ id, name: username, typeOfChat: "Personal" }));
    dispatch(chatOpen());
  };

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
              <button
                className="py-[5px] rounded-xl bg-gray-400 w-full
             text-black text-lg font-medium"
                onClick={() => {
                  setUserListOpen(true);
                }}
              >
                Add Friend
              </button>
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
