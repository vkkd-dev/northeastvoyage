"use client";

import { useEffect, useState } from "react";
import { Nav } from "./ui/nav";
import {
  LayoutDashboard,
  CircleUserRound,
  Settings,
  ChevronRight,
  Star,
  Plane,
  Map,
  GalleryThumbnails,
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
            href: "/hero",
            icon: GalleryThumbnails,
            variant: "ghost",
          },
          {
            title: "Destinations",
            href: "/destinations",
            icon: Map,
            variant: "ghost",
          },
          {
            title: "Trips",
            href: "/trips",
            icon: Plane,
            variant: "ghost",
          },
          {
            title: "Reviews",
            href: "/reviews",
            icon: Star,
            variant: "ghost",
          },
          {
            title: "Profile",
            href: "/profile",
            icon: CircleUserRound,
            variant: "ghost",
          },
        ]}
      />
    </div>
  );
};

export default SideNavbar;
