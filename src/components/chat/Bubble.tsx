import Profile from "../Profile";

type chatSide = "chat-start" | "chat-end";
type Props = {
  chatSide: chatSide;
  chat?: string;
};
export default function Bubble(props: Props) {
  const { chatSide, chat } = props;
  return (
    <div className={`chat ${chatSide}`}>
      <div className="chat-image avatar">
        <Profile />
      </div>
      <div className="mx-4 mb-1 chat-header">
        username abc
        <time className="ml-4 text-xs opacity-50">12:45</time>
      </div>
      <div className="chat-bubble bg-[#1e2030] ">
        type user messages here {chat && chat}
      </div>
    </div>
  );
}
