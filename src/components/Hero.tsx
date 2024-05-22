import SearchBox from "./SearchBox";

function Hero() {
  return (
    <div className="relative w-[100%] h-[88vh]">
      <div className="absolute top-0 left-0 w-[100%] h-[100%] opacity-50"></div>
      <div
        id="hero"
        className="bg-hero bg-cover bg-center bg-no-repeat h-[100%] w-[100%] z-10 pb-1"
      >
        <div className="absolute z-[100%] w-[100%] h-[100%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <div className="flex items-center justify-center flex-col w-[100%] h-[100%]">
            <SearchBox />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
