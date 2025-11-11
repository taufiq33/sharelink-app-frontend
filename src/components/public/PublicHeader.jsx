import { Button } from "../ui/button";
import BannerImage from "@/assets/brand.png";
import ToggleThemeButton from "./ToggleThemeButton";
import { Link } from "react-router-dom";

export default function PublicHeader() {
  return (
    <header className="flex items-center border-b h-15 justify-between px-2">
      <Link to="/" className="brand flex justify-center items-center gap-4">
        <img src={BannerImage} className="h-6 w-6" alt="brand" />
        <h1 className="font-bold text-xl sm:text-2xl">ShareLink</h1>
      </Link>
      <ToggleThemeButton />
      <div className="hidden header-action sm:flex gap-2">
        <Link to="/auth/login">
          <Button variant={"outline"}>Login</Button>
        </Link>
        <Link to="/auth/register">
          <Button>Register</Button>
        </Link>
      </div>
    </header>
  );
}
