import { Outlet } from 'react-router-dom';
export default function Auth() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Outlet />
    </div>
  );
}
