import TripCard from "./TripCard";

function UpcomingTrip() {
  return (
    <div className="pt-[5rem] pb-[4rem] padding-container">
      <h1 className="heading">Upcoming Trips</h1>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-[1rem] items-center mx-auto mt-[4rem]">
        <div>
          <TripCard
            name="Trip to Tawang"
            city="Guwahati to Guwahati"
            price="₹7,999/per person"
            duration="2N/3D"
            image="/h1.png"
          />
        </div>
        <div>
          <TripCard
            name="Trip to Tawang"
            city="Guwahati to Guwahati"
            price="₹7,999/per person"
            duration="2N/3D"
            image="/h2.png"
          />
        </div>
        <div>
          <TripCard
            name="Trip to Tawang"
            city="Guwahati to Guwahati"
            price="₹7,999/per person"
            duration="2N/3D"
            image="/h3.png"
          />
        </div>
        <div>
          <TripCard
            name="Trip to Tawang"
            city="Guwahati to Guwahati"
            price="₹7,999/per person"
            duration="2N/3D"
            image="/h4.png"
          />
        </div>
        <div>
          <TripCard
            name="Trip to Tawang"
            city="Guwahati to Guwahati"
            price="₹7,999/per person"
            duration="2N/3D"
            image="/h5.png"
          />
        </div>
        <div>
          <TripCard
            name="Trip to Tawang"
            city="Guwahati to Guwahati"
            price="₹7,999/per person"
            duration="2N/3D"
            image="/h6.png"
          />
        </div>
      </div>
    </div>
  );
}

export default UpcomingTrip;
