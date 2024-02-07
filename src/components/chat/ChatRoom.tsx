import { RootState } from "@/app/store";
import GroupChat from "@/components/chat/GroupChat";
import PersonalChat from "@/components/chat/PersonalChat";
import { useSelector } from "react-redux";

export default function ChatRoom() {
  const { id, typeOfChat, name } = useSelector(
    (state: RootState) => state.chatroom
  );

  if (!id || !name) {
    return (
      <p className="flex items-center justify-center h-full text-2xl">
        No Chat Available
      </p>
    );
  } else {
    return (
      <>
        {typeOfChat === "Group" ? (
          <GroupChat chatId={id} chatName={name} />
        ) : (
          <PersonalChat chatId={id} chatName={name} />
        )}
      </>
    );
  }
}
