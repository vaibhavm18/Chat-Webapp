import Auth from './pages/auth/Auth';
import Login from './pages/auth/Login';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/auth/Register';

export default function App() {
  return (
    <Routes>
      <Route element={<Auth />}>
        <Route
          path="/login"
          Component={Login}
        />
        <Route
          path="/register"
          Component={Register}
        />
      </Route>
    </Routes>
  );
}
