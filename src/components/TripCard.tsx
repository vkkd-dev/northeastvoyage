import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaClock } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";

// Define the TypeScript interface for the trip object
interface Trip {
  id: string;
  name: string;
  city: string;
  price: string;
  duration: string;
  image: string;
  description: string;
}

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

  return (
    <div
      className="cursor-pointer bg-white rounded-2xl overflow-hidden"
      onClick={handleNavigation}
    >
      <div className="relative overflow-hidden w-full h-64 lg:h-96">
        <Image
          src={trip.image}
          alt={trip.name}
          className="transform object-cover transition-all duration-700 scale-100 hover:scale-125"
          fill
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        <h1 className="text-white absolute text-xs lg:text-base font-semibold top-5 right-0 bg-gradient-to-r from-[#0DB295] to-[#0ECE44] p-2 rounded-sm">
          ₹{trip.price}/per person
        </h1>
        <h1 className="text-white text-sm lg:text-2xl absolute bottom-16 lg:bottom-24 left-3 lg:left-5 font-bold">
          {trip.name}
        </h1>
        <h1 className="flex items-center gap-2 text-white text-xs lg:text-base absolute bottom-10 lg:bottom-12 left-3 lg:left-5 font-bold">
          <FaClock />
          {trip.city}
        </h1>
        <h1 className="flex items-center gap-2 text-white text-xs lg:text-base absolute bottom-4 lg:bottom-5 left-3 lg:left-5 font-bold">
          <FaLocationDot />
          {trip.duration}
        </h1>
      </div>
    </div>
  );
}

export default TripCard;
