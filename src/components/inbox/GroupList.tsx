import { joinGroup } from "@/api";
import { RootState } from "@/app/store";
import { removeGroupList } from "@/features/group/groupListSlice";
import { singleGroup } from "@/features/group/groupSlice";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { Button } from "../ui/button";
import Preview from "./Preview";

type Props = {
  hideGroupList: () => void;
};

export default function GroupList({ hideGroupList }: Props) {
  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationKey: ["AddGroup"],
    mutationFn: async (id: string) => await joinGroup(id),
    onSuccess(data) {
      dispatch(
        singleGroup({ _id: data.data.data._id, name: data.data.data.name })
      );
      dispatch(removeGroupList({ _id: data.data.data._id }));
    },
  });

  const addToGroup = (id: string) => {
    mutation.mutateAsync(id);
  };

  const groups = useSelector((state: RootState) => state.groupList.groups);
  return (
    <>
      <ToastContainer />
      <div className=" flex-grow bg-[#222436] rounded-lg relative overflow-auto py-4">
        <div className="absolute  m-2 left-0 right-0 top-0 grid grid-cols-1 gap-2 ">
          {!groups ||
            (groups.length === 0 && (
              <p className="text-center text-xl">No Groups.</p>
            ))}
          {groups.map((val) => (
            <Preview
              _id={val._id}
              username={val.name}
              key={val._id}
              add={addToGroup}
            />
          ))}

          <div className="h-6"></div>
          <div className="flex gap-2 lg:gap-4">
            <Button
              className="w-full rounded-xl text-lg  bg-gray-400 hover:bg-gray-300 text-black"
              onClick={hideGroupList}
            >
              Back
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
