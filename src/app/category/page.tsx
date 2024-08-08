"use client"; // This is to ensure the code runs only in the client-side environment

import MobileNavbar from "@/components/MobileNavbar";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Footer from "@/components/Footer";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase-cofig";
import TripCard from "@/components/TripCard";
import PageTitle from "@/components/PageTitle";

interface Destination {
  id: string;
  alt: string;
  description: string;
  img: string;
}

interface Trip {
  id: string;
  name: string;
  city: string;
  price: string;
  duration: string;
  image: string;
  description: string;
  overview: string;
  inclusion: any;
  itinerary: any;
  inclusions: string[];
  exclusions: string[];
  faqs: any;
  priceList: any;
  selectedDates: any;
  tripType: string;
}

interface Category {
  id: string;
  title: string;
}

const CategoryPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [trips, setTrips] = useState<any[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isTripsLoading, setIsTripsLoading] = useState<boolean>(false);
  const [nav, setNav] = useState(false);
  const openNavbar = () => setNav(true);
  const closeNavbar = () => setNav(false);

  useEffect(() => {
    const fetchTrips = async () => {
      setIsTripsLoading(true);

      try {
        const tripsCollection = collection(firestore, "trips");

        // Build the query to filter trips by category id
        const tripsQuery = id
          ? query(tripsCollection, where("category", "array-contains", id))
          : tripsCollection;

        const querySnapshot = await getDocs(tripsQuery);

        const trips: any[] = [];
        querySnapshot.forEach((doc) => {
          trips.push({ id: doc.id, ...doc.data() });
        });

        setTrips(trips);
      } catch (error) {
        console.error("Error fetching trips:", error);
      } finally {
        setIsTripsLoading(false);
      }
    };

    fetchTrips();
  }, [id]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesCollection = collection(firestore, "categories");
      const querySnapshot = await getDocs(categoriesCollection);
      const fetchedCategories: Category[] = [];
      querySnapshot.forEach((doc) => {
        fetchedCategories.push({ id: doc.id, title: doc.data().title });
      });
      setCategories(fetchedCategories);
    };
    fetchCategories();
  }, []);

  const getCategoryTitleById = (id: string) => {
    const category = categories.find((cat) => cat.id === id);
    return category ? category.title : "Unknown";
  };

  if (isTripsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar nav={nav} openNav={openNavbar} />
      <MobileNavbar nav={nav} closeNav={closeNavbar} />

      <div className="px-5 lg:px-32 pt-32">
        {/* <PageTitle title={`Category - ${getCategoryTitleById(id!)}`} /> */}
        <h1 className={"text-2xl font-semibold"}>
          Category -{" "}
          <span className="text-primary">{getCategoryTitleById(id!)}</span>
        </h1>
        {trips.length === 0 ? (
          <div className="min-h-[75vh] flex justify-center items-center">
            <p>No trips found for this category.</p>
          </div>
        ) : (
          <div>
            <div className="min-h-[75vh] grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
              {trips.map((trip, index) => (
                <TripCard key={index} trip={trip} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default CategoryPage;
