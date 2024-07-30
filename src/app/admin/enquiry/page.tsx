"use client";

import { firestore } from "@/app/firebase/firebase-cofig";
import PageTitle from "@/components/PageTitle";
import SideNavbar from "@/components/SideNavbar";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";

interface Query {
  id: string;
  name: string;
  number: string;
  email: string;
  people: string;
  month: string;
  type: string;
  timestamp: string;
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 p-5">
          {queries.map((query) => (
            <div
              key={query.id}
              className="w-full bg-gray-100 p-4 rounded-md shadow-md"
            >
              <p className="font-bold my-1">{query.name}</p>
              <div className="flex flex-col gap-1 p-2">
                <p>
                  <span className="text-slate-500">Phone:</span> {query.number}
                </p>
                <p>
                  <span className="text-slate-500">Email:</span> {query.email}
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnquiryForm;
