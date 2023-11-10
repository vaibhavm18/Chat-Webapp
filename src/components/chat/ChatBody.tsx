import Bubble from './Bubble';

export default function ChatBody() {
    return (
        <div className="flex-grow bg-[#222436] rounded-2xl relative py-3 px-2 overflow-auto">
            <div className="absolute left-0 top-0 bottom-0 right-0 px-4 py-2 ">
                <div className="flex flex-col-reverse gap-4">
                    <div className="h-10"></div>
                    <Bubble
                        chatSide="chat-end"
                        chat="hello"
                    />
                    <Bubble chatSide="chat-start" />
                    <Bubble chatSide="chat-end" />
                    <Bubble chatSide="chat-end" />
                    <Bubble chatSide="chat-start" />
                    <Bubble chatSide="chat-end" />
                    <Bubble chatSide="chat-end" />
                    <Bubble chatSide="chat-start" />
                    <Bubble chatSide="chat-end" />
                    <Bubble chatSide="chat-start" />
                    <Bubble chatSide="chat-end" />
                    <div className="h-10"></div>
                </div>
            </div>
        </div>
    );
}
