import { Bell } from "lucide-react";
import { Button } from "../ui/button";

import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

import { Menu } from "lucide-react";
import { PanelLeft } from "lucide-react";
import { useSidebar } from "../ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { BookmarkIcon } from "lucide-react";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import ToggleThemeButton from "../public/ToggleThemeButton";

export default function DashboardHeader() {
  const { toggleSidebar } = useSidebar();
  return (
    <header className="w-full bg-white dark:bg-background flex justify-between items-center p-3 shadow">
      <div className="flex gap-3 items-center">
        <Button
          onClick={toggleSidebar}
          className={"border"}
          variant="secondary"
          size={"sm"}
        >
          {" "}
          <Menu className="sm:hidden" />{" "}
          <PanelLeft className="hidden sm:block" />
        </Button>
        <h2 className="font-bold sm:text-xl">Dashboard</h2>
      </div>
      <div className="push-right flex gap-2 items-center justify-center md:gap-4">
        <div className="flex justify-center items-center">
          <ToggleThemeButton />
        </div>

        <Button variant={"icon"} className="relative md:scale-120">
          <Bell />

          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 ring-2 ring-background" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger className="avatar lg:flex gap-3 justify-center items-center bg-background p-1 rounded">
            <Avatar className={"scale-90 lg:scale-100"}>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="user-detail hidden lg:flex flex-col">
              <h3 className="font-bold">John Doe</h3>
              <span className="text-muted-foreground text-sm">
                john.doe@example.com
              </span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="w-[var(--radix-dropdown-menu-trigger-width)]"
          >
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>

            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
