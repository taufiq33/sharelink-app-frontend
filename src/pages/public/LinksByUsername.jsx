import { Spinner } from "@/components/ui/spinner";
import { getPublicLinksByUsername } from "@/features/links/api";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import PublicSingleLink from "@/components/public/PublicSingleLink";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ToggleThemeButton from "@/components/public/ToggleThemeButton";
import { Megaphone } from "lucide-react";

export default function LinksByUsername() {
  const { username } = useParams();
  const [user, setUsers] = useState({
    username: null,
    shortBio: null,
    links: [],
  });

  useEffect(() => {
    async function getLinks(username) {
      try {
        const { data } = await getPublicLinksByUsername(username);
        setUsers(() => ({
          username: data.username,
          shortBio: data.shortBio,
          links: data.links,
        }));
      } catch (error) {
        console.error(error);
        setUsers((prevState) => ({ ...prevState, username: "notfound" }));
      }
    }

    getLinks(username);
  }, [username]);

  if (!user.username) {
    return (
      <div className="flex justify-center items-center w-full flex-col h-screen">
        {" "}
        <Spinner className="size-24 text-accent " />
      </div>
    );
  }

  return (
    <main className="w-full max-w-[600px] mx-auto p-4 sm:p-2 my-10">
      <ToggleThemeButton />
      {user.username === "notfound" && (
        <h1 className="text-center text-lg font-black">User not found.</h1>
      )}

      {user.username !== "notfound" && (
        <>
          <div className="profile-name flex flex-col gap-3 justify-center items-center mb-10">
            <img
              src={`http://localhost:3300/public/photoProfile/${username}`}
              alt=""
              className="rounded-full w-20 h-20 shadow"
            />
            <h1 className="text-2xl font-black">{username}'s Links</h1>
            <p className="text-sm text-foreground/80">
              {user.shortBio
                ? user.shortBio
                : "Check out my curated collection of links!"}
            </p>
          </div>
          <div className="links flex flex-col gap-4 justify-center items-center">
            {user.links.length === 0 && (
              <p className="text-center font-bold">
                {username} does not have any link to share.
              </p>
            )}
            {user.links.length !== 0 &&
              user.links.map((link) => (
                <PublicSingleLink linkData={link} key={link.id} />
              ))}
          </div>
          <div className="promotional my-15  bg-white dark:bg-secondary/50 rounded-lg shadow-lg">
            <div className="flex flex-col gap-4 px-4 py-10 sm:p-20 items-center">
              <Megaphone className="w-15 rounded-full h-15 text-primary bg-accent/10 p-4 shadow" />
              <h2 className=" font-bold text-center">
                Create your own Links Profile Page
              </h2>
              <p className="text-sm text-foreground/70 text-center leading-6 tracking-wide">
                Share your links, portofolio, and social profiles in one
                beautiful place. Join now and start building your personal
                landing page in minutes.
              </p>
              <Link to="/auth/register">
                <Button className="w-fit">
                  Get Started for Free <ArrowRight />
                </Button>
              </Link>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
