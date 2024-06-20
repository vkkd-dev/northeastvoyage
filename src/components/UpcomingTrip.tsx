import { useEffect, useState } from "react";
import TripCard from "./TripCard";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/app/firebase/firebase-cofig";
// import { tripData } from "@/data/tripData";

function UpcomingTrip() {
  const [tripData, setTripData] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      const tripsCollection = collection(firestore, "trips"); // Reference to the "trips" collection in Firestore
      const querySnapshot = await getDocs(tripsCollection);

      const trips: any = [];
      querySnapshot.forEach((doc) => {
        trips.push({ id: doc.id, ...doc.data() });
      });

      setTripData(trips);
    };

    fetchTrips();
  }, []); // Run once on component mount

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
