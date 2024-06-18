"use client";

import MobileNavbar from "@/components/MobileNavbar";
import Navbar from "@/components/Navbar";
import TripCard from "@/components/TripCard";
import { tripData } from "@/data/tripData";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Destination {
  src: string;
  alt: string;
  description: string;
}

const AboutPage = () => {
  const searchParams = useSearchParams();
  const [trip, setTrip] = useState<Destination | null>(null);
  const [nav, setNav] = useState(false);
  const openNavbar = () => setNav(true);
  const closeNavbar = () => setNav(false);

  useEffect(() => {
    const tripData = searchParams.get("trip");
    if (tripData) {
      setTrip(JSON.parse(tripData));
    }
  }, [searchParams]);

  if (!trip) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar nav={nav} openNav={openNavbar} />
      <MobileNavbar nav={nav} closeNav={closeNavbar} />
      <div className="flex flex-col h-[50vh]">
        <div className="relative w-full h-[75vh] lg:h-full overflow-hidden">
          <img
            src={trip.src}
            alt={trip.alt}
            className="absolute top-0 left-0 w-full h-full object-top lg:object-cover z-0"
          />
        </div>
      </div>

      <div className="p-5">
        <h2 className="text-2xl font-bold">{trip.alt}</h2>
        <h2 className="text-lg mt-3">{trip.description}</h2>
        <h1 className="mt-10 font-semibold text-2xl">Similar Trips</h1>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {tripData.map((trip, index) => (
            <TripCard key={index} trip={trip} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
