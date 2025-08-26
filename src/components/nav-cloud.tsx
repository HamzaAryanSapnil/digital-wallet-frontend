import type {} from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router";
import type { ISidebarItem } from "@/types";

export function NavClouds({ items }: { items: ISidebarItem[] }) {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>

              {item.items && (
                <SidebarMenu className="pl-6">
                  {item.items.map((subItem) => (
                    <Link key={subItem.title} to={subItem.url}>
                      <SidebarMenuItem >
                        <SidebarMenuButton tooltip={subItem.title}>
                          <span>{subItem.title}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </Link>
                  ))}
                </SidebarMenu>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
