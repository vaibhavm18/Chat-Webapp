import Headers from "@/components/Headers";
import ChatRoom from "@/components/chat/ChatRoom";
import Inbox from "@/components/inbox/Inbox";

export const Authenticate = () => {
  return (
    <main className="bg-[#1e2030] h-screen text-[#BCD1EF] px-4 py-6 ">
      <section className="max-w-7xl mx-auto h-full  flex flex-col">
        <Headers />
        <div className="flex-grow bg-[#222436] mt-6 rounded-2xl p-6">
          <section className="grid grid-cols-8 h-full gap-6">
            <div className="bg-[#1e2030] col-span-3 rounded-lg p-4 flex flex-col gap-4 ">
              <Inbox />
            </div>
            <div className="bg-[#1e2030] col-span-5 rounded-lg p-4">
              <ChatRoom />
            </div>
          </section>
        </div>
      </section>
    </main>
  );
};
