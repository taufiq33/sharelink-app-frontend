import { Link } from "lucide-react";
import { Button } from "../ui/button";
import { trackLink } from "@/features/links/api";

export default function PublicSingleLink({ linkData }) {
  async function handleClick() {
    try {
      await trackLink(linkData.id);
    } catch (error) {
      console.error(error);
    }
    return window.open(linkData.link, "_blank");
  }
  return (
    <div
      key={linkData.id}
      className="bg-white dark:bg-secondary/50 w-full rounded-lg shadow-md flex items-center px-2 py-3 justify-between hover:scale-99 transition-all hover:cursor-pointer hover:grayscale-20"
      onClick={handleClick}
    >
      <div className="flex gap-2 justify-center items-center">
        <div className="p-3 bg-primary/20 rounded-lg ">
          <Link className="size-3 text-primary" />
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="font-bold text-sm"> {linkData.label}</h2>
          <span className="text-xs text-foreground/60">{linkData.link}</span>
        </div>
      </div>
      <Button onClick={handleClick} size={"sm"}>
        Visit
      </Button>
    </div>
  );
}
