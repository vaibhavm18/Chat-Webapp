import { RootState } from "@/app/store";
import Headers from "@/components/Headers";
import ChatRoom from "@/components/chat/ChatRoom";
import InboxHeder from "@/components/inbox/InboxHeader";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

export const Home = () => {
  const isHidden = useSelector((state: RootState) => state.responsive.chatOpen);

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
              <Outlet />
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
};
