"use client";

import MobileNavbar from "@/components/MobileNavbar";
import Navbar from "@/components/Navbar";
import TripCard from "@/components/TripCard";
import { collection, getDocs } from "firebase/firestore";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoTime } from "react-icons/io5";
import { LuDownload } from "react-icons/lu";
import { firestore } from "../firebase/firebase-cofig";
import { ImSpinner2 } from "react-icons/im";

interface Trip {
  name: string;
  city: string;
  price: string;
  duration: string;
  image: string;
  description: string;
}

const TripPage = () => {
  const searchParams = useSearchParams();
  const [tripData, setTripData] = useState([]);
  const [trip, setTrip] = useState<Trip | null>(null);
  const [nav, setNav] = useState(false);
  const openNavbar = () => setNav(true);
  const closeNavbar = () => setNav(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTrips = async () => {
    setIsLoading(true);

    try {
      const tripsCollection = collection(firestore, "trips");
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
      <div className="flex flex-col h-[75vh] lg:h-[90vh]">
        <div className="relative w-full h-[75vh] lg:h-full overflow-hidden">
          <div className="absolute z-20 top-[75%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-[#FFD600] rounded-full py-2 px-4 text-white text-center">
            <div className="flex items-center justify-center gap-1 cursor-pointer">
              <LuDownload className="text-xl" />
              Download Itinerary
            </div>
          </div>
          <img
            src={trip.image}
            alt={trip.name}
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          />
        </div>
      </div>

      <div className="p-5">
        <h2 className="text-2xl font-bold">{trip.name}</h2>
        <div className="flex justify-between items-center mt-2">
          <p className="text-sm flex items-center gap-1">
            <FaLocationDot />
            {trip.city}
          </p>
          <p className="text-sm flex items-center gap-1">
            <IoTime />
            {trip.duration}
          </p>
        </div>
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
            {tripData.slice(0, 4).map((trip, index) => (
              <TripCard key={index} trip={trip} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TripPage;
