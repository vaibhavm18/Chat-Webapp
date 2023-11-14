import { IoIosNotifications } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const Notification = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <IoIosNotifications className="text-3xl cursor-pointer hover:scale-105 transition-all " />
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" max-w-md w-80 h-[500px] px-2  border border-white rounded-2xl flex flex-col gap-4 mt-4 bg-[#222436] relative overflow-auto">
        <div className="absolute top-0 left-2 bottom-4 right-2 ">
          <DropdownMenuLabel className="text-center py-3">
            My Account
          </DropdownMenuLabel>
          <div className="flex flex-col gap-4 ">
            <div className="bg-[#1e2030] py-1 px-2">hello</div>
            <div className="bg-[#1e2030] py-1 px-2">hello</div>
            <div className="bg-[#1e2030] py-1 px-2">hello</div>
            <div className="bg-[#1e2030] py-1 px-2">hello</div>
            <div className="bg-[#1e2030] py-1 px-2">hello</div>
            <div className="bg-[#1e2030] py-1 px-2">hello</div>
            <div className="bg-[#1e2030] py-1 px-2">hello</div>
            <div className="bg-[#1e2030] py-1 px-2">hello</div>
            <div className="bg-[#1e2030] py-1 px-2">hello</div>
            <div className="bg-[#1e2030] py-1 px-2">hello</div>
            <div className="bg-[#1e2030] py-1 px-2">hello</div>
            <div className="w-full h-6"></div>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
