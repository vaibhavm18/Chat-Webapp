import { RootState } from "@/app/store";
import GroupList from "@/components/inbox/GroupList";
import NewGroup from "@/components/inbox/NewGroup";
import Preview from "@/components/inbox/Preview";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Groups() {
  const groups = useSelector((state: RootState) => state.group.groups);
  const [openList, setOpenList] = useState(false);
  const hideGroupList = () => {
    setOpenList(false);
  };
  return (
    <>
      {!openList ? (
        <div className=" flex-grow bg-[#222436] rounded-lg relative overflow-auto py-4">
          <div className="absolute  m-2 left-0 right-0 top-0 grid grid-cols-1 gap-2">
            {groups.map((val) => (
              <Preview _id={val._id} username={val.groupname} key={val._id} />
            ))}
            <div className="h-6"></div>
            <div className="flex items-center justify-center gap-4">
              <NewGroup />
              <button
                className="py-[5px] rounded-xl bg-gray-400 w-full
          text-black text-lg font-medium"
                onClick={() => {
                  setOpenList(true);
                }}
              >
                Join
              </button>
            </div>
            <div className="h-32"></div>
          </div>
        </div>
      ) : (
        <GroupList hideGroupList={hideGroupList} />
      )}
    </>
  );
}
