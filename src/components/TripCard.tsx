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
    router.push(`/trip/${trip.id}`);
  };

  return (
    <div
      className="cursor-pointer bg-white rounded-lg overflow-hidden"
      onClick={handleNavigation}
    >
      <div className="relative overflow-hidden w-full h-80">
        <Image
          src={trip.image}
          alt={trip.name}
          className="transform object-cover transition-all duration-700 scale-100 hover:scale-125"
          fill
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        <h1 className="text-white absolute text-xs lg:text-base top-5 right-0 bg-accent p-2">
          ₹{trip.price}/per person
        </h1>
        <h1 className="text-white text-sm lg:text-lg absolute bottom-28 left-2 lg:left-5 font-bold">
          {trip.name}
        </h1>
        <h1 className="flex items-center gap-2 text-white text-xs lg:text-base absolute bottom-5 left-2 lg:left-5 font-bold">
          <FaLocationDot />
          {trip.duration}
        </h1>
        <h1 className="flex items-center gap-2 text-white text-xs lg:text-base absolute bottom-14 left-2 lg:left-5 font-bold">
          <FaClock />
          {trip.city}
        </h1>
      </div>
    </div>
  );
}

export default TripCard;
