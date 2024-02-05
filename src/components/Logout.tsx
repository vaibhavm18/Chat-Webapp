import { logout } from "@/api";
import { removeCredential } from "@/features/auth/authSlice";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

export default function Logout() {
  const dispatch = useDispatch();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => await logout(),
    onSuccess(_data, _variables, _context) {
      dispatch(removeCredential());
    },
  });
  return (
    <button
      className="bg-gray-700 px-4 py-1"
      disabled={isPending ? true : false}
      onClick={async () => {
        await mutateAsync();
        window.location.reload();
      }}
    >
      Logout
    </button>
  );
}
