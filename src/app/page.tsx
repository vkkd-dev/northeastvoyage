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
import TripsSub1 from "../components/TripsSub1";
import TripsSub2 from "../components/TripsSub2";
import { useState } from "react";

function HomePage() {
  const [nav, setNav] = useState(false);
  const openNavbar = () => setNav(true);
  const closeNavbar = () => setNav(false);

  const handleWhatsapp = () => {
    window.open("https://wa.link/fmnp8k");
  };

  return (
    <div className="relative overflow-x-hidden">
      <Image
        width={75}
        height={75}
        src={"/whatsapp.png"}
        alt="whatsapp"
        className="fixed right-3 lg:right-16 bottom-14 z-50 cursor-pointer"
        onClick={handleWhatsapp}
      />
      <Navbar nav={nav} openNav={openNavbar} />
      <MobileNavbar nav={nav} closeNav={closeNavbar} />
      <Hero />
      <Destinations />
      <UpcomingTrip />
      <Reviews />
      <TripsSub1 />
      <Cover />
      <TripsSub2 />
      <WhyUs />
      <Footer />
    </div>
  );
}

export default HomePage;
