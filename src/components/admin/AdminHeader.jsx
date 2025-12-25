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

import { Link } from "react-router-dom";
import ToggleThemeButton from "../public/ToggleThemeButton";
import { useSelector } from "react-redux";
import useLogout from "@/features/auth/hooks/useLogout";

export default function AdminHeader() {
  const { toggleSidebar } = useSidebar();
  const user = useSelector((state) => state.auth);
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
        <h2 className="font-bold sm:text-xl">Admin Dashboard</h2>
      </div>
      <div className="push-right flex gap-2 items-center justify-center md:gap-4">
        <div className="flex justify-center items-center">
          <ToggleThemeButton />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className="avatar lg:flex gap-3 justify-center items-center bg-background p-1 rounded">
            <Avatar className={"scale-90 lg:scale-100"}>
              <AvatarImage
                src={`http://localhost:3300/public/photoProfile/${user.username}`}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="user-detail hidden lg:flex flex-col">
              <h3 className="font-bold">{user.username}</h3>
              <span className="text-muted-foreground text-sm">
                {user.email}
              </span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="w-[var(--radix-dropdown-menu-trigger-width)]"
          >
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={useLogout().handleLogout}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
