import { RootState } from "@/app/store";
import { addNewChat } from "@/features/group/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import ChatBody from "./ChatBody";
import ChatHeader from "./ChatHeader";
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

  function sendChat(chatId: string, message: string) {
    dispatch(
      addNewChat({
        _id: Math.random().toString(),
        chatMessage: message,
        date: Date.now().toString(),
        messageId: chatId,
        user: {
          _id: "123445",
          username: "vaibhav",
        },
      })
    );
  }

  return (
    <div className="flex flex-col gap-3 h-full ">
      <ChatHeader username={chatName} id={chatId} />
      <ChatBody newChats={newChats} oldChats={oldChats} />
      <Input chatId={chatId} sendMessage={sendChat} />
    </div>
  );
}
