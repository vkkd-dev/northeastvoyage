import { User2 } from "lucide-react";

export type BookingProps = {
  name: string;
  email: string;
  destination: string;
};

export default function BookingsCard(props: BookingProps) {
  return (
    <div className="flex flex-wrap justify-between gap-3">
      <section className="flex justify-between gap-3">
        <div className="h-12 w-12 rounded-full bg-gray-100 p-1 flex justify-center items-center ">
          <User2 width={30} height={30} />
        </div>
        <div className="text-sm">
          <p>{props.name}</p>
          <div className="text-ellipsis overflow-hidden whitespace-nowrap w-[120px] sm:w-auto text-gray-400">
            {props.email}
          </div>
        </div>
        <div></div>
      </section>
      <p>{props.destination}</p>
    </div>
  );
}
