import { getGroupMessage, leaveGroup, sendGroupMessage } from "@/api";
import { RootState } from "@/app/store";
import { useSocket } from "@/context/SocketProvider";
import { addNewChat, addOldChats } from "@/features/group/chatSlice";
import { removeGroup } from "@/features/group/groupSlice";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatHeader from "./ChatHeader";
import GroupChatBody from "./GroupChatBody";
import Input from "./Input";

type Props = {
  chatId: string;
  chatName: string;
};

export default function GroupChat({ chatId, chatName }: Props) {
  const dispatch = useDispatch();
  const socket = useSocket();
  const newChats = useSelector(
    (state: RootState) => state.groupChats.newChats[chatId]
  );

  const oldChats = useSelector(
    (state: RootState) => state.groupChats.oldChats[chatId]
  );

  const { isLoading, data } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: async () => await getGroupMessage(chatId),
    retry: 1,
    staleTime: Infinity,
  });

  const mutation = useMutation({
    mutationKey: ["send group chat", chatId],
    retry: 1,
    mutationFn: async ({ id, message }: { id: string; message: string }) =>
      await sendGroupMessage(id, message),
    onSuccess(data, _v, _context) {
      dispatch(addNewChat(data.data.data));
      socket?.emit("group message", data.data.data);
    },
  });

  useEffect(() => {
    if (data) {
      dispatch(addOldChats(data.data.data));
    }
  }, [data]);

  function sendChat(chatId: string, message: string) {
    mutation.mutateAsync({ id: chatId, message });
  }

  function removeFromList(id: any) {
    dispatch(removeGroup({ _id: id }));
  }

  return (
    <div className="flex flex-col gap-3 h-full  ">
      <ChatHeader
        removeFromList={removeFromList}
        leave={leaveGroup}
        username={chatName}
        id={chatId}
      />
      <GroupChatBody
        newChats={newChats}
        oldChats={oldChats}
        isLoading={isLoading}
      />
      <Input chatId={chatId} sendMessage={sendChat} />
    </div>
  );
}
