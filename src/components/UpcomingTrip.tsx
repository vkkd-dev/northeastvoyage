import { useEffect, useState } from "react";
import TripCard from "./TripCard";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/app/firebase/firebase-cofig";

interface Trip {
  id: string;
  name: string;
  city: string;
  price: string;
  duration: string;
  image: string;
  description: string;
}

function UpcomingTrip() {
  const [tripData, setTripData] = useState<Trip[]>([]);

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
      }
    };

    fetchTrips();
  }, []);

  return (
    <div className="padding-container">
      <h1 className="heading">Upcoming Trips</h1>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-[1rem] lg:gap-[2rem] items-center mx-auto mt-[1rem]">
        {tripData.map((trip, index) => (
          <TripCard key={index} trip={trip} />
        ))}
      </div>
    </div>
  );
}

export default UpcomingTrip;
