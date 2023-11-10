import { useState } from 'react';
import { BsSend } from 'react-icons/bs';

export default function Input() {
    const [value, setValue] = useState('');
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            <button className="">
                <BsSend className="text-lg" />
            </button>
        </div>
    );
}
