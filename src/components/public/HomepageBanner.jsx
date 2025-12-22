import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export default function HomepageBanner() {
  return (
    <div className="flex flex-col gap-8 justify-center items-center max-w-[700px] mx-auto my-20">
      <h2 className="text-center tracking-tighter font-black text-5xl ">
        Share links easily, beautifully
      </h2>
      <p className="max-w-8/10 text-foreground text-center text-lg">
        Create your personalized page to share all your important links with
        your audience.
      </p>
      <Button size="lg">
        <Link to="/auth/register">Get Started</Link>
      </Button>
    </div>
  );
}
