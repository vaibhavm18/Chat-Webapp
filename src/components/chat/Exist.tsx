import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
} from "@radix-ui/react-alert-dialog";

type Props = {
  onPress: () => void;
};
export default function Exist({ onPress }: Props) {
  return (
    <AlertDialogContent
      className="bg-[#1e2030] w-56 py-2 px-2 flex flex-col items-center gap-4
     border border-white rounded-2xl absolute -top-12 "
    >
      <p>Are You sure?</p>
      <div className="flex gap-2">
        <AlertDialogAction
          onClick={onPress}
          className="bg-green-500 py-[2px] px-4 rounded-2xl"
        >
          Yes
        </AlertDialogAction>
        <AlertDialogCancel className="bg-red-600 py-[2px] px-4 rounded-2xl">
          Cancel
        </AlertDialogCancel>
      </div>
    </AlertDialogContent>
  );
}
