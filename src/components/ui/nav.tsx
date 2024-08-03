"use client";

import Link from "next/link";
import { LucideIcon, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "@/context/AdminContext";

interface NavProps {
  isCollapsed: boolean;
  links: {
    title: string;
    label?: string;
    icon: LucideIcon;
    variant: "default" | "ghost";
    href: string;
  }[];
}

export function Nav({ links, isCollapsed }: NavProps) {
  const pathName = usePathname();
  const { setIsAdminLoggedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    // Use useEffect to run client-side code after component mounts
    // Check if window is defined to avoid SSR errors
    if (typeof window !== "undefined") {
      // Client-side code accessing window can go here
      // Example: Add event listeners or manipulate DOM elements
    }
  }, []); // Empty dependency array ensures this runs once after mount

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    router.replace("/admin");
    localStorage.removeItem("isLogin");
  };

  return (
    <TooltipProvider>
      <div
        data-collapsed={isCollapsed}
        className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
      >
        <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          {links.map((link, index) =>
            isCollapsed ? (
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.href}
                    className={cn(
                      buttonVariants({
                        variant: link.href === pathName ? "default" : "ghost",
                        size: "icon",
                      }),
                      "h-9 w-9",
                      link.variant === "default" &&
                        "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                    )}
                  >
                    <link.icon className="h-4 w-4" />
                    <span className="sr-only">{link.title}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  {link.title}
                  {link.label && (
                    <span className="ml-auto text-muted-foreground">
                      {link.label}
                    </span>
                  )}
                </TooltipContent>
              </Tooltip>
            ) : (
              <Link
                key={index}
                href={link.href}
                className={cn(
                  buttonVariants({
                    variant: link.href === pathName ? "default" : "ghost",
                    size: "sm",
                  }),
                  link.variant === "default" &&
                    "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                  "justify-start"
                )}
              >
                <link.icon className="mr-2 h-4 w-4" />
                <div className="font-extrabold">{link.title}</div>
                {link.label && (
                  <span
                    className={cn(
                      "ml-auto",
                      link.variant === "default" &&
                        "text-background dark:text-white"
                    )}
                  >
                    {link.label}
                  </span>
                )}
              </Link>
            )
          )}
          {isCollapsed ? (
            <div className="p-2 cursor-pointer" onClick={handleLogout}>
              <LogOut size={20} />
            </div>
          ) : (
            <div
              className="flex items-center m-1 p-2 gap-2 cursor-pointer rounded-lg"
              onClick={handleLogout}
            >
              <LogOut size={20} />
              <h1 className="text-black font-bold text-sm">Log out</h1>
            </div>
          )}
        </nav>
      </div>
    </TooltipProvider>
  );
}
