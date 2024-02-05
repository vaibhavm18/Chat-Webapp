import { getGroupMessage } from "@/api";
import { RootState } from "@/app/store";
import { addNewChat, addOldChats } from "@/features/group/chatSlice";
import { useQuery } from "@tanstack/react-query";
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

  useEffect(() => {
    if (data) {
      console.log(data.data.data);
      dispatch(addOldChats(data.data.data));
    }
  }, [data]);

  function sendChat(chatId: string, message: string) {
    dispatch(
      addNewChat({
        _id: Math.random().toString(),
        message: message,
        createdAt: Date.now().toString(),
        groupId: chatId,
        sender: {
          _id: "123445",
          username: "vaibhav",
        },
      })
    );
  }

  return (
    <div className="flex flex-col gap-3 h-full ">
      <ChatHeader username={chatName} id={chatId} />
      <GroupChatBody
        newChats={newChats}
        oldChats={oldChats}
        isLoading={isLoading}
      />
      <Input chatId={chatId} sendMessage={sendChat} />
    </div>
  );
}
