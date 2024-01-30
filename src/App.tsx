import { Route, Routes } from "react-router-dom";
import { Authenticate } from "./pages/Authenticate";
import Groups from "./pages/Groups";
import { Home } from "./pages/Home";
import Personal from "./pages/Personal";
import Auth from "./pages/auth/Auth";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

export default function App() {
  return (
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
  );
}
