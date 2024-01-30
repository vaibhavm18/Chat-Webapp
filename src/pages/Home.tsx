import Headers from "@/components/Headers";
import ChatRoom from "@/components/chat/ChatRoom";
import InboxHeder from "@/components/inbox/InboxHeader";
import { addGroupLists } from "@/features/group/groupListSlice";
import { addListUsers } from "@/features/user/userListSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

const nums = [1, 2, 3, 4, 5, 6];
export const Home = () => {
  const dispatch = useDispatch();
  const [isHidden, setIsHidden] = useState(false);

  const populate = () => {
    dispatch(
      addGroupLists(
        nums.map((val) => ({ _id: val + "", groupname: "vaibhav" + val }))
      )
    );
    dispatch(
      addListUsers(
        nums.map((val) => ({ _id: val + "", username: "vaibhav" + val }))
      )
    );
  };
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
              <InboxHeder />
              <Outlet />
              <button
                onClick={() => {
                  populate();
                }}
              >
                hsdf
              </button>
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
