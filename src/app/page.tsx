"use client";
import Cover from "@/components/Cover";
import Destinations from "@/components/Destinations";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import MobileNavbar from "@/components/MobileNavbar";
import Navbar from "@/components/Navbar";
import Reviews from "@/components/Reviews";
import UpcomingTrip from "@/components/UpcomingTrip";
import WhyUs from "@/components/WhyUs";
import { useState } from "react";

function HomePage() {
  const [nav, setNav] = useState(false);
  const openNavbar = () => setNav(true);
  const closeNavbar = () => setNav(false);

  return (
    <div className="relative overflow-x-hidden">
      <Navbar nav={nav} openNav={openNavbar} />
      <MobileNavbar nav={nav} closeNav={closeNavbar} />
      <Hero />
      <Destinations />
      <UpcomingTrip />
      <Reviews />
      <Cover />
      <WhyUs />
      <Footer />
    </div>
  );
}

export default HomePage;
