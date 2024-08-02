"use client";
import { firestore, storage } from "@/app/firebase/firebase-cofig";
import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [tripsData, setTripsData] = useState<Trip[]>([]);
  const [filteredTrips, setFilteredTrips] = useState<Trip[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  interface Trip {
    id: string;
    name: string;
    city: string;
    price: string;
    duration: string;
    image: string;
    description: string;
    overview: string;
    itinerary: any;
    inclusions: string[];
    exclusions: string[];
    faqs: any;
    priceList: any;
    selectedDates: any;
  }

  useEffect(() => {
    const fetchTrips = async () => {
      setIsFetching(true);
      try {
        const querySnapshot = await getDocs(collection(firestore, "trips"));
        const trips = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Trip[];
        const tripsWithImages = await Promise.all(
          trips.map(async (trip) => {
            const imageUrl = await getDownloadURL(ref(storage, trip.image));
            return { ...trip, image: imageUrl };
          })
        );
        setTripsData(tripsWithImages);
      } catch (error) {
        console.error("Error fetching trips:", error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchTrips();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const results = tripsData.filter((trip) =>
        trip.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTrips(results);
    } else {
      setFilteredTrips([]);
    }
  }, [searchTerm, tripsData]);

  return (
    <div className="bg-white rounded-2xl py-3 lg:py-5 px-10 flex items-center justify-between w-[90%] lg:w-[40%]">
      <input
        placeholder="Type location..."
        className="w-full border-none outline-none"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <BiSearch size={30} />
      {searchTerm && (
        <div className="absolute top-[62%] lg:top-[60%] left-[50%] translate-x-[-50%] w-[90%] lg:w-[40%] bg-white border rounded-2xl shadow-lg max-h-[300px] overflow-y-auto z-10">
          {filteredTrips.length > 0 ? (
            filteredTrips.map((trip) => (
              <div
                key={trip.id}
                className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
              >
                <img
                  src={trip.image}
                  alt={trip.name}
                  className="w-10 h-10 lg:w-16 lg:h-16 object-cover rounded-md mr-2"
                />
                <div className="lg:space-y-2 px-1">
                  <p className="font-semibold">{trip.name}</p>
                  <p className="text-sm text-gray-600">{trip.city}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              No trips available
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
