import { FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <div className="bg-[#65a78e] pb-[3rem] h-[30rem] mt-[10rem]">
      <div className="absolute left-[50%] translate-x-[-50%] w-[90%] bottom-[2rem] pt-[4rem] pb-[1rem] bg-white rounded-2xl border-2 border-[#0DB295]">
        <div className="w-[80%] mx-auto items-center">
          <div className="space-y-3">
            <h1 className="text-xl font-bold">Our Vision</h1>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. A odio
              neque corrupti mollitia sed tempora.
            </p>
          </div>
          <div className="space-y-3 mt-7">
            <h1 className="text-xl font-bold">Connect with us</h1>
            <div className="flex items-center justify-start space-x-5 mb-14">
              <FaInstagram color="#696969" fontSize={30} />
              <FaWhatsapp color="#696969" fontSize={30} />
              <FaYoutube color="#696969" fontSize={30} />
            </div>
          </div>
          <div className="flex flex-col mt-10">
            <a href="#" className="footer-link text-black">
              Quick Links
            </a>
            <div className="grid grid-cols-2 mb-10 lg:mb-[5rem]">
              <div className="flex flex-col gap-1 lg:gap-2 text-lg text-[#696969] cursor-pointer">
                <div>Home</div>
                <div>About Us</div>
                <div>Linktree</div>
                <div>Cancellation policy</div>
              </div>
              <div className="flex flex-col gap-1 lg:gap-2 text-lg text-[#696969] cursor-pointer">
                <div>Home</div>
                <div>Contact Us</div>
                <div>Privacy Policy</div>
                <div>Terms & Conditions</div>
              </div>
            </div>
            <a
              href="#"
              className="footer-text text-center text-sm lg:text-lg text-black"
            >
              @northeastvoyage, All right reserved
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
