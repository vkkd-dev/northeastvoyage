"use client"; // This is to ensure the code runs only in the client-side environment

import MobileNavbar from "@/components/MobileNavbar";
import Navbar from "@/components/Navbar";
import TripCard from "@/components/TripCard";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { firestore } from "@/app/firebase/firebase-cofig";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Footer from "@/components/Footer";

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
  coverImage: string;
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

const AboutPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [tripData, setTripData] = useState<Destination | null>(null);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [nav, setNav] = useState(false);
  const openNavbar = () => setNav(true);
  const closeNavbar = () => setNav(false);
  const [isTripLoading, setIsTripLoading] = useState(true);
  const [isTripsLoading, setIsTripsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setIsTripLoading(true);

      const fetchTripData = async () => {
        try {
          const docRef = doc(firestore, "destinations", id as string);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setTripData({ id: docSnap.id, ...docSnap.data() } as Destination);
          } else {
            console.error("No such document!");
          }
        } catch (error) {
          console.error("Error fetching document:", error);
        } finally {
          setIsTripLoading(false);
        }
      };

      fetchTripData();
    }
  }, [id]);

  useEffect(() => {
    const fetchTrips = async () => {
      setIsTripsLoading(true);

      try {
        const tripsCollection = collection(firestore, "trips");

        // Build the query to filter trips by the destination array
        const tripsQuery = id
          ? query(tripsCollection, where("destination", "array-contains", id))
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

  if (!tripData) {
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
      <div className="flex flex-col h-[50vh] lg:h-[75vh] pt-[5rem]">
        <div className="relative w-full h-full lg:h-full overflow-hidden">
          <div
            id="hero"
            className="bg-cover bg-center bg-no-repeat h-full w-full z-10"
            style={{ backgroundImage: `url(${tripData.img})` }}
          />
          {/* <Image
            src={tripData.img}
            alt={tripData.alt}
            layout="fill"
            objectFit="cover"
            priority
          /> */}
        </div>
      </div>

      <div className="p-5 lg:px-32 lg:mt-4 min-h-[40vh]">
        <h2 className="text-2xl font-bold">{tripData.alt}</h2>
        <h2 className="text-lg mt-3">{tripData.description}</h2>
        <h1 className="mt-10 font-semibold text-2xl">Featured Package</h1>
        {isTripsLoading && (
          <div className="flex justify-center items-center mt-4">
            <ImSpinner2
              height={24}
              width={24}
              className="animate-spin self-center text-center mt-4"
            />
          </div>
        )}
        {trips.length === 0 && !isTripsLoading && (
          <h1 className="text-center mt-10">
            No trips of this destination found.
          </h1>
        )}
        {!isTripsLoading && (
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

export default AboutPage;
