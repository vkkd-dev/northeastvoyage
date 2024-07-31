import Image from "next/image";

const AboutUsCard = ({ data }: any) => {
  const handleNavigate = () => {
    window.open(data.url, "_blank");
  };

  return (
    <div className="flex flex-col items-center">
      <Image
        width={175}
        height={175}
        src={data.image}
        alt="profile_picture"
        className="rounded-full w-[175px] h-[175px]"
      />
      <h2 className="mt-5 font-extrabold text-xl">{data.name}</h2>
      <p className="mt-1 text-lg font-medium">{data.designation}</p>
      <Image
        width={30}
        height={30}
        src={"/instagram.png"}
        alt="logo"
        className="mt-3 cursor-pointer"
        onClick={handleNavigate}
      />
    </div>
  );
};

export default AboutUsCard;
