import { ReactNode } from "react";
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
      <DropdownMenuContent className="w-[230px] h-[150px] border rounded-3xl"></DropdownMenuContent>
    </DropdownMenu>
  );
};

/*         <span className="hover:underline transition-all cursor-pointer">
          {" "}
          @vaibhav018{" "}
        </span>
 */
