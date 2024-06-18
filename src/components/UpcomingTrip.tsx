import { tripData } from "@/data/tripData";
import TripCard from "./TripCard";

function UpcomingTrip() {
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
