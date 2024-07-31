import Image from "next/image";

const WhyUsCard = ({ data }: any) => {
  return (
    <div className="m-4 p-4 min-h-[20rem] flex flex-col justify-center items-center border-[#0DB295] sm:border-none lg:border-solid border-2 rounded-3xl">
      <Image
        width={150}
        height={150}
        alt="Why us image"
        src="/whyus.png"
        className="mx-auto"
      />
      <h1 className="mt-[1.5rem] mb-[0.5rem] font-bold text-center">
        {data.title}
      </h1>
      <p className="text-center text-sm">{data.subtitle}</p>
    </div>
  );
};

export default WhyUsCard;
