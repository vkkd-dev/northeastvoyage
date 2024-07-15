"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import MobileNavbar from "@/components/MobileNavbar";
import Navbar from "@/components/Navbar";
import TripCard from "@/components/TripCard";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoTime } from "react-icons/io5";
import { ImSpinner2 } from "react-icons/im";
import { firestore } from "@/app/firebase/firebase-cofig";
import { useSearchParams } from "next/navigation";
import TripFooter from "@/components/TripFooter";
import InclusionCard from "@/components/InclusionCard";
import Image from "next/image";

interface Trip {
  id: string;
  name: string;
  city: string;
  price: string;
  duration: string;
  image: string;
  description: string;
  overview: string;
  inclusion: string[];
}

const TripPage = () => {
  // const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [tripData, setTripData] = useState<Trip | null>(null);
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
          const docRef = doc(firestore, "trips", id as string);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setTripData({ id: docSnap.id, ...docSnap.data() } as Trip);
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
      console.log("tripData", tripData);
    }
  }, [id]);

  useEffect(() => {
    const fetchTrips = async () => {
      setIsTripsLoading(true);

      try {
        const tripsCollection = collection(firestore, "trips");
        const querySnapshot = await getDocs(tripsCollection);

        const trips: any = [];
        querySnapshot.forEach((doc) => {
          trips.push({ id: doc.id, ...doc.data() });
        });

        setTrips(trips);
      } catch (error) {
        console.error("Error fetching hero image:", error);
      } finally {
        setIsTripsLoading(false);
      }
    };
    fetchTrips();
  }, []);

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
    <>
      <Navbar nav={nav} openNav={openNavbar} />
      <MobileNavbar nav={nav} closeNav={closeNavbar} />
      <div className="flex flex-col h-[33vh] lg:h-[66vh]">
        <div className="relative w-full h-[75vh] lg:h-full overflow-hidden">
          <Image
            src={tripData.image}
            alt={tripData.name}
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
      </div>

      <div className="p-5 lg:p-10">
        <h2 className="text-2xl font-bold">{tripData.name}</h2>
        <div className="flex flex-col gap-2 mt-4">
          <h2>Details</h2>
          <p className="text-sm flex items-center gap-1">
            <FaLocationDot className="text-secondary" />
            {tripData.city}
          </p>
          <p className="text-sm flex items-center gap-1">
            <IoTime className="text-secondary" />
            {tripData.duration}
          </p>
        </div>
        <div className="flex flex-col gap-3 mt-4">
          <h2 className="font-extrabold text-xl">Inclusion</h2>
          <div className="flex gap-2">
            {tripData?.inclusion?.map((inclusion, index) => (
              <InclusionCard key={index} inclusion={inclusion} />
            ))}
          </div>
        </div>
        <div className="flex flex-col py-6 gap-2">
          <h2 className="font-extrabold text-xl">Overview</h2>
          <p>{tripData.overview}</p>
          <span className="text-secondary font-bold">Show More</span>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-extrabold text-xl">Itinerary</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-bold text-sm">
                Day 1 - Arrive at Base Camp in Manali
              </AccordionTrigger>
              <AccordionContent>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
                voluptatum earum error optio magnam. Incidunt, ipsam soluta?
                Tempore, veniam quos!
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="font-bold text-sm">
                Day 2 - Arrive at Base Camp in Manali
              </AccordionTrigger>
              <AccordionContent>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Tempore commodi, voluptatum dignissimos minima culpa architecto?
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="font-bold text-sm">
                Day 3 - Arrive at Base Camp in Manali
              </AccordionTrigger>
              <AccordionContent>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero,
                velit.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <h1 className="mt-10 font-semibold text-2xl">Similar Trips</h1>
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
          <h1 className="text-center">No trips found.</h1>
        )}
        {!isTripsLoading && (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            {trips.map((trip, index) => (
              <TripCard key={index} trip={trip} />
            ))}
          </div>
        )}
      </div>

      <TripFooter price={tripData.price} />
    </>
  );
};

export default TripPage;
