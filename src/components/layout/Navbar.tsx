// src/components/navbar.tsx  (update)
import React from "react";
import Logo from "@/assets/icons/Logo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link } from "react-router";
import { ModeToggle } from "./mode-toggle";
import {
  authApi,
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";

import { useAppDispatch } from "@/redux/hook";
import { role } from "@/constants/role";
import { startTour } from "@/redux/joyrideSlice";
import { useNavigate } from "react-router";

const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  { href: "/about", label: "About", role: "PUBLIC" },
  { href: "/features", label: "Features", role: "PUBLIC" },
  { href: "/pricing ", label: "Pricing", role: "PUBLIC" },
  { href: "/contact ", label: "Contact", role: "PUBLIC" },
  { href: "/admin", label: "Dashboard", role: role.ADMIN },
  { href: "/agent", label: "Dashboard", role: role.AGENT },
  { href: "/user", label: "Dashboard", role: role.USER },
];

const JOYRIDE_SHOWN_KEY = "joyride_shown_v1";
const shouldShowJoyrideOnce = () => !localStorage.getItem(JOYRIDE_SHOWN_KEY);
const markJoyrideShown = () => localStorage.setItem(JOYRIDE_SHOWN_KEY, "1");

export default function Navbar() {
  const { data } = useUserInfoQuery(undefined);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout(undefined);
    dispatch(authApi.util.resetApiState());
  };

  const handleDashboardClick = (
    e: React.MouseEvent,
    href: string | undefined
  ) => {
    e.preventDefault();

    if (shouldShowJoyrideOnce()) {
      dispatch(startTour("home"));

      markJoyrideShown();
      localStorage.removeItem("joyride_shown_v1");
      return;
    }

    // Otherwise just navigate normally
    if (href) navigate(href);
  };

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link, index) => (
                    <React.Fragment key={index}>
                      {link.role === "PUBLIC" && (
                        <NavigationMenuItem className="w-full">
                          <NavigationMenuLink asChild className="py-1.5">
                            <Link to={link.href}>{link.label} </Link>
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      )}

                      {link.role === data?.data?.role && (
                        // Dashboard link for matched role (mobile)
                        <NavigationMenuItem className="w-full">
                          <NavigationMenuLink asChild className="py-1.5">
                            <Link
                              to={link.href}
                              data-joy="dashboard-start"
                              onClick={(e) =>
                                handleDashboardClick(e, link.href)
                              }
                            >
                              {link.label}
                            </Link>
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      )}
                    </React.Fragment>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>

          {/* Main nav */}
          <div className="flex items-center gap-6">
            <a href="#" className="text-primary hover:text-primary/90">
              <Logo />
            </a>

            {/* Desktop menu */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {navigationLinks.map((link, index) => (
                  <React.Fragment key={index}>
                    {link.role === "PUBLIC" && (
                      <NavigationMenuItem className="w-full">
                        <NavigationMenuLink asChild className="py-1.5">
                          <Link to={link.href}>{link.label} </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    )}

                    {link.role === data?.data?.role && (
                      // Dashboard link for matched role (desktop)
                      <NavigationMenuItem className="w-full">
                        <NavigationMenuLink asChild className="py-1.5">
                          <Link
                            to={link.href}
                            // add joyride attribute to the dashboard button
                            data-joy="dashboard-start"
                            onClick={(e) => handleDashboardClick(e, link.href)}
                          >
                            {link.label}
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    )}
                  </React.Fragment>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <ModeToggle />
          {data?.data?.email ? (
            <Button
              onClick={handleLogout}
              variant={"outline"}
              className="text-sm"
            >
              Logout
            </Button>
          ) : (
            <Button asChild className="text-sm">
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
