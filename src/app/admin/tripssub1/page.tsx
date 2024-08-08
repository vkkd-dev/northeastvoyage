"use client";

import { useEffect, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { TiTick } from "react-icons/ti";
import { useToast } from "@/components/ui/use-toast";
import { SiTicktick } from "react-icons/si";
import { LuClock10 } from "react-icons/lu";
import { RiPriceTag3Line } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { ImSpinner2 } from "react-icons/im";
import { firestore, storage } from "@/app/firebase/firebase-cofig";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import PageTitle from "@/components/PageTitle";
import SideNavbar from "@/components/SideNavbar";
import Image from "next/image";

interface Trip {
  id: string;
  name: string;
  city: string;
  price: string;
  duration: string;
  image: string;
  description: string;
  overview: string;
}

const TripsSub1 = () => {
  const [tripsData, setTripsData] = useState<Trip[]>([]);
  const [selectedTrips, setSelectedTrips] = useState<Trip[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [title, setTitle] = useState("");

  const { toast } = useToast();

  useEffect(() => {
    const fetchTrips = async () => {
      setIsFetching(true);
      try {
        const querySnapshot = await getDocs(collection(firestore, "trips"));
        const trips = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Trip[];

        // Fetch download URLs for images from Firebase Storage
        const tripsWithImages = await Promise.all(
          trips.map(async (trip) => {
            const imageUrl = await getDownloadURL(ref(storage, trip.image));
            return { ...trip, image: imageUrl };
          })
        );

        setTripsData(tripsWithImages);
      } catch (error) {
        console.error("Error fetching trips:", error);
        toast({
          description: (
            <div className="flex items-center gap-2 font-bold">
              <SiTicktick size={20} />
              <p>Error fetching document</p>
            </div>
          ),
          variant: "destructive",
        });
      } finally {
        setIsFetching(false);
      }
    };

    fetchTrips();
  }, [toast]);

  useEffect(() => {
    const fetchSelectedTrips = async () => {
      const trekkingTripsCollection = collection(firestore, "trips_sub1");
      const querySnapshot = await getDocs(trekkingTripsCollection);
      const fetchedTrips: Trip[] = [];
      querySnapshot.forEach((doc) => {
        if (doc.id !== "trip_title") {
          fetchedTrips.push(doc.data() as Trip);
        }
      });
      setSelectedTrips(fetchedTrips);
    };

    fetchSelectedTrips();
  }, []);

  useEffect(() => {
    const saveSelectedTrips = async () => {
      const trekkingTripsCollection = collection(firestore, "trips_sub1");

      // Fetch existing trip documents
      const existingDocs = await getDocs(trekkingTripsCollection);
      const existingTripIds = existingDocs.docs.map((doc) => doc.id);

      // Determine which trips need to be deleted
      const tripsToDelete = existingTripIds.filter(
        (id) => !selectedTrips.some((trip) => trip.id === id)
      );

      // Delete trips that are not selected
      await Promise.all(
        tripsToDelete.map(async (id) => {
          const tripDoc = doc(trekkingTripsCollection, id);
          await deleteDoc(tripDoc);
        })
      );

      // Add or update selected trips
      await Promise.all(
        selectedTrips.map(async (trip) => {
          const tripDoc = doc(trekkingTripsCollection, trip.id);
          await setDoc(tripDoc, trip);
        })
      );
    };

    saveSelectedTrips();
  }, [selectedTrips]);

  useEffect(() => {
    const fetchTitle = async () => {
      const titleDoc = await getDoc(doc(firestore, "trips_sub1", "trip_title"));
      if (titleDoc.exists()) {
        setTitle(titleDoc.data().title);
      }
    };

    fetchTitle();
  }, []);

  const handleSelectTrip = async (trip: Trip) => {
    setSelectedTrips((prevSelectedTrips) => {
      let updatedTrips: Trip[];
      if (isTripSelected(trip.id)) {
        // Unselect the trip
        updatedTrips = prevSelectedTrips.filter((t) => t.id !== trip.id);
      } else {
        // Select the trip
        if (prevSelectedTrips.length < 4) {
          updatedTrips = [...prevSelectedTrips, trip];
        } else {
          updatedTrips = [...prevSelectedTrips.slice(1), trip];
        }
      }
      return updatedTrips;
    });
  };

  const isTripSelected = (tripId: string) => {
    return selectedTrips.some((selectedTrip) => selectedTrip.id === tripId);
  };

  const truncateText = (text: string) => {
    if (text.length <= 110) return text;
    return text.slice(0, 110) + "...";
  };

  const formatCurrency = (amount: string) => {
    return `₹${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await setDoc(doc(firestore, "trips_sub1", "trip_title"), { title });
      toast({
        description: (
          <div className="flex items-center gap-2">
            <SiTicktick size={20} />
            <p>Trip Title Updated</p>
          </div>
        ),
        className: "bg-primary text-white font-bold",
      });
    } catch (error: any) {
      console.log(`Error updating title ${error}`);
      toast({
        description: (
          <div className="flex items-center gap-2 font-bold">
            <SiTicktick size={20} />
            <p>`Error updating title ${error}`</p>
          </div>
        ),
        variant: "destructive",
      });
    }
  };

  return (
    <div className={"min-h-screen w-full bg-white text-black flex "}>
      <SideNavbar />
      <div className="flex flex-col gap-5 w-full p-8">
        <PageTitle title="Trips - Sub 1" />
        <div className="container mx-auto p-4">
          {/* Form to change title */}
          <form
            onSubmit={handleSubmit}
            className="mb-4 border px-10 pt-6 pb-3 rounded-lg"
            encType="multipart/form-data"
          >
            <div className="flex flex-col gap-4 mb-4">
              <h1 className="text-lg font-semibold">Change Title</h1>

              {/* Name Input */}
              <input
                type="text"
                placeholder="Name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded"
              />

              {/* Submit Button */}
              <Button
                type="submit"
                className="bg-blue-500 text-white px-4 py-1 self-start rounded hover:bg-blue-600 transition duration-200"
              >
                Update
              </Button>
            </div>
          </form>

          {isFetching && (
            <div className="flex justify-center items-center mt-4">
              <ImSpinner2
                height={24}
                width={24}
                className="animate-spin self-center text-center mt-4"
              />
            </div>
          )}

          {tripsData.length === 0 && !isFetching && (
            <h1 className="text-center">No trips found.</h1>
          )}

          <h2 className="py-4">Select Trips (Max 4)</h2>
          {/* List of trips */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {!isFetching &&
              tripsData.map((trip) => (
                <div
                  key={trip.id}
                  className="flex flex-col border border-gray-300 rounded p-2"
                >
                  <div className="relative w-full h-40 mb-2 overflow-hidden">
                    <Image
                      src={trip.image}
                      alt={trip.name}
                      width={300}
                      height={200}
                      className="rounded"
                    />
                  </div>
                  <div className="flex flex-col mb-2 gap-2">
                    <h2 className="text-lg font-bold">{trip.name}</h2>
                    <h2 className="text-sm font-semibold">{trip.city}</h2>
                    <h2 className="text-sm font-semibold flex items-center gap-1">
                      <LuClock10 /> {trip.duration}
                    </h2>
                    <h2 className="text-sm font-semibold flex items-center gap-1">
                      <RiPriceTag3Line />
                      {formatCurrency(trip.price)}
                    </h2>
                    <p>{truncateText(trip.description)}</p>
                  </div>
                  <Button
                    onClick={() => handleSelectTrip(trip)}
                    className={`${
                      isTripSelected(trip.id)
                        ? "bg-red-500"
                        : "bg-secondary hover:bg-yellow-600"
                    } text-white w-full rounded transition duration-200 flex items-center justify-center gap-1 mt-auto`}
                  >
                    <TiTick size={18} />
                    {isTripSelected(trip.id) ? "Unselect" : "Select"}
                  </Button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripsSub1;
