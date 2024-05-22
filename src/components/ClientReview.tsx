import Image from "next/image";

interface Props {
  image: string;
  name: string;
}

function ClientReview({ image, name }: Props) {
  return (
    <div className="p-4">
      <div>
        <Image
          width={100}
          height={100}
          alt={name}
          src={image}
          className="rounded-full mx-auto"
        />
      </div>
      <h1 className="mt-[1.5rem] mb-[0.5rem] font-bold text-center text-[18px] text-black">
        {name}
      </h1>
      <p className="text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur rem
        est, omnis ipsam atque mollitia quidem saepe deleniti! Cupiditate
        tenetur corporis beatae ad
      </p>
    </div>
  );
}

export default ClientReview;
