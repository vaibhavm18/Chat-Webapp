import { RootState } from "@/app/store";
import Headers from "@/components/Headers";
import Loader from "@/components/Loader";
import ChatRoom from "@/components/chat/ChatRoom";
import InboxHeder from "@/components/inbox/InboxHeader";
import { useSocket } from "@/context/SocketProvider";
import { useGroup, usePersonal } from "@/hooks/useHome";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

// type data = {
//   data: {
//     name: string;
//     _id: string;
//   }[];
// };

export default function Home() {
  const isHidden = useSelector((state: RootState) => state.responsive.chatOpen);
  const id = useSelector((state: RootState) => state.auth._id);

  const socket = useSocket();

  useEffect(() => {
    socket?.emit("join user", id);
  }, [socket]);

  const { groupLoading } = useGroup(id);
  const { userLoading } = usePersonal();
  return (
    <main className="bg-[#1e2030] h-[94vh] lg:h-screen text-[#BCD1EF] px-4 py-6 ">
      <section className=" max-w-xl lg:max-w-7xl mx-auto h-full  flex flex-col">
        <Headers />
        <div className="flex-grow bg-[#222436] mt-6 rounded-2xl p-3">
          <section className=" lg:grid grid-cols-8 h-full gap-2">
            <div
              className={`bg-[#1e2030] col-span-3 rounded-xl p-2 ${
                isHidden ? "hidden" : "flex h-full"
              } lg:flex flex-col gap-4 `}
            >
              <InboxHeder />
              {groupLoading || userLoading ? <Loader /> : <Outlet />}
            </div>
            <div
              className={`bg-[#1e2030] relative ${
                !isHidden ? "hidden" : "h-full"
              } lg:block col-span-5 rounded-xl p-2 `}
            >
              <ChatRoom />
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
