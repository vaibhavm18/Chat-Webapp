import { RootState } from "@/app/store";
import { removeListUser } from "@/features/user/userListSlice";
import { addUsers } from "@/features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Preview from "./Preview";

type Props = {
  hidePersonalList: () => void;
};
export default function UserList({ hidePersonalList }: Props) {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.userList.users);

  const addToPersonal = (id: string, username: string) => {
    dispatch(addUsers([{ _id: id, username }]));
    dispatch(removeListUser({ _id: id }));
  };

  return (
    <div className=" flex-grow bg-[#222436] rounded-lg relative overflow-auto py-4">
      <div className="absolute  m-2 left-0 right-0 top-0 grid grid-cols-1 gap-2">
        {users.map((val) => (
          <Preview
            _id={val._id}
            username={val.username}
            key={val._id}
            add={addToPersonal}
          />
        ))}
        <div className="h-6"></div>
        <button
          className="py-[5px] rounded-xl bg-gray-400 w-full
          text-black text-lg font-medium"
          onClick={hidePersonalList}
        >
          Back
        </button>
      </div>
    </div>
  );
}
