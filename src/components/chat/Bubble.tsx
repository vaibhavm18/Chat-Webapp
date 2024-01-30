import { Profile } from "../Profile";
import ProfilePhoto from "../ProfilePhoto";

type chatSide = "chat-start" | "chat-end";
type Props = {
  chatSide: chatSide;
  chat: string;
  username: string;
};
export default function Bubble({ chat, chatSide, username }: Props) {
  return (
    <div className={`chat text-xs xs:text-sm ${chatSide}`}>
      <div className="chat-image avatar">
        <Profile>
          <ProfilePhoto />
        </Profile>
      </div>
      <div className="mx-4 mb-1 chat-header">
        {username}
        <time className="ml-4 text-xs opacity-50">12:45</time>
      </div>
      <div className="chat-bubble bg-[#1e2030] ">{chat}</div>
    </div>
  );
}
