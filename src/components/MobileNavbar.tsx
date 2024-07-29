import { XMarkIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Pros {
  nav: boolean;
  closeNav: () => void;
}

function MobileNavbar({ nav, closeNav }: Pros) {
  const navAnimation = nav ? "translate-x-0" : "translate-x-[100%]";
  const router = useRouter();

  const handleNavigation = () => {
    closeNav();
  };

  return (
    <div
      className={`fixed ${navAnimation} bg-white transform transition-all duration-300 top-0 right-0 bottom-0 z-[10000]`}
    >
      <div className="w-[60vw] h-[100vh] flex flex-col">
        <div className="flex flex-col pt-20">
          <div className="nav-links-mobile-border">
            <div
              className="nav-links-mobile"
              onClick={() => {
                router.push("/");
                closeNav();
              }}
            >
              Home
            </div>
          </div>
          <div className="nav-links-mobile-border">
            <div className="nav-links-mobile" onClick={handleNavigation}>
              Destination
              <Image
                width={15}
                height={15}
                alt="drop-down"
                src={"/down-arrow.svg"}
              />
            </div>
          </div>
          <div className="nav-links-mobile-border">
            <div className="nav-links-mobile" onClick={handleNavigation}>
              Category
              <Image
                width={15}
                height={15}
                alt="drop-down"
                src={"/down-arrow.svg"}
              />
            </div>
          </div>
          <div className="nav-links-mobile-border">
            <div
              className="nav-links-mobile"
              onClick={() => {
                router.push("aboutus");
                closeNav();
              }}
            >
              About Us
            </div>
          </div>
        </div>
        <div
          onClick={() => {
            router.push("contactus");
            closeNav();
          }}
          className="relative lg:inline-flex items-center justify-center self-center mt-16 px-8 py-2 overflow-hidden font-medium tracking-tighter text-white bg-primary rounded-full group"
        >
          <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-green-900 rounded-full group-hover:w-56 group-hover:h-56"></span>
          <span className="absolute inset-0 w-full -mt-1 rounded-lg opacity-30 bg-gradient-to-t from-transparent via-transparent bg-green-600"></span>
          <span className="relative text-sm">Contact Us</span>
        </div>
      </div>
      <div
        onClick={closeNav}
        className="absolute bg-[#D4D4D4] p-2 rounded-full cursor-pointer top-[1rem] right-[1rem] z-[999]"
      >
        <XMarkIcon className="w-[1.5rem] h-[1.5rem] text-black font-bold" />
      </div>
    </div>
  );
}

export default MobileNavbar;
