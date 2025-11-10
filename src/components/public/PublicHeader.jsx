import { Button } from "../ui/button";
import BannerImage from "@/assets/brand.png";
import ToggleThemeButton from "./ToggleThemeButton";

export default function PublicHeader() {
  return (
    <header className="flex items-center border-b h-15 justify-between px-2">
      <div className="brand flex justify-center items-center gap-4">
        <img src={BannerImage} className="h-6 w-6" alt="brand" />
        <h1 className="font-bold text-xl sm:text-2xl">ShareLink</h1>
      </div>
      <ToggleThemeButton />
      <div className="hidden header-action sm:flex gap-2">
        <Button variant={"outline"}>Login</Button>
        <Button>Register</Button>
      </div>
    </header>
  );
}
