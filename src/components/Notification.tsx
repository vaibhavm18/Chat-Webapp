import { notification } from "@/api";
import { RootState } from "@/app/store";
import { useSocket } from "@/context/SocketProvider";
import { addNotifications } from "@/features/notification/notificationSlice";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { IoIosNotifications } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import { Request } from "./Request";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const Notification = () => {
  const dispatch = useDispatch();
  const socket = useSocket();

  const notifications = useSelector(
    (state: RootState) => state.notification.notifications
  );

  const { isLoading, data } = useQuery({
    queryKey: ["notification"],
    queryFn: async () => await notification(),
    staleTime: Infinity,
    retry: 0,
  });

  useEffect(() => {
    if (data) {
      dispatch(addNotifications(data.data?.data));
    }
  }, [data, isLoading]);

  useEffect(() => {
    socket?.on("friend request", (data: any) => {
      console.log(data);
      dispatch(addNotifications(data));
    });
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <IoIosNotifications className="text-3xl cursor-pointer hover:scale-105 transition-all " />
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" max-w-md w-80 h-[500px] px-2  border border-white rounded-2xl flex flex-col gap-4 mt-4 bg-[#222436] relative overflow-auto">
        <div className="absolute top-0 left-2 bottom-4 right-2 ">
          <DropdownMenuLabel className="text-center py-3">
            Notification
          </DropdownMenuLabel>
          <div className="flex flex-col gap-4 ">
            {notifications.map((val) => (
              <Request key={val._id} id={val._id} username={val.username} />
            ))}
            {isLoading && <Loader />}
            <div className="w-full h-6"></div>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
