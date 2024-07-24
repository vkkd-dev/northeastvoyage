import { GiMeal } from "react-icons/gi";
import { FaHotel } from "react-icons/fa";
import { FaCarSide } from "react-icons/fa";

const InclusionCard = ({ inclusion }: any) => {
  return (
    <div className="flex items-center gap-1 border-secondary border-2 border-solid py-1 px-2 rounded-full text-center">
      {inclusion === "Meals" && <GiMeal className="text-secondary" size={20} />}
      {inclusion === "Stays" && (
        <FaHotel className="text-secondary" size={18} />
      )}
      {inclusion === "Transportation" && (
        <FaCarSide className="text-secondary" size={20} />
      )}
      {inclusion}
    </div>
  );
};

export default InclusionCard;
