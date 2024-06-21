"use client";
import Destinations from "@/components/Destinations";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import MobileNavbar from "@/components/MobileNavbar";
import Navbar from "@/components/Navbar";
import Reviews from "@/components/Reviews";
import UpcomingTrip from "@/components/UpcomingTrip";
import { getAnalytics } from "firebase/analytics";
import { useEffect, useState } from "react";

function HomePage() {
  const [nav, setNav] = useState(false);
  const openNavbar = () => setNav(true);
  const closeNavbar = () => setNav(false);

  useEffect(() => {
    const initializeFirebaseAnalytics = async () => {
      if (typeof window !== "undefined") {
        const analytics = getAnalytics();
        window.scrollTo(0, 0); // Example: Scroll to top of the page
        console.log("Window width:", window.innerWidth); // Example: Access window innerWidth
        // Initialize Firebase Analytics here
        // Example:
        // await analytics.logEvent('page_view');
      }
    };

    initializeFirebaseAnalytics();
  }, []);

  return (
    <div className="relative overflow-x-hidden">
      <Navbar nav={nav} openNav={openNavbar} />
      <MobileNavbar nav={nav} closeNav={closeNavbar} />
      <Hero />
      <Destinations />
      <UpcomingTrip />
      <Reviews />
      <Footer />
    </div>
  );
}

export default HomePage;
