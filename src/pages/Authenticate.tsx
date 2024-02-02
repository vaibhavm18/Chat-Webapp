import { RootState } from "@/app/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export const Authenticate = () => {
  const { isLogin } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      return navigate("login");
    }
  }, [isLogin]);

  return <Outlet />;
};
