"use client";

import { firestore } from "@/app/firebase/firebase-cofig";
import PageTitle from "@/components/PageTitle";
import SideNavbar from "@/components/SideNavbar";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

interface Query {
  id: string;
  name: string;
  email: string;
  phone: string;
  timestamp: string;
}

const QueriesPage = () => {
  const [queries, setQueries] = useState<Query[]>([]);

  useEffect(() => {
    const fetchQueries = async () => {
      const querySnapshot = await getDocs(collection(firestore, "queries"));
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
        <PageTitle title="User Queries" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 lg:p-5">
          {queries.map((query) => (
            <div
              key={query.id}
              className="w-full bg-gray-100 p-4 rounded-md shadow-md"
            >
              <div className="flex justify-between items-center">
                <p className="font-bold">{query.name}</p>
                <p className="text-xs">
                  {new Date(query.timestamp).toLocaleString()}
                </p>
              </div>
              <div className="flex flex-col gap-1 pt-3 py-1">
                <p>Email: {query.email}</p>
                <p>Phone: {query.phone}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QueriesPage;
