"use client";

import BarChart from "@/components/BarChart";
import Card, { CardContent, CardProps } from "@/components/Card";
import PageTitle from "@/components/PageTitle";
import SideNavbar from "@/components/SideNavbar";
import BookingsCard, { BookingProps } from "@/components/BookingsCard";
import { User } from "lucide-react";
import { UserAuthForm } from "@/components/ui/user-auth-form";
import { useUser } from "@/context/AdminContext";
import Image from "next/image";

const cardData: CardProps[] = [
  {
    label: "Total Bookings",
    amount: "150",
    description: "+10% from last month",
    icon: User,
  },
  {
    label: "Total Revenue",
    amount: "₹25,000",
    description: "+8% from last month",
    icon: User,
  },
  {
    label: "Site Visitors",
    amount: "5,000",
    description: "+30% from last month",
    icon: User,
  },
  {
    label: "Active Tours",
    amount: "30",
    description: "+5% from last month",
    icon: User,
  },
];

const bookingsData: BookingProps[] = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    destination: "+₹1,999.00",
  },
  {
    name: "Jackson Lee",
    email: "isabella.nguyen@email.com",
    destination: "+₹1,999.00",
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    destination: "+₹39.00",
  },
  {
    name: "William Kim",
    email: "will@email.com",
    destination: "+₹299.00",
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    destination: "+₹39.00",
  },
];

export default function AdminPage() {
  const { isAdminLoggedIn, isLoading } = useUser();

  return (
    <div>
      {isLoading && <h1>Checking previous session...</h1>}

      {!isAdminLoggedIn && !isLoading && (
        <>
          <div className="container relative flex h-auto min-h-screen flex-col items-center justify-center lg:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
              <div className="absolute inset-0 bg-zinc-900" />
              <div className="relative z-20 flex items-center text-lg font-medium">
                Northeast Voyage
              </div>
              <div className="relative h-full flex justify-center items-center">
                <Image
                  src="/component.png"
                  width={300}
                  height={500}
                  alt="Authentication"
                />
              </div>
              <div className="relative z-20 mt-auto">
                <blockquote className="space-y-2">
                  <p className="text-lg text-center">Welcome back, Admin</p>
                </blockquote>
              </div>
            </div>
            <div className="p-6 lg:p-8 w-full">
              <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col space-y-2 text-center">
                  <h1 className="text-2xl font-semibold tracking-tight">
                    Admin Login
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Enter your email and password
                  </p>
                </div>
                <UserAuthForm />
                {/* <p className="px-8 text-center text-sm text-muted-foreground">
                By clicking continue, you agree to our{" "}
                <Link
                  href="/terms"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Privacy Policy
                </Link>
                .
              </p> */}
              </div>
            </div>
          </div>
        </>
      )}

      {isAdminLoggedIn && !isLoading && (
        <div className={"min-h-screen w-full bg-white text-black flex"}>
          <SideNavbar />
          <div className="flex flex-col gap-5 w-full p-8">
            <PageTitle title="Dashboard" />
            <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
              {cardData.map((data, index) => (
                <Card
                  key={index}
                  label={data.label}
                  amount={data.amount}
                  description={data.description}
                  icon={data.icon}
                />
              ))}
            </section>
            <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-2">
              <CardContent>
                <p className="p-4 font-semibold">Overview</p>
                <BarChart />
              </CardContent>
              <CardContent className="flex justify-between gap-4">
                <section>
                  <p>Recent Bookings</p>
                  <p className="text-sm text-gray-400">
                    You got 150 bookings this month
                  </p>
                </section>
                {bookingsData.map((booking, index) => (
                  <BookingsCard
                    key={index}
                    name={booking.name}
                    email={booking.email}
                    destination={booking.destination}
                  />
                ))}
              </CardContent>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}

export async function getStaticProps() {
  // Fetch any data needed for this page
  return {
    props: {}, // will be passed to the page component as props
  };
}

export async function getStaticPaths() {
  // Define all possible dynamic paths
  return {
    paths: [
      // Define paths you want to be statically generated
      { params: { slug: "admin" } },
    ],
    fallback: false, // can also be true or 'blocking'
  };
}
