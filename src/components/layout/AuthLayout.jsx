import { Outlet, Link } from "react-router-dom";
import ToggleThemeButton from "../public/ToggleThemeButton";

export default function AuthLayout() {
  return (
    <div className="bg-background/4 flex flex-col h-screen items-center justify-center gap-4 p-2 my-10">
      <ToggleThemeButton />
      <Link to="/">
        <h1 className="text-center text-2xl font-bold text-shadow">
          Sharelink App
        </h1>
      </Link>
      <Outlet />
    </div>
  );
}
