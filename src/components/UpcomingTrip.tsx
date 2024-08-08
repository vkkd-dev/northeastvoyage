import { useEffect, useState } from "react";
import TripCard from "./TripCard";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/app/firebase/firebase-cofig";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";

export interface Trip {
  id: string;
  name: string;
  city: string;
  price: string;
  duration: string;
  image: string;
  coverImage: string;
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

function UpcomingTrip() {
  const [tripData, setTripData] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const tripsCollection = collection(firestore, "trips");
        const querySnapshot = await getDocs(tripsCollection);

        const trips: Trip[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Trip[];

        setTripData(trips);
      } catch (error) {
        console.error("Error fetching trips:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrips();
  }, []);

  return (
    <div className="padding-container mt-[1rem] lg:mt-[3rem]">
      <div className="flex gap-2">
        <Image
          width={20}
          height={20}
          src="./star.svg"
          alt="star"
          className="hidden lg:flex"
        />
        <h1 className="heading">Upcoming Trips</h1>
      </div>

      {!isLoading && tripData.length === 0 && (
        <h1 className="text-center pt-20 pb-5">No Upcoming Trips</h1>
      )}

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-[1rem] lg:gap-[3rem] items-center mx-auto mt-[1rem]">
        {isLoading &&
          [1, 2, 3, 4].map((_, i) => (
            <div key={i} className="flex flex-col items-center pt-10">
              <Skeleton className="h-[250px] w-[180px] lg:h-[350px] lg:w-[300px] rounded-lg" />
            </div>
          ))}

        {!isLoading &&
          tripData.length > 0 &&
          tripData.map((trip, index) => <TripCard key={index} trip={trip} />)}
      </div>
    </div>
  );
}

export default UpcomingTrip;
