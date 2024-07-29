import { useRouter } from "next/navigation";
import { FaClock } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { Trip } from "./UpcomingTrip";
import Image from "next/image";

// Define the props for the TripCard component
interface TripCardProps {
  trip: Trip;
}

function TripCard({ trip }: TripCardProps) {
  const router = useRouter();

  const handleNavigation = () => {
    // router.push(`/trip/${trip.id}`);
    router.push(`/trip?id=${trip.id}`);
  };

  const formatCurrency = (amount: string) => {
    return `₹${amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  return (
    <div
      className="cursor-pointer bg-white rounded-2xl overflow-hidden"
      onClick={handleNavigation}
    >
      <div className="relative overflow-hidden w-full h-64 lg:h-96">
        <Image
          src={trip?.image}
          alt={trip?.name}
          className="transform object-cover transition-all duration-700 scale-100 hover:scale-125"
          fill
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        <h1 className="text-white absolute text-xs lg:text-base font-medium top-5 right-0 bg-gradient-to-r from-[#0DB295] to-[#0ECE44] p-2 rounded-bl-sm rounded-tl-sm">
          {trip.tripType === "public" &&
            `${formatCurrency(trip?.price)} /per person`}
          {trip.tripType === "customize" && `Customised`}
        </h1>
        <div className="absolute bottom-3 lg:bottom-4 left-3 lg:left-4">
          <h1 className="text-white text-sm lg:text-2xl font-bold">
            {trip?.name}
          </h1>
          <h1 className="flex items-center gap-2 text-white text-[10px] lg:text-sm mt-2 mb-1">
            <FaLocationDot />
            {trip?.duration}
          </h1>
          <h1 className="flex items-center gap-2 text-white text-[10px] lg:text-sm">
            <FaClock />
            {trip?.city}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default TripCard;
