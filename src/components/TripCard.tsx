import Image from "next/image";
import { BiHistory, BiLocationPlus } from "react-icons/bi";

interface Props {
  image: string;
  name: string;
  city: string;
  duration: string;
  price: string;
}

function TripCard({ image, name, city, duration, price }: Props) {
  return (
    <div className="cursor-pointer bg-white rounded-md overflow-hidden">
      <div className="relative overflow-hidden w-[100%] h-[20rem]">
        <Image
          src={image}
          alt={name}
          className="transform object-cover transition-all duration-700 scale-100 hover:scale-125"
          fill
        />
        <h1 className="text-white absolute text-xs lg:text-base top-10 right-0 bg-accent p-2">
          {price}
        </h1>
        <h1 className="text-white text-sm lg:text-lg absolute bottom-28 left-2 lg:left-5 font-bold">
          {name}
        </h1>
        <h1 className="flex items-center gap-2 text-white text-xs lg:text-base absolute bottom-5 left-2 lg:left-5 font-bold">
          <BiLocationPlus />
          {duration}
        </h1>
        <h1 className="flex items-center gap-2 text-white text-xs lg:text-base absolute bottom-14 left-2 lg:left-5 font-bold">
          <BiHistory />
          {city}
        </h1>
      </div>
    </div>
  );
}

export default TripCard;
