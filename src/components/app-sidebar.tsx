import * as React from "react";
import { IconHelp } from "@tabler/icons-react";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router";
import Logo from "@/assets/icons/Logo";
import { NavClouds } from "./nav-cloud";
import { getSidebarItems } from "@/utils/getSidebarItems";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userData } = useUserInfoQuery(undefined);

  console.log("from app sidebar", userData?.data?.role);

  const data = {
    user: {
      name: userData ? userData?.data?.name : "User",
      email: userData ? userData?.data?.email : "email@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: [],
    navClouds: getSidebarItems(userData?.data?.role),
    navSecondary: [
      {
        title: "Get Help",
        url: "https://github.com/HamzaAryanSapnil/Digital-Wallet-Frontend",
        icon: IconHelp,
      },
    ],
  };
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="mx-auto">
            <Link to="/">
              <Logo />
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavClouds items={data.navClouds} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
