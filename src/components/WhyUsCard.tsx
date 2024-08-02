import Image from "next/image";

const WhyUsCard = ({ data }: any) => {
  return (
    <div className="m-4 p-4 min-h-[16rem] flex flex-col justify-center items-center border-[#0DB295] sm:border-none lg:border-solid border-2 rounded-3xl">
      <Image
        width={75}
        height={75}
        alt="Why us image"
        src={data.icon}
        className="mx-auto"
      />
      <h1 className="mt-[1.5rem] mb-[0.5rem] font-bold text-center">
        {data.title}
      </h1>
      <p className="text-center text-xs">{data.subtitle}</p>
    </div>
  );
};

export default WhyUsCard;
