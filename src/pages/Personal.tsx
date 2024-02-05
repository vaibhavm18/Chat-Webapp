import { allFriends } from "@/api";
import { RootState } from "@/app/store";
import Loader from "@/components/Loader";
import Preview from "@/components/inbox/Preview";
import UserList from "@/components/inbox/UserList";
import { Button } from "@/components/ui/button";
import { setChatRoom } from "@/features/chatroom/chatRoomSlice";
import { chatOpen } from "@/features/responsive/responsiveSlice";
import { addUsers } from "@/features/user/userSlice";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Personal() {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.personal.users);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["personal"],
    staleTime: Infinity,
    queryFn: async () => await allFriends(),
    retry: 0,
  });
  useEffect(() => {
    if (data) {
      dispatch(addUsers(data.data.data.friends));
    }
  }, [data]);
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
            {isLoading && <Loader />}
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
              <Button
                className="w-full rounded-xl text-lg bg-gray-400 hover:bg-gray-300 text-black"
                onClick={() => {
                  refetch();
                }}
              >
                Refresh
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
