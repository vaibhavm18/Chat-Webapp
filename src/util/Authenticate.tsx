import Headers from "@/components/Headers";
import ChatRoom from "@/components/chat/ChatRoom";
import Inbox from "@/components/inbox/Inbox";
import { useState } from "react";

export const Authenticate = () => {
  const [isHidden, setIsHidden] = useState(false);
  return (
    <main className="bg-[#1e2030] h-screen text-[#BCD1EF] px-4 py-6 ">
      <section className=" max-w-xl lg:max-w-7xl mx-auto h-full  flex flex-col">
        <Headers />
        <div className="flex-grow bg-[#222436] mt-6 rounded-2xl p-3">
          <section className=" lg:grid grid-cols-8 h-full gap-2">
            <div
              className={`bg-[#1e2030] col-span-3 rounded-xl p-2 ${
                isHidden ? "hidden" : "flex h-full"
              } lg:flex flex-col gap-4 `}
              onClick={() => {
                setIsHidden((prev) => !prev);
              }}
            >
              <Inbox />
            </div>
            <div
              className={`bg-[#1e2030] ${
                !isHidden ? "hidden" : "h-full"
              } lg:block col-span-5 rounded-xl p-2 `}
              onClick={() => {
                setIsHidden((prev) => !prev);
              }}
            >
              <ChatRoom />
            </div>
          </section>
        </div>
      </section>
    </main>
  );
};
