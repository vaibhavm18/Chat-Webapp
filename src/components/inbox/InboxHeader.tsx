import { useLocation, useNavigate } from "react-router-dom";

export default function InboxHeder() {
  const location = useLocation();
  const navigate = useNavigate();

  const onGroups = () => {
    navigate("/groups", { replace: true });
  };
  const onPersonal = () => {
    navigate("/personal", { replace: true });
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="text-center">
        <p className="font-bold text-2xl">Inbox</p>
      </div>
      <ul className="flex justify-around  bg-[#222436] py-2 rounded-2xl">
        <li
          className={`bg-[#1e2030] py-[2px] px-4  rounded-2xl cursor-pointer hover:scale-105 transition-all ${
            location.pathname === "/groups" && "bg-gray-900"
          }`}
          onClick={onGroups}
        >
          Groups
        </li>
        <li
          className={`bg-[#1e2030]  py-[2px] px-4 rounded-2xl cursor-pointer hover:scale-105 transition-all
          ${location.pathname === "/personal" && "bg-gray-900"}
          `}
          onClick={onPersonal}
        >
          Personal
        </li>
      </ul>
    </div>
  );
}
