import { allFriends, allGroups, getAllUsers, getMyGroups } from "@/api";
import { useSocket } from "@/context/SocketProvider";
import { removeChatRoom } from "@/features/chatroom/chatRoomSlice";
import { addGroupLists } from "@/features/group/groupListSlice";
import { addGroups } from "@/features/group/groupSlice";
import { addListUsers, singleUserList } from "@/features/user/userListSlice";
import { addUsers, removeUser } from "@/features/user/userSlice";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

type data = {
  data: {
    name: string;
    _id: string;
  }[];
};

export function useGroup(id: string | null) {
  const dispatch = useDispatch();
  const socket = useSocket();

  const groups = useQuery({
    queryKey: ["groups"],
    staleTime: Infinity,
    queryFn: async () => await getMyGroups(),
    retry: 0,
  });

  const groupList = useQuery({
    queryKey: ["groupList"],
    queryFn: async () => await allGroups(),
    staleTime: Infinity,
    retry: 0,
  });

  useEffect(() => {
    if (groups.data) {
      dispatch(addGroups(groups.data.data));
      const group = groups.data as data;
      const groupIds = group.data.map((val) => val._id);
      socket?.emit("join groups", {
        userId: id,
        groupIds,
      });
    }
  }, [groups.data]);

  useEffect(() => {
    if (groupList.data) {
      dispatch(addGroupLists(groupList.data.data.data));
    }
  }, [groupList.data]);

  return {
    groupLoading: groups.isLoading || groupList.isLoading,
    error: "Something went wrong",
  };
}

export function usePersonal() {
  const socket = useSocket();
  const dispatch = useDispatch();
  const userList = useQuery({
    queryKey: ["userList"],
    queryFn: async () => await getAllUsers(),
    staleTime: Infinity,
    retry: 0,
  });

  const personal = useQuery({
    queryKey: ["personal"],
    staleTime: Infinity,
    queryFn: async () => await allFriends(),
    retry: 0,
  });

  useEffect(() => {
    if (personal.data) {
      dispatch(addUsers(personal.data.data.data.friends));
    }
  }, [personal.data]);

  useEffect(() => {
    if (userList.data) {
      dispatch(addListUsers(userList.data.data.data));
    }
  }, [userList.data]);

  useEffect(() => {
    socket?.on("remove user", (data: { id: string; username: string }) => {
      dispatch(singleUserList({ _id: data.id, username: data.username }));
      dispatch(removeUser({ _id: data.id }));
      dispatch(removeChatRoom());
    });
  }, []);

  return {
    userLoading: userList.isLoading || personal.isLoading,
    error: "Something went wrong",
  };
}
