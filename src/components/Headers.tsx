import ProfilePhoto from "./ProfilePhoto";
import { Notification } from "./Notification";
import { Profile } from "./Profile";

export default function Headers() {
  return (
    <header
      className="
      bg-[#222436] mx-auto w-full py-2 px-4
      flex items-center justify-between rounded-2xl shadow-sm transition-all "
    >
      <p className="cursor-pointer">Socials</p>
      <nav className="flex gap-20 items-center">
        <div className="flex gap-6 items-center relative ">
          <Notification />
          <Profile>
            <ProfilePhoto />
          </Profile>
        </div>
      </nav>
    </header>
  );
}
