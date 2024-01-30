import { RootState } from "@/app/store";
import { removeGroupList } from "@/features/group/groupListSlice";
import { addGroup } from "@/features/group/groupSlice";
import { useDispatch, useSelector } from "react-redux";
import Preview from "./Preview";

type Props = {
  hideGroupList: () => void;
};

export default function GroupList({ hideGroupList }: Props) {
  const dispatch = useDispatch();

  const addToGroup = (id: string, groupname: string) => {
    dispatch(addGroup([{ _id: id, groupname }]));
    dispatch(removeGroupList({ _id: id }));
  };

  const groups = useSelector((state: RootState) => state.groupList.groups);
  return (
    <div className=" flex-grow bg-[#222436] rounded-lg relative overflow-auto py-4">
      <div className="absolute  m-2 left-0 right-0 top-0 grid grid-cols-1 gap-2">
        {groups.map((val) => (
          <Preview
            _id={val._id}
            username={val.groupname}
            key={val._id}
            add={addToGroup}
          />
        ))}

        <div className="h-6"></div>
        <button
          className="py-[5px] rounded-xl bg-gray-400 w-full
          text-black text-lg font-medium"
          onClick={hideGroupList}
        >
          Back
        </button>
      </div>
    </div>
  );
}
