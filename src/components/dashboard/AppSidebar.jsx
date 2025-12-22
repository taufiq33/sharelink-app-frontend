import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Settings } from "lucide-react";
import { Bell } from "lucide-react";
import { Link2 } from "lucide-react";
import { Grid } from "lucide-react";
import { NavLink } from "react-router-dom";
import BannerImage from "@/assets/brand.png";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { PanelRightOpen } from "lucide-react";
import useLogout from "@/features/auth/hooks/useLogout";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { User2Icon } from "lucide-react";

import { useLocation } from "react-router-dom";

import { ChevronDown } from "lucide-react";
import { KeyRound } from "lucide-react";
import { UsersRound } from "lucide-react";
import { useEffect } from "react";

const menus = [
  {
    label: "Dashboard",
    to: "/dashboard",
    icon: <Grid />,
  },
  {
    label: "My Links",
    to: "/dashboard/links",
    icon: <Link2 />,
  },
  {
    label: "Notifications",
    to: "/dashboard/notifications",
    icon: <Bell />,
  },
];

const settingsSubMenu = [
  {
    label: "Profile",
    to: "/dashboard/settings/profile",
    icon: <User2Icon />,
  },
  {
    label: "Password",
    to: "/dashboard/settings/password",
    icon: <KeyRound />,
  },
  {
    label: "Session",
    to: "/dashboard/settings/session",
    icon: <UsersRound />,
  },
];

function SidebarMenuItemSettings() {
  return (
    <>
      <Collapsible defaultOpen className="group/collapsible">
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton size="lg">
              <Settings />
              <span className={"ml-1"}>Settings</span>
              <ChevronDown className="" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {settingsSubMenu.map((item) => (
                <SidebarMenuSubItem key={item.label}>
                  <SidebarMenuButton
                    isActive={item.to === location.pathname}
                    asChild
                    size="lg"
                  >
                    <NavLink to={item.to}>
                      {item.icon}
                      <span className={"ml-1"}>{item.label}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    </>
  );
}

export function AppSidebar() {
  const { toggleSidebar, setOpenMobile, isMobile } = useSidebar();
  const location = useLocation();
  useEffect(() => {
    if (isMobile) {
      setOpenMobile(false);
    }
  }, [location.pathname, isMobile, setOpenMobile]);

  return (
    <Sidebar>
      <SidebarHeader
        className={"p-5 flex flex-row gap-2 items-center justify-center"}
      >
        <img className="w-5 h-5" src={BannerImage} alt="Banner" />
        <h2 className="text-xl font-bold">ShareLink</h2>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className={"p-2"}>
            <SidebarMenu>
              {menus.map((menu) => (
                <SidebarMenuItem key={menu.label}>
                  <SidebarMenuButton
                    asChild
                    isActive={menu.to === location.pathname}
                    size="lg"
                  >
                    <NavLink to={menu.to}>
                      {menu.icon}
                      <span className={"ml-1"}>{menu.label}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItemSettings />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className={"mb-5 px-6"}>
        <Button onClick={() => toggleSidebar()} size="lg" variant={"secondary"}>
          {" "}
          <PanelRightOpen />
          Close Sidebar
        </Button>
        <Button
          onClick={useLogout().handleLogout}
          size="lg"
          variant={"destructive"}
        >
          {" "}
          <LogOut />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
