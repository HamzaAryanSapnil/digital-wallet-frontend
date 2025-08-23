import { role } from "@/constants/role";
import { adminSidebarItems } from "@/routes/admin.sidebar";
import { agentSidebarItems } from "@/routes/agentSidebarItems";
import { userSidebarItems } from "@/routes/user.sidebar.items";
import type { TRole } from "@/types";

export const getSidebarItems = (userRole: TRole) => {
  switch (userRole) {
    case role.ADMIN:
      return [...adminSidebarItems];

    case role.AGENT:
      return [...agentSidebarItems];

    case role.USER:
      return [...userSidebarItems];

    default:
        return [];
  }
};
