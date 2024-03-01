import { RootState } from "@/app/store";
import { message } from "@/features/user/chatSlice";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Loader from "../Loader";
import Bubble from "./Bubble";

type Props = {
  newChats: message[];
  oldChats: message[];
  isLoading: boolean;
};

export default function ChatBody({ newChats, oldChats, isLoading }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const userId = useSelector((state: RootState) => state.auth._id);
  if (!userId) {
    return <></>;
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [newChats, oldChats]);

  return (
    <div className="flex-grow bg-[#222436] rounded-2xl relative py-3 px-2 overflow-auto">
      <div className="absolute left-0 top-0 bottom-0 right-0 px-4 py-2 ">
        <div className="flex flex-col gap-4">
          {isLoading && <Loader />}
          {oldChats &&
            oldChats.map((val) => (
              <Bubble
                username={val.sender.username}
                chat={val.message}
                key={val._id}
                chatSide={userId === val.sender._id ? "chat-end" : "chat-start"}
              />
            ))}
          {newChats &&
            newChats.map((val) => (
              <Bubble
                username={val.sender.username}
                chat={val.message}
                key={val._id}
                chatSide={userId === val.sender._id ? "chat-end" : "chat-start"}
              />
            ))}
          <div ref={scrollRef} className="h-10"></div>
        </div>
      </div>
    </div>
  );
}
