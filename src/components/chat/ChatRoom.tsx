import Input from './Input';
import ChatHeader from './ChatHeader';
import ChatBody from './ChatBody';

export default function ChatRoom() {
    return (
        <div className="flex flex-col gap-3 h-full ">
            <ChatHeader />
            <ChatBody />
            <Input />
        </div>
    );
}
