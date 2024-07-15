import Image from "next/image";
import Destination from "./Destionation";

function Destinations() {
  return (
    <div className="padding-container mt-[1rem] lg:mt-[2rem]">
      <div className="flex gap-2">
        <Image
          width={20}
          height={20}
          src="./star.svg"
          alt="star"
          className="hidden lg:flex"
        />
        <div className="heading">Destination</div>
      </div>
      <div className="mt-[1rem] lg:mt-[2rem]">
        <Destination />
      </div>
    </div>
  );
}

export default Destinations;
