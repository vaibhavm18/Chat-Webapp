import { useQuery } from "@tanstack/react-query";
import { Suspense, lazy, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { authenticate } from "./api";
import Loader from "./components/Loader";
import { setCredential } from "./features/auth/authSlice";
import { Authenticate } from "./pages/Authenticate";
import Auth from "./pages/auth/Auth";

const Home = lazy(() => import("./pages/Home"));
const Groups = lazy(() => import("./pages/Groups"));
const Personal = lazy(() => import("./pages/Personal"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));

export default function App() {
  const dispatch = useDispatch();
  const [enabled, setEnabled] = useState(true);
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["Auth"],
    staleTime: Infinity,
    queryFn: async () => await authenticate(),
    enabled: enabled,
    retry: 0,
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(setCredential(data.data));
    }
    if (isLoading) {
      setEnabled(false);
    }
  }, [data, isSuccess, isLoading]);

  return (
    <>
      {" "}
      {isLoading ? (
        <div className="h-screen w-screen flex items-center justify-center ">
          <span className="w-16 h-16 border-l-4 border-r-4 border-red-500 animate-spin rounded-full"></span>
        </div>
      ) : (
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route element={<Auth />}>
              <Route path="/login" Component={Login} />
              <Route path="/register" Component={Register} />
            </Route>
            <Route element={<Authenticate />}>
              <Route path="/" Component={Home}>
                <Route path="/groups" Component={Groups} />
                <Route path="/personal" Component={Personal} />
              </Route>
            </Route>
          </Routes>
        </Suspense>
      )}
    </>
  );
}
