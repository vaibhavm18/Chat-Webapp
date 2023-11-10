import Auth from "./pages/auth/Auth";
import Login from "./pages/auth/Login";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/auth/Register";
import { Authenticate } from "./util/Authenticate";
import { Groups } from "./pages/groups/Groups";

export default function App() {
  return (
    <Routes>
      <Route element={<Auth />}>
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
      </Route>
      <Route element={<Authenticate />}>
        <Route path="/" Component={Groups} />
      </Route>
    </Routes>
  );
}
