import { RootState } from "@/app/store";
import GroupList from "@/components/inbox/GroupList";
import NewGroup from "@/components/inbox/NewGroup";
import Preview from "@/components/inbox/Preview";
import { Button } from "@/components/ui/button";
import { useSocket } from "@/context/SocketProvider";
import { setChatRoom } from "@/features/chatroom/chatRoomSlice";
import { addNewChat } from "@/features/group/chatSlice";
import { chatOpen } from "@/features/responsive/responsiveSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Groups() {
  const dispatch = useDispatch();
  const socket = useSocket();
  const groups = useSelector((state: RootState) => state.group.groups);

  const [openList, setOpenList] = useState(false);
  const hideGroupList = () => {
    setOpenList(false);
  };

  const openChat = (id: string, username: string) => {
    dispatch(setChatRoom({ id, name: username, typeOfChat: "Group" }));
    dispatch(chatOpen());
  };

  useEffect(() => {
    socket?.on("group message", (data: any) => {
      dispatch(addNewChat(data));
    });
  }, []);
  return (
    <>
      {!openList ? (
        <div className=" flex-grow bg-[#222436] rounded-lg relative overflow-auto py-4">
          <div className="absolute  m-2 left-0 right-0 top-0 grid grid-cols-1 gap-2">
            {/* {isLoading && <Loader />} */}
            {groups.map((val) => (
              <Preview
                _id={val._id}
                username={val.name}
                key={val._id}
                openChat={openChat}
              />
            ))}
            <div className="h-6"></div>
            <div className="flex items-center justify-center gap-4">
              <NewGroup />
              <Button
                className="w-full rounded-xl text-lg  bg-gray-400 hover:bg-gray-300 text-black"
                onClick={() => {
                  setOpenList(true);
                }}
              >
                Join
              </Button>
            </div>
            <div className="h-32"></div>
          </div>
        </div>
      ) : (
        <GroupList hideGroupList={hideGroupList} />
      )}
    </>
  );
}
