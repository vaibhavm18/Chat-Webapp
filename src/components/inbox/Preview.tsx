import ProfilePhoto from "../ProfilePhoto";
import { Button } from "../ui/button";

type Props = {
  _id: string;
  username: string;
  add?: (id: string, name: string) => void;
  openChat?: (id: string, name: string) => void;
};

export default function Preview({ _id, username, add, openChat }: Props) {
  return (
    <div
      onClick={() => {
        if (openChat) {
          openChat(_id, username);
        }
      }}
      className="p-2 relative rounded-2xl cursor-pointer flex items-center  gap-3 bg-[#1e2030]"
    >
      <ProfilePhoto />
      <span>{username}</span>
      <span className="hidden">{_id}</span>
      {add && (
        <Button
          variant={"ghost"}
          className="absolute right-2"
          onClick={() => {
            add(_id, username);
          }}
        >
          +
        </Button>
      )}
    </div>
  );
}
