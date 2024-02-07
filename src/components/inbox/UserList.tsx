import { friendRequest, getAllUsers } from "@/api";
import { RootState } from "@/app/store";
import { addListUsers, removeListUser } from "@/features/user/userListSlice";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import Preview from "./Preview";

type Props = {
  hidePersonalList: () => void;
};
export default function UserList({ hidePersonalList }: Props) {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.userList.users);

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["userList"],
    queryFn: async () => await getAllUsers(),
    staleTime: Infinity,
    retry: 0,
  });

  const mutation = useMutation({
    mutationKey: ["SendRequest"],
    mutationFn: async (id: string) => await friendRequest(id),
    onSuccess(data, variables, context) {
      dispatch(removeListUser({ _id: data.data?.data.request.to }));
    },
  });

  useEffect(() => {
    if (data) {
      dispatch(addListUsers(data.data.data));
    }
  }, [data, isLoading]);

  const addToPersonal = (id: string) => {
    mutation.mutateAsync(id);
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
        <div className="flex gap-2 lg:gap-4">
          <Button
            className="w-full rounded-xl text-lg  bg-gray-400 hover:bg-gray-300 text-black"
            onClick={hidePersonalList}
          >
            Back
          </Button>
          <Button
            className="w-full rounded-xl text-lg  bg-gray-400 hover:bg-gray-300 text-black"
            onClick={() => {
              refetch();
            }}
          >
            Refresh
          </Button>
        </div>
      </div>
    </div>
  );
}
