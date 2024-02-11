import { friendRequest } from "@/api";
import { RootState } from "@/app/store";
import { useSocket } from "@/context/SocketProvider";
import { removeListUser } from "@/features/user/userListSlice";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import Preview from "./Preview";

type Props = {
  hidePersonalList: () => void;
};
export default function UserList({ hidePersonalList }: Props) {
  const dispatch = useDispatch();
  const socket = useSocket();
  const users = useSelector((state: RootState) => state.userList.users);

  const mutation = useMutation({
    mutationKey: ["SendRequest"],
    mutationFn: async (id: string) => await friendRequest(id),
    onSuccess(data) {
      socket?.emit("friend request", data.data.data);
      dispatch(removeListUser({ _id: data.data?.data.request.to }));
    },
  });

  const addToPersonal = (id: string) => {
    mutation.mutateAsync(id);
  };

  return (
    <div className=" flex-grow bg-[#222436] rounded-lg relative overflow-auto py-4">
      <div className="absolute  m-2 left-0 right-0 top-0 grid grid-cols-1 gap-2">
        {!users || (users.length === 0 && <p>No Users.</p>)}
        {users.map((val) => (
          <Preview
            _id={val._id}
            username={val.username}
            key={val._id}
            add={addToPersonal}
          />
        ))}
        <div className="h-6"></div>
        <div className="flex gap-2 lg:gap-4">
          <Button
            className="w-full rounded-xl text-lg  bg-gray-400 hover:bg-gray-300 text-black"
            onClick={hidePersonalList}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
}
