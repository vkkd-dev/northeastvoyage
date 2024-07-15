import { BiSearch } from "react-icons/bi";

function SearchBox() {
  return (
    <div className="bg-white rounded-full py-3 lg:py-5 px-10 flex items-center justify-between w-[90%] lg:w-[40%]">
      <input placeholder="Type location..." className="w-full" />
      <BiSearch size={30} />
    </div>
  );
}

export default SearchBox;
