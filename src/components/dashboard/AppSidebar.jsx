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
  useSidebar,
} from "@/components/ui/sidebar";
import { Settings } from "lucide-react";
import { Bell } from "lucide-react";
import { Link2 } from "lucide-react";
import { Grid } from "lucide-react";
import { Link } from "react-router-dom";
import BannerImage from "@/assets/brand.png";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { PanelRightOpen } from "lucide-react";

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
  {
    label: "Settings",
    to: "/dashboard/settings",
    icon: <Settings />,
  },
];

export function AppSidebar() {
  const { toggleSidebar } = useSidebar();
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
                    isActive={menu.label === "Dashboard"}
                    size="lg"
                  >
                    <Link href={menu.to}>
                      {menu.icon}
                      <span className={"ml-1"}>{menu.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
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
        <Button size="lg" variant={"destructive"}>
          {" "}
          <LogOut />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
