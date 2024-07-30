"use client"; // This is to ensure the code runs only in the client-side environment

import MobileNavbar from "@/components/MobileNavbar";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Footer from "@/components/Footer";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase-cofig";
import TripCard from "@/components/TripCard";

interface Destination {
  id: string;
  alt: string;
  description: string;
  img: string;
}

interface Trip {
  id: string;
  name: string;
  city: string;
  price: string;
  duration: string;
  image: string;
  description: string;
  overview: string;
  inclusion: any;
  itinerary: any;
  inclusions: string[];
  exclusions: string[];
  faqs: any;
  priceList: any;
  selectedDates: any;
  tripType: string;
}

const CategoryPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [trips, setTrips] = useState<any[]>([]);
  const [isTripsLoading, setIsTripsLoading] = useState<boolean>(false);
  const [nav, setNav] = useState(false);
  const openNavbar = () => setNav(true);
  const closeNavbar = () => setNav(false);

  useEffect(() => {
    const fetchTrips = async () => {
      setIsTripsLoading(true);

      try {
        const tripsCollection = collection(firestore, "trips");

        // Build the query to filter trips by the category id
        const tripsQuery = id
          ? query(tripsCollection, where("category", "==", id))
          : tripsCollection;

        const querySnapshot = await getDocs(tripsQuery);

        const trips: any[] = [];
        querySnapshot.forEach((doc) => {
          trips.push({ id: doc.id, ...doc.data() });
        });

        setTrips(trips);
      } catch (error) {
        console.error("Error fetching trips:", error);
      } finally {
        setIsTripsLoading(false);
      }
    };

    fetchTrips();
  }, [id]);

  if (isTripsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar nav={nav} openNav={openNavbar} />
      <MobileNavbar nav={nav} closeNav={closeNavbar} />

      <div className="px-5 lg:px-32 pt-32 lg:mt-4">
        {trips.length === 0 ? (
          <p>No trips found for this category.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            {trips.map((trip, index) => (
              <TripCard key={index} trip={trip} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CategoryPage;
