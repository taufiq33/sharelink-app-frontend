import { ArrowRight } from "lucide-react";
import { Megaphone } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export default function Promotional() {
  return (
    <div className="promotional my-5  bg-white dark:bg-secondary/50 rounded-lg shadow-lg">
      <div className="flex flex-col gap-4 px-4 py-10 sm:p-20 items-center">
        <Megaphone className="w-15 rounded-full h-15 text-primary bg-accent/10 p-4 shadow" />
        <h2 className=" font-bold text-center">
          Create your own Links Profile Page
        </h2>
        <p className="text-sm text-foreground/70 text-center leading-6 tracking-wide">
          Share your links, portofolio, and social profiles in one beautiful
          place. Join now and start building your personal landing page in
          minutes.
        </p>
        <Link to="/auth/register">
          <Button className="w-fit">
            Get Started for Free <ArrowRight />
          </Button>
        </Link>
      </div>
    </div>
  );
}
