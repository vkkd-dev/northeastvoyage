"use client";
import { firestore } from "@/app/firebase/firebase-cofig";
import PageTitle from "@/components/PageTitle";
import SideNavbar from "@/components/SideNavbar";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import moment from "moment-timezone";

interface Query {
  id: string;
  name: string;
  email: string;
  number: string;
  message: string;
  timestamp: Timestamp;
}

const ContactUsPage = () => {
  const [queries, setQueries] = useState<Query[]>([]);

  useEffect(() => {
    const fetchQueries = async () => {
      const querySnapshot = await getDocs(collection(firestore, "contact_us"));
      const queriesData = querySnapshot.docs.map((doc) => {
        const data = doc.data() as Omit<Query, "id">; // Exclude the 'id' field
        console.log("data", data);
        return { id: doc.id, ...data };
      });
      setQueries(queriesData);
    };

    fetchQueries();
  }, []);

  return (
    <div className="min-h-screen w-full bg-white text-black flex">
      <SideNavbar />
      <div className="flex flex-col gap-5 w-full p-8">
        <PageTitle title="Contact Us Response" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 lg:p-5">
          {queries.map((query) => (
            <div
              key={query.id}
              className="w-full bg-gray-100 p-4 rounded-md shadow-md"
            >
              <div className="flex justify-between items-center">
                <p className="font-bold">{query.name}</p>
                <p className="text-xs">
                  {moment
                    .unix(query.timestamp.seconds)
                    .format("D MMMM YYYY, h:mm A")}
                </p>
              </div>
              <div className="flex flex-col gap-1 pt-3 py-1">
                <p>Email: {query.email}</p>
                <p>Phone: {query.number}</p>
                <p>Message: {query.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
