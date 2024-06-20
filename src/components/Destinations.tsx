import DestinationsSlider from "./DestinationsSlider";
import Destination from "./Destionation";

function Destinations() {
  return (
    <div className="mt-[2rem] mb-[3rem] padding-container">
      <div className="heading">Destinations</div>
      <div className="mt-[2rem]">
        {/* <DestinationsSlider /> */}
        <Destination />
      </div>
    </div>
  );
}

export default Destinations;
