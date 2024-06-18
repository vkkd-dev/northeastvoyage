import Image from "next/image";
import { useRouter } from "next/navigation";
import { BiHistory, BiLocationPlus } from "react-icons/bi";

// Define the TypeScript interface for the trip object
interface Trip {
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
    const query = new URLSearchParams({
      trip: JSON.stringify(trip),
    }).toString();
    router.push(`/trip?${query}`);
  };

  return (
    <div
      className="cursor-pointer bg-white rounded-lg overflow-hidden"
      onClick={handleNavigation}
    >
      <div className="relative overflow-hidden w-[100%] h-[20rem]">
        <Image
          src={trip.image}
          alt={trip.name}
          className="transform object-cover transition-all duration-700 scale-100 hover:scale-125"
          fill
        />
        <h1 className="text-white absolute text-xs lg:text-base top-10 right-0 bg-accent p-2">
          {trip.price}
        </h1>
        <h1 className="text-white text-sm lg:text-lg absolute bottom-28 left-2 lg:left-5 font-bold">
          {trip.name}
        </h1>
        <h1 className="flex items-center gap-2 text-white text-xs lg:text-base absolute bottom-5 left-2 lg:left-5 font-bold">
          <BiLocationPlus />
          {trip.duration}
        </h1>
        <h1 className="flex items-center gap-2 text-white text-xs lg:text-base absolute bottom-14 left-2 lg:left-5 font-bold">
          <BiHistory />
          {trip.city}
        </h1>
      </div>
    </div>
  );
}

export default TripCard;
