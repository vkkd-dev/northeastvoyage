import TripCard from "./TripCard";

const tripData = [
  {
    name: "Trip to Tawang",
    city: "Guwahati to Guwahati",
    price: "₹7,999/per person",
    duration: "2N/3D",
    image: "/ut1.png",
  },
  {
    name: "Trip to Tawang",
    city: "Guwahati to Guwahati",
    price: "₹7,999/per person",
    duration: "2N/3D",
    image: "/ut2.png",
  },
  {
    name: "Trip to Tawang",
    city: "Guwahati to Guwahati",
    price: "₹7,999/per person",
    duration: "2N/3D",
    image: "/ut3.png",
  },
  {
    name: "Trip to Tawang",
    city: "Guwahati to Guwahati",
    price: "₹7,999/per person",
    duration: "2N/3D",
    image: "/ut4.png",
  },
  {
    name: "Trip to Tawang",
    city: "Guwahati to Guwahati",
    price: "₹7,999/per person",
    duration: "2N/3D",
    image: "/ut5.png",
  },
  {
    name: "Trip to Tawang",
    city: "Guwahati to Guwahati",
    price: "₹7,999/per person",
    duration: "2N/3D",
    image: "/ut6.png",
  },
  {
    name: "Trip to Tawang",
    city: "Guwahati to Guwahati",
    price: "₹7,999/per person",
    duration: "2N/3D",
    image: "/ut7.png",
  },
  {
    name: "Trip to Tawang",
    city: "Guwahati to Guwahati",
    price: "₹7,999/per person",
    duration: "2N/3D",
    image: "/ut8.png",
  },
];

function UpcomingTrip() {
  return (
    <div className="padding-container">
      <h1 className="heading">Upcoming Trips</h1>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-[1rem] lg:gap-[2rem] items-center mx-auto mt-[1rem]">
        {tripData.map((trip) => (
          <TripCard
            name={trip.name}
            city={trip.city}
            price={trip.price}
            duration={trip.duration}
            image={trip.image}
          />
        ))}
      </div>
    </div>
  );
}

export default UpcomingTrip;
