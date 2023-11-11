import { BsThreeDotsVertical } from "react-icons/bs";
import Profile from "../Profile";

export default function ChatHeader() {
  return (
    <div className="relative py-2 px-2 text-sm  xs:text-lg flex gap-3 sm:gap-6 items-center bg-[#222436] rounded-2xl ">
      <Profile />
      <div className="flex flex-col ">
        <span>username username</span>
        <span>last seen: 12:08</span>
      </div>
      <span className="absolute right-2 sm:right-6 p-2 cursor-pointer transition-all hover:bg-[#1e2030]  rounded-full">
        <BsThreeDotsVertical className={"text-lg"} />
      </span>
    </div>
  );
}
