import { message } from "@/features/user/chatSlice";
import { useEffect, useRef } from "react";
import Bubble from "./Bubble";

type Props = {
  newChats: message[];
  oldChats: message[];
};

export default function ChatBody({ newChats, oldChats }: Props) {
  // const userId = useSelector((state: RootState) => state.auth._id);
  const scrollRef = useRef<HTMLDivElement>(null);

  const userId = "asdfasdf asdf";
  if (!userId) {
    return <></>;
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [newChats]);

  return (
    <div className="flex-grow bg-[#222436] rounded-2xl relative py-3 px-2 overflow-auto">
      <div className="absolute left-0 top-0 bottom-0 right-0 px-4 py-2 ">
        <div className="flex flex-col gap-4">
          <div className="h-10"></div>
          {oldChats &&
            oldChats.map((val) => (
              <Bubble
                username={val.user.username}
                chat={val.chatMessage}
                key={val._id}
                chatSide={userId === val.user._id ? "chat-end" : "chat-start"}
              />
            ))}
          {newChats &&
            newChats.map((val) => (
              <Bubble
                username={val.user.username}
                chat={val.chatMessage}
                key={val._id}
                chatSide={userId === val.user._id ? "chat-end" : "chat-start"}
              />
            ))}
          <div ref={scrollRef} className="h-10"></div>
        </div>
      </div>
    </div>
  );
}
