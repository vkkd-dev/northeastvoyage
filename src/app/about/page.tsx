"use client";

import MobileNavbar from "@/components/MobileNavbar";
import Navbar from "@/components/Navbar";
import TripCard from "@/components/TripCard";
import { tripData } from "@/data/tripData";
import { collection, getDocs } from "firebase/firestore";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { firestore } from "../firebase/firebase-cofig";

interface Destination {
  img: string;
  alt: string;
  description: string;
}

const AboutPage = () => {
  const searchParams = useSearchParams();
  const [tripData, setTripData] = useState([]);
  const [trip, setTrip] = useState<Destination | null>(null);
  const [nav, setNav] = useState(false);
  const openNavbar = () => setNav(true);
  const closeNavbar = () => setNav(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTrips = async () => {
    setIsLoading(true);

    try {
      const tripsCollection = collection(firestore, "trips"); // Reference to the "trips" collection in Firestore
      const querySnapshot = await getDocs(tripsCollection);

      const trips: any = [];
      querySnapshot.forEach((doc) => {
        trips.push({ id: doc.id, ...doc.data() });
      });

      setTripData(trips);
    } catch (error) {
      console.error("Error fetching hero image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  useEffect(() => {
    const tripData = searchParams.get("trip");
    if (tripData) {
      setTrip(JSON.parse(tripData));
    }
  }, [searchParams]);

  if (!trip) {
    return (
      <div className="flex justify-center items-center mt-4">
        <ImSpinner2
          height={24}
          width={24}
          className="animate-spin self-center text-center mt-4"
        />
      </div>
    );
  }

  return (
    <div>
      <Navbar nav={nav} openNav={openNavbar} />
      <MobileNavbar nav={nav} closeNav={closeNavbar} />
      <div className="flex flex-col h-[50vh]">
        <div className="relative w-full h-full lg:h-full overflow-hidden">
          <img
            src={trip.img}
            alt={trip.alt}
            className="absolute top-0 left-0 w-full h-full object-top lg:object-cover z-0"
          />
        </div>
      </div>

      <div className="p-5">
        <h2 className="text-2xl font-bold">{trip.alt}</h2>
        <h2 className="text-lg mt-3">{trip.description}</h2>
        <h1 className="mt-10 font-semibold text-2xl">Similar Trips</h1>
        {isLoading && (
          <div className="flex justify-center items-center mt-4">
            <ImSpinner2
              height={24}
              width={24}
              className="animate-spin self-center text-center mt-4"
            />
          </div>
        )}
        {tripData.length === 0 && !isLoading && (
          <h1 className="text-center">No trips found.</h1>
        )}
        {!isLoading && (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            {tripData.map((trip, index) => (
              <TripCard key={index} trip={trip} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutPage;
