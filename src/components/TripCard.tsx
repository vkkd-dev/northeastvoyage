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
    return `₹ ${amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  return (
    <div
      className="cursor-pointer bg-white overflow-hidden"
      onClick={handleNavigation}
    >
      <div className="relative overflow-hidden w-full h-[20rem] lg:h-[26rem] rounded-2xl">
        <Image
          src={trip?.coverImage}
          alt={trip?.name}
          className="transform object-cover object-top transition-all duration-700 scale-100 hover:scale-125"
          fill
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        <div className="absolute bottom-0 w-full">
          <h1 className="text-white text-sm lg:text-2xl font-bold m-3 lg:m-4">
            {trip?.name}
          </h1>
          <h1 className="flex items-center gap-1 lg:gap-2 text-white text-[9px] lg:text-sm mt-2 font-semibold ml-3 lg:ml-4 mb-2">
            <FaClock />
            {trip?.duration}
          </h1>
          <h1 className="flex items-center gap-1 lg:gap-2 text-white text-[9px] lg:text-sm font-semibold ml-3 lg:ml-4 mb-4">
            <FaLocationDot />
            {trip?.city}
          </h1>
          <h1 className="text-white text-xs lg:text-base font-medium bg-gradient-to-r from-[#0DB295] to-[#0ECE44] py-3 px-4">
            {trip.tripType === "public" &&
              `${formatCurrency(trip?.price)} / person`}
            {trip.tripType === "customize" && `Customized`}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default TripCard;
