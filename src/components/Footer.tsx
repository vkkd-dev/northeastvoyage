import { PrinterIcon } from "@heroicons/react/16/solid";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";

function Footer() {
  return (
    <div className="pb-[2rem] pt-[7rem] bg-gray-950">
      <div className="w-[80%] mx-auto items-center">
        <div className="flex items-center justify-center space-x-10 mb-14">
          <FaFacebook color="#fff" fontSize={40} />
          <FaYoutube color="#fff" fontSize={40} />
          <FaInstagram color="#fff" fontSize={40} />
        </div>
        <div className="flex flex-col items-center">
          <a href="#" className="footer-link">
            About Us
          </a>
          <a href="#" className="footer-link">
            Terms & Conditions
          </a>
          <a href="#" className="footer-link">
            Payment Policy
          </a>
          <a href="#" className="footer-text">
            @northeastvoyage, All right reserved
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
