import HomepageBanner from "@/components/public/HomepageBanner";
import HomepageCard from "@/components/public/HomepageCard";
import { GridIcon } from "lucide-react";
import { Palette } from "lucide-react";
import { Link2 } from "lucide-react";

export default function Homepage() {
  return (
    <main>
      <HomepageBanner />
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full sm:max-w-11/12 md:max-w-9/10 mx-auto gap-4 justify-evenly items-center">
        <HomepageCard
          description={
            "Create and share links in seconds with our intuitive interface."
          }
          title={"Simple Link Creation"}
          icon={<Link2 />}
        />
        <HomepageCard
          description={
            "Customize your page to match your brand and impress your audience"
          }
          title={"Beautifully Designed Pages"}
          icon={<Palette />}
        />
        <HomepageCard
          description={
            "Track your link performance and manage your content with ease."
          }
          title={"Powerful Admin Dashboard"}
          icon={<GridIcon />}
          className={"sm:col-span-2 sm:justify-self-center"}
        />
      </div>
    </main>
  );
}
