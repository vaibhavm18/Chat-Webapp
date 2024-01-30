import { Profile } from "./Profile";
import { Button } from "./ui/button";

type Props = {
  username: string;
  id: string;
};

export const Request = ({ username, id }: Props) => {
  return (
    <div className="px-2 py-3  flex flex-col gap-4 bg-[#1e2030] border rounded-xl">
      <p>
        Accept friend request from{"  "}
        <Profile>
          <span className="hover:underline transition-all cursor-pointer">
            {" "}
            @{username}
          </span>
        </Profile>
        ?
      </p>
      <div className="flex justify-between">
        <Button className="bg-green-500 hover:bg-green-600 rounded-3xl">
          Accept
        </Button>
        <Button className="bg-red-500 hover:bg-red-600 rounded-3xl">
          Decline
        </Button>
      </div>
    </div>
  );
};
