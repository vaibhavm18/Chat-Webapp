import { useState } from "react";
import { BsSend } from "react-icons/bs";

type Props = {
  chatId: string;
  sendMessage: (chatId: string, message: string) => void;
};

export default function Input({ chatId, sendMessage }: Props) {
  const [value, setValue] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length >= 80) {
      setValue(e.target.value.slice(0, 80));
      return;
    }
    setValue(e.target.value);
  };
  return (
    <div className="w-full  flex gap-3 py-2 px-4 bg-[#222436] rounded-xl items-center">
      <input
        type="text"
        value={value}
        className="w-full px-4 py-2 rounded-xl bg-[#1e2030]"
        contentEditable
        onChange={onChange}
      />
      <button
        className=""
        onClick={() => {
          sendMessage(chatId, value);
          setValue("");
        }}
      >
        <BsSend className="text-lg" />
      </button>
    </div>
  );
}
