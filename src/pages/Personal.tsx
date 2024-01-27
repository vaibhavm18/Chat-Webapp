export default function Personal() {
  return (
    <div className=" flex-grow bg-[#222436] rounded-lg relative overflow-auto py-4">
      <div className="absolute  m-2 left-0 right-0 top-0 grid grid-cols-1 gap-2">
        {/* {groups.map((val) => (
          <Preview _id={val._id} username={val.groupname} key={val._id} />
        ))} */}
        <div className="h-6"></div>
        <div className="flex items-center justify-center gap-4">
          <button
            className="py-[5px] rounded-xl bg-gray-400 w-full
             text-black text-lg font-medium"
          >
            Add Friend
          </button>
        </div>
        <div className="h-32"></div>
      </div>
    </div>
  );
}
