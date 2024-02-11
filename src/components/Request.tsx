import { acceptFriendRequest, declineFriendRequest } from "@/api";
import { useSocket } from "@/context/SocketProvider";
import { removeNotification } from "@/features/notification/notificationSlice";
import { addUser } from "@/features/user/userSlice";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { Profile } from "./Profile";
import { Button } from "./ui/button";

type Props = {
  username: string;
  id: string;
};

export const Request = ({ username, id }: Props) => {
  const dispatch = useDispatch();
  const socket = useSocket();
  const accept = useMutation({
    mutationKey: ["Accept", id],
    mutationFn: async (id: string) => await acceptFriendRequest(id),
    onSuccess(data) {
      socket?.emit("accept friend request", data.data.data);
      dispatch(removeNotification({ id }));
      dispatch(addUser(data.data.data.friend));
    },
  });

  const decline = useMutation({
    mutationKey: ["Decline", id],
    mutationFn: async (id: string) => await declineFriendRequest(id),
    onSuccess(_data) {
      dispatch(removeNotification({ id }));
    },
  });

  return (
    <div className="px-2 py-3  flex flex-col gap-4 bg-[#1e2030] border rounded-xl">
      <p>
        Accept friend request from{"  "}
        <Profile>
          <span className="hover:underline transition-all cursor-pointer">
            {" "}
            @{username}
          </span>
        </Profile>
        ?
      </p>
      <div className="flex justify-between">
        <Button
          className="bg-green-500 hover:bg-green-600 rounded-3xl"
          onClick={() => {
            accept.mutateAsync(id);
          }}
          disabled={decline.isPending || accept.isPending ? true : false}
        >
          Accept
        </Button>
        <Button
          className="bg-red-500 hover:bg-red-600 rounded-3xl"
          onClick={() => {
            decline.mutateAsync(id);
          }}
          disabled={decline.isPending || accept.isPending ? true : false}
        >
          Decline
        </Button>
      </div>
    </div>
  );
};
