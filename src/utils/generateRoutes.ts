import type { ISidebarItem } from "@/types";
import type { ComponentType } from "react";

// export const generateRoutes = (sidebarItems: ISidebarItem[]) => {
//     return sidebarItems.flatMap(section => section.items?.map((route) => ({
//         path: route.url!,
//         Component: route.component!
//     })))
// }

export const generateRoutes = (sidebarItems: ISidebarItem[]) => {
  const routes: { path: string; Component: ComponentType }[] = [];

  sidebarItems.forEach((section) => {
    section.items?.forEach((route) => {
      const original = route.url ?? "";
      // do NOT mutate original; compute routerPath for nested children:
      let routerPath = original;
      if (routerPath.startsWith("/admin/"))
        routerPath = routerPath.replace("/admin/", "");
      else if (routerPath.startsWith("/agent/"))
        routerPath = routerPath.replace("/agent/", "");
      else if (routerPath.startsWith("/user/"))
        routerPath = routerPath.replace("/user/", "");
      else if (routerPath.startsWith("/")) routerPath = routerPath.slice(1);

      routes.push({
        path: routerPath, // relative path to use as child under /admin or /agent
        Component: route.component!,
      });
    });
  });

  return routes;
};
