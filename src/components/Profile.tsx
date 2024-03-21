import { ReactNode } from "react";
import ProfilePhoto from "./ProfilePhoto";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type Props = {
  children: ReactNode;
};

export const Profile = ({ children }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        className=" px-4 py-6 
         bg-[#1e2030] border border-white rounded-3xl flex items-center flex-col gap-4"
      >
        <ProfilePhoto />
        <div className="w-full flex flex-col gap-4">
          <p>
            username: @<span>vaibhav018</span>{" "}
          </p>
          <div className="flex gap-6">
            <p>Friends :</p>
            <span>{100}</span>
          </div>
          <div className="flex gap-6">
            <p>Groups :</p>
            <span>{100}</span>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
