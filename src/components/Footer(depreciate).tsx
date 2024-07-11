import { FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <div className="bg-secondary pb-[3rem] h-[38rem] lg:h-[35rem] mt-[10rem]">
      <div className="absolute left-[50%] translate-x-[-50%] w-[90%] bottom-[2rem] pt-[4rem] pb-[1rem] bg-white rounded-2xl border-2 border-[#0DB295]">
        <div className="w-[75%] lg:w-[85%] mx-auto items-center">
          <div className="space-y-3">
            <h1 className="text-xl font-bold tracking-wider">Our Vision</h1>
            <p className="tracking-wide">
              Our vision is to be the leading platform for unforgettable travel
              experiences in the Northeast. We aim to inspire and empower
              travelers to explore the beauty and culture of the region
              effortlessly
            </p>
          </div>
          <div className="space-y-3 mt-7">
            <h1 className="text-xl font-bold tracking-wider">
              Connect with us
            </h1>
            <div className="flex items-center justify-start space-x-5 mb-14">
              <FaInstagram color="#696969" fontSize={30} />
              <FaWhatsapp color="#696969" fontSize={30} />
              <FaYoutube color="#696969" fontSize={30} />
            </div>
          </div>
          <div className="flex flex-col mt-10">
            <a href="#" className="footer-link text-black tracking-wider">
              Quick Links
            </a>
            <div className="justify-between grid grid-cols-2 mb-10 lg:mb-[5rem]">
              <div className="flex flex-col gap-2 text-[#696969] lg:text-lg">
                <a
                  href="/"
                  className="cursor-pointer self-start tracking-wider hover:text-secondary hover:font-bold"
                >
                  Home
                </a>
                <a
                  href="/aboutus"
                  className="cursor-pointer self-start tracking-wider hover:text-secondary hover:font-bold"
                >
                  About Us
                </a>
                <a
                  href="#"
                  className="cursor-pointer self-start tracking-wider hover:text-secondary hover:font-bold"
                >
                  Linktree
                </a>
                <a
                  href="/cancellationpolicy"
                  className="cursor-pointer self-start tracking-wider hover:text-secondary hover:font-bold"
                >
                  Cancellation policy
                </a>
              </div>
              <div className="flex flex-col gap-2 text-[#696969] lg:text-lg">
                <a
                  href="/"
                  className="cursor-pointer self-start tracking-wider hover:text-secondary hover:font-bold"
                >
                  Home
                </a>
                <a
                  href="/contactus"
                  className="cursor-pointer self-start tracking-wider hover:text-secondary hover:font-bold"
                >
                  Contact Us
                </a>
                <a
                  href="/privacypolicy"
                  className="cursor-pointer self-start tracking-wider hover:text-secondary hover:font-bold"
                >
                  Privacy Policy
                </a>
                <a
                  href="/termsandconditions"
                  className="cursor-pointer self-start tracking-wider hover:text-secondary hover:font-bold"
                >
                  Terms & Conditions
                </a>
              </div>
            </div>
            <a
              href="#"
              className="footer-text text-center text-sm lg:text-lg text-black tracking-wider"
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
