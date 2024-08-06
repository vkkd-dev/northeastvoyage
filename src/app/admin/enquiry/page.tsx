"use client";
import { useEffect, useState } from "react";
import { firestore } from "@/app/firebase/firebase-cofig";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import PageTitle from "@/components/PageTitle";
import SideNavbar from "@/components/SideNavbar";
import moment from "moment-timezone";

interface Query {
  id: string;
  name: string;
  number: string;
  email: string;
  place: string;
  message: string;
  people: string;
  month: string;
  type: string;
  timestamp: Timestamp;
}

const EnquiryForm = () => {
  const [queries, setQueries] = useState<Query[]>([]);

  useEffect(() => {
    const fetchQueries = async () => {
      const querySnapshot = await getDocs(
        collection(firestore, "contact_form")
      );
      const queriesData = querySnapshot.docs.map((doc) => {
        const data = doc.data() as Omit<Query, "id">; // Exclude the 'id' field
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
        <PageTitle title="Users Enquiry" />
        {queries.length === 0 && (
          <h2 className="flex justify-center items-center min-h-[90vh]">
            No responses yet
          </h2>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 lg:p-5">
          {queries.map((query) => (
            <div
              key={query.id}
              className="w-full bg-gray-100 p-5 rounded-md shadow-md"
            >
              <div className="flex justify-between items-center">
                <p className="font-bold">{query.name}</p>
                <p className="text-xs">
                  {moment
                    .unix(query.timestamp.seconds)
                    .format("D MMMM YYYY, h:mm A")}
                </p>
              </div>
              <div className="flex flex-col gap-1 lg:px-3 pt-3 lg:pt-5">
                <p>
                  <span className="text-slate-500">Phone:</span> {query.number}
                </p>
                <p>
                  <span className="text-slate-500">Email:</span> {query.email}
                </p>
                <p>
                  <span className="text-slate-500">Place:</span>{" "}
                  {query.place || "N/A"}
                </p>
                <p>
                  <span className="text-slate-500">People: </span>{" "}
                  {query.people}
                </p>
                <p>
                  <span className="text-slate-500">Month:</span> {query.month}
                </p>
                <p>
                  <span className="text-slate-500">Type:</span> {query.type}
                </p>
                <p>
                  <span className="text-slate-500">Message:</span>{" "}
                  {query.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnquiryForm;
