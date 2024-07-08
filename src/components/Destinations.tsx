import Image from "next/image";
import Destination from "./Destionation";

function Destinations() {
  return (
    <div className="mt-[2rem] mb-[3rem] padding-container">
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
      <div className="mt-[2rem]">
        <Destination />
      </div>
    </div>
  );
}

export default Destinations;
