"use client";

import { useEffect, useState } from "react";
import { Nav } from "./ui/nav";
import {
  LayoutDashboard,
  ChevronRight,
  Star,
  Plane,
  Map,
  GalleryThumbnails,
  MessageSquareDot,
  Book,
  Bike,
  Ship,
} from "lucide-react";
import { Button } from "./ui/button";
import { useWindowWidth } from "@react-hook/window-size";

const SideNavbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const onlyWidth = useWindowWidth();

  useEffect(() => {
    // Mark the component as mounted when it mounts on the client
    setIsMounted(true);
    // Use useEffect to run client-side code after component mounts
    // Check if window is defined to avoid SSR errors
    if (typeof window !== "undefined") {
      // Client-side code accessing window can go here
      // Example: Add event listeners or manipulate DOM elements
    }
  }, []);

  const mobileWidth = onlyWidth < 768;

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  // Render nothing on the server-side render
  if (!isMounted) {
    return null;
  }

  return (
    <div className="relative min-w-[80px] border-r px-3 pb-10 pt-24 ">
      {!mobileWidth && (
        <div className="absolute right-[-20px] top-7">
          <Button
            onClick={toggleSidebar}
            variant="secondary"
            className="rounded-full p-2"
          >
            <ChevronRight />
          </Button>
        </div>
      )}
      <Nav
        isCollapsed={mobileWidth ? true : isCollapsed}
        links={[
          {
            title: "Dashboard",
            href: "/admin",
            icon: LayoutDashboard,
            variant: "default",
          },
          {
            title: "Hero",
            href: "/admin/hero",
            icon: GalleryThumbnails,
            variant: "ghost",
          },
          {
            title: "Destinations",
            href: "/admin/destinations",
            icon: Map,
            variant: "ghost",
          },
          {
            title: "Trips - Main",
            href: "/admin/trips",
            icon: Plane,
            variant: "ghost",
          },
          {
            title: "Trips - Sub 1",
            href: "/admin/trekkingtrips",
            icon: Bike,
            variant: "ghost",
          },
          {
            title: "Trips - Sub 2",
            href: "/admin/summertrips",
            icon: Ship,
            variant: "ghost",
          },
          {
            title: "Reviews",
            href: "/admin/reviews",
            icon: Star,
            variant: "ghost",
          },
          {
            title: "Queries",
            href: "/admin/queries",
            icon: MessageSquareDot,
            variant: "ghost",
          },
          {
            title: "Contact Form",
            href: "/admin/contact",
            icon: Book,
            variant: "ghost",
          },
        ]}
      />
    </div>
  );
};

export default SideNavbar;
