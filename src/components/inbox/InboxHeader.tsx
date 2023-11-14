export default function InboxHeder() {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-center">
        <p className="font-bold text-2xl">Inbox</p>
      </div>
      <ul className="flex justify-around  bg-[#222436] py-2 rounded-2xl">
        <li className="bg-[#1e2030] py-[2px] px-4 rounded-lg cursor-pointer hover:scale-105 transition-all">
          Groups
        </li>
        <li className="bg-[#1e2030] py-[2px] px-4 rounded-lg cursor-pointer hover:scale-105 transition-all">
          Personal
        </li>
      </ul>
    </div>
  );
}
