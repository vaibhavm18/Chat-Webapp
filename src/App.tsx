import Auth from "./pages/auth/Auth";
import Login from "./pages/auth/Login";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/auth/Register";
import { Home } from "./pages/Home";
import { Authenticate } from "./pages/Authenticate";

export default function App() {
  return (
    <Routes>
      <Route element={<Auth />}>
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
      </Route>
      <Route element={<Authenticate />}>
        <Route path="/" Component={Home} />
      </Route>
    </Routes>
  );
}
