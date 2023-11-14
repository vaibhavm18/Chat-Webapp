import ProfilePhoto from "./Profile";
import { Notification } from "./Notification";

export default function Headers() {
  return (
    <header className=" bg-[#222436] mx-auto w-full py-2 px-4 flex items-center justify-between rounded-2xl shadow-sm hover:scale-[1.002] transition-all ">
      <p className="cursor-pointer">Socials</p>
      <nav className="flex gap-20 items-center">
        <div className="flex gap-6 items-center relative ">
          <Notification />
          <ProfilePhoto />
        </div>
      </nav>
    </header>
  );
}
