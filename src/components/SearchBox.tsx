import { BiSearch } from "react-icons/bi";

function SearchBox() {
  return (
    <div className="bg-white rounded-full py-5 px-10 flex items-center justify-between mt-[3rem] w-[75%] lg:w-[60%]">
      <h1>Type location...</h1>
      <BiSearch />
    </div>
  );
}

export default SearchBox;
