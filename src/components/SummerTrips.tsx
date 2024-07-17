import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/app/firebase/firebase-cofig";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import TripCard from "@/components/TripCard";

interface Trip {
  id: string;
  name: string;
  city: string;
  price: string;
  duration: string;
  image: string;
  description: string;
}

function SummerTrips() {
  const [selectedTrips, setSelectedTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSelectedTrips = async () => {
      const trekkingTripsCollection = collection(firestore, "summer_trips");
      const querySnapshot = await getDocs(trekkingTripsCollection);
      const fetchedTrips: Trip[] = [];
      querySnapshot.forEach((doc) => {
        fetchedTrips.push(doc.data() as Trip);
      });
      setSelectedTrips(fetchedTrips);
      setIsLoading(false);
    };

    fetchSelectedTrips();
  }, []);

  return (
    <div className="padding-container top-margin">
      <div className="flex gap-2">
        <Image
          width={20}
          height={20}
          src="./star.svg"
          alt="star"
          className="hidden lg:flex"
        />
        <h1 className="heading">Summer Trips</h1>
      </div>

      {!isLoading && selectedTrips.length === 0 && (
        <h1 className="text-center pt-20 pb-5">No Summer Trips</h1>
      )}

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-[1rem] lg:gap-[3rem] items-center mx-auto mt-[1rem]">
        {isLoading &&
          [1, 2, 3, 4].map((_, i) => (
            <div key={i} className="flex flex-col items-center pt-10">
              <Skeleton className="h-[250px] w-[180px] lg:h-[350px] lg:w-[300px] rounded-lg" />
            </div>
          ))}

        {!isLoading &&
          selectedTrips.length > 0 &&
          selectedTrips
            .slice(0, 4)
            .map((trip, index) => <TripCard key={index} trip={trip} />)}
      </div>
    </div>
  );
}

export default SummerTrips;
