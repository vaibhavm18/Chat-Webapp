import { RootState } from "@/app/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
export default function Auth() {
  const { isLogin } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      return navigate("groups");
    }
  }, [isLogin]);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Outlet />
    </div>
  );
}
