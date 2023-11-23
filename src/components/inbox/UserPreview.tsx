import Profile from "../ProfilePhoto";

export default function UserPreview() {
  return (
    <div className="p-2 rounded-2xl cursor-pointer flex items-center  gap-3 bg-[#1e2030]">
      <Profile />
      <span>username</span>
    </div>
  );
}
