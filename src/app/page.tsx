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
import Image from "next/image";
import { useState } from "react";
import TrekkingTrips from "../components/TrekkingTrips";
import SummerTrips from "../components/SummerTrips";

function HomePage() {
  const [nav, setNav] = useState(false);
  const openNavbar = () => setNav(true);
  const closeNavbar = () => setNav(false);

  return (
    <div className="relative overflow-x-hidden">
      <Image
        width={75}
        height={75}
        src={"/whatsapp.png"}
        alt="whatsapp"
        className="fixed right-3 lg:right-16 bottom-10 z-50 cursor-pointer"
      />
      <Navbar nav={nav} openNav={openNavbar} />
      <MobileNavbar nav={nav} closeNav={closeNavbar} />
      <Hero />
      <Destinations />
      <UpcomingTrip />
      <Reviews />
      <TrekkingTrips />
      <Cover />
      <SummerTrips />
      <WhyUs />
      <Footer />
    </div>
  );
}

export default HomePage;
