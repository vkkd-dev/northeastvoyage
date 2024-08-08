"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import MobileNavbar from "@/components/MobileNavbar";
import Navbar from "@/components/Navbar";
import TripCard from "@/components/TripCard";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoTime } from "react-icons/io5";
import { ImSpinner2 } from "react-icons/im";
import { firestore } from "@/app/firebase/firebase-cofig";
import { useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { useMediaQuery } from "react-responsive";
import { BiSolidPhoneCall } from "react-icons/bi";
import { IoCheckmarkCircle } from "react-icons/io5";
import TripFooter from "@/components/TripFooter";
import InclusionCard from "@/components/InclusionCard";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

interface Trip {
  id: string;
  name: string;
  city: string;
  price: string;
  duration: string;
  coverImage: string;
  image: string;
  pdf: string;
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

const inclusion = ["Meals", "Stays", "Transportation"];

const TripPage = () => {
  // const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [tripData, setTripData] = useState<Trip | null>(null);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [nav, setNav] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<number | "all">("all");
  const [isTripLoading, setIsTripLoading] = useState(true);
  const [isTripsLoading, setIsTripsLoading] = useState(true);
  const [showFullText, setShowFullText] = useState(false);
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const openNavbar = () => setNav(true);
  const closeNavbar = () => setNav(false);

  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      setIsTripLoading(true);

      const fetchTripData = async () => {
        try {
          const docRef = doc(firestore, "trips", id as string);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setTripData({ id: docSnap.id, ...docSnap.data() } as Trip);
          } else {
            console.error("No such document!");
          }
        } catch (error) {
          console.error("Error fetching document:", error);
        } finally {
          setIsTripLoading(false);
        }
      };

      fetchTripData();
    }
  }, [id]);

  useEffect(() => {
    const fetchTrips = async () => {
      setIsTripsLoading(true);

      try {
        const tripsCollection = collection(firestore, "trips");
        const querySnapshot = await getDocs(tripsCollection);

        const trips: any = [];
        querySnapshot.forEach((doc) => {
          trips.push({ id: doc.id, ...doc.data() });
        });

        setTrips(trips);
      } catch (error) {
        console.error("Error fetching hero image:", error);
      } finally {
        setIsTripsLoading(false);
      }
    };
    fetchTrips();
  }, []);

  const handleMonthChange = (value: string) => {
    setSelectedMonth(value === "all" ? "all" : parseInt(value));
  };

  const uniqueMonths = useMemo(() => {
    const monthsSet = new Set<number>();
    tripData?.selectedDates?.forEach((timestamp: any) => {
      const date = timestamp.toDate();
      monthsSet.add(date.getMonth() + 1);
    });
    return Array.from(monthsSet).sort((a, b) => a - b);
  }, [tripData?.selectedDates]);

  const renderDates = () => {
    return (
      <div className="flex overflow-x-auto gap-2">
        {tripData?.selectedDates
          .filter((timestamp: any) => {
            if (selectedMonth === "all") return true;
            const date = timestamp.toDate();
            return date.getMonth() + 1 === selectedMonth;
          })
          .map((timestamp: any) => {
            const date = timestamp.toDate();
            const monthName = format(date, "MMM"); // Short month name
            const day = format(date, "d");

            return (
              <div
                key={date.getTime()}
                className="flex flex-col items-center gap-1 bg-primary rounded-lg py-1 text-center w-12 lg:w-16"
              >
                <span className="text-sm font-semibold text-white">
                  {monthName}
                </span>
                <span className="text-sm font-semibold bg-white w-10 lg:w-14 rounded-ee-md rounded-es-md">
                  {day}
                </span>
              </div>
            );
          })}
      </div>
    );
  };

  const handleWhatsapp = () => {
    window.open("https://wa.link/fmnp8k");
  };

  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  const handleCall = () => {
    window.location.href = "tel:+918099451325";
  };

  const handleDownload = async () => {
    // Check if tripData and its pdf property are available
    if (!tripData || !tripData.pdf) {
      toast({
        description: "No PDF available for download.",
        className: "bg-primary text-white font-bold",
      });
      return;
    }
    console.log("tripData.pdf", tripData.pdf);

    try {
      window.open(tripData.pdf, "_blank");
    } catch (error) {
      console.error("Error downloading PDF:", error);
      toast({
        description: "Failed to download the PDF.",
        variant: "destructive",
      });
    }
  };

  const formatPrice = (price: string): string => {
    // Convert the price to a number and format it with commas
    const number = parseFloat(price.replace(/[^0-9.]/g, "")); // Remove non-numeric characters except '.'
    if (isNaN(number)) return "₹ 0";

    // Format the number with commas and the ₹ symbol
    const formattedPrice = number.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0, // Customize as needed
      maximumFractionDigits: 0, // Customize as needed
    });

    return formattedPrice;
  };

  if (!tripData) {
    return (
      <div className="flex justify-center items-center mt-4">
        <ImSpinner2
          height={24}
          width={24}
          className="animate-spin self-center text-center mt-4"
        />
      </div>
    );
  }

  return (
    <>
      <Navbar nav={nav} openNav={openNavbar} />
      <MobileNavbar nav={nav} closeNav={closeNavbar} />

      <div className="flex flex-col h-[37vh] lg:h-[66vh]">
        <div className="relative w-full h-[75vh] lg:h-full overflow-hidden">
          <Image
            src={tripData.image}
            alt={tripData.name}
            layout="fill"
            objectFit="none"
            priority
          />
        </div>
      </div>

      {/* Floating WhatsApp */}
      <Image
        width={75}
        height={75}
        src={"/whatsapp.png"}
        alt="whatsapp"
        className="fixed right-3 lg:right-16 bottom-28 lg:bottom-32 z-50 cursor-pointer"
        onClick={handleWhatsapp}
      />

      {/* Floating Navbar */}
      <div className="fixed w-full bottom-0 z-50 shadow-2xl shadow-black">
        <div className="flex justify-between bg-white px-7 lg:px-32 py-4 lg:py-7 rounded-ss-3xl rounded-se-3xl shadow-2xl shadow-black">
          <div className="flex flex-col gap-1">
            <span className="tracking-wider font-bold text-xs lg:text-sm">
              Starting From
            </span>
            <div className="text-2xl font-extrabold text-primary">
              {formatPrice(tripData.price)}
            </div>
          </div>
          <div
            className="flex items-center gap-1 bg-secondary self-center px-5 py-3 rounded-full text-white font-bold cursor-pointer"
            onClick={handleCall}
          >
            <BiSolidPhoneCall size={20} />
            Call Now
          </div>
        </div>
      </div>

      <div className="p-3 lg:px-32 lg:mt-4">
        <h2 className="text-2xl font-bold">{tripData.name}</h2>

        {/* Details */}
        <div className="flex flex-col gap-2 mt-4">
          <h2>Details</h2>
          <p className="text-sm flex items-center gap-1">
            <FaLocationDot className="text-secondary" />
            {tripData.city}
          </p>
          <p className="text-sm flex items-center gap-1">
            <IoTime className="text-secondary" />
            {tripData.duration}
          </p>
        </div>

        {/* Inclusion */}
        <div className="flex flex-col gap-3 mt-4">
          <h2 className="text-md">Inclusion</h2>
          <div className="flex gap-1 lg:gap-2">
            {inclusion.map((inclusion: any, index: any) => (
              <InclusionCard key={index} inclusion={inclusion} />
            ))}
          </div>
        </div>

        {/* Overview */}
        <div className="flex flex-col pt-6">
          <h2 className="font-extrabold text-lg lg:text-xl mb-2">Overview</h2>
          {isDesktop || showFullText
            ? tripData.overview
            : `${tripData.overview.substring(0, 210)}...`}
          {!isDesktop && (
            <span onClick={toggleText} className="text-primary cursor-pointer">
              {showFullText ? "Read less" : "Read more"}
            </span>
          )}
          {/* <p>{tripData.overview}</p>
          <span className="text-secondary font-bold">Show More</span> */}
        </div>

        {/* Itinerary */}
        <div className="pt-6">
          <h2 className="font-extrabold text-lg lg:text-xl">Itinerary</h2>
          <Accordion type="single" collapsible>
            {tripData.itinerary?.map((item: any, index: any) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-start">
                  <div className="flex items-center gap-5">
                    <div className="flex flex-col items-center justify-center bg-[#0DB295] text-white w-11 h-11 rounded-lg">
                      <span className="text-xs">{index + 1}</span>
                      <span className="text-xs">Day</span>
                    </div>
                    <div className="max-w-[275px] lg:max-w-[500px]">
                      {item.title}
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-3 mt-3">
                  {item.items?.map((detail: any, i: any) => (
                    <div className="flex gap-4" key={i}>
                      <div className="flex-shrink-0 w-5 h-5">
                        <Image
                          width={20}
                          height={20}
                          src={"/tick-circle-solid.svg"}
                          alt="tick"
                        />
                      </div>
                      <div>{detail}</div>
                    </div>
                  ))}
                  {item.images && (
                    <div className="flex gap-5 py-5 overflow-x-auto">
                      {item.images?.map((image: any, imgIndex: any) => (
                        <Image
                          width={175}
                          height={175}
                          key={imgIndex}
                          src={image}
                          alt={`itinerary image ${imgIndex + 1}`}
                          className="rounded-xl flex-shrink-0"
                        />
                      ))}
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Download */}
        <div className="flex justify-center mt-4 lg:mt-6">
          <div
            className="border-primary border-2 py-2 px-5 rounded-full cursor-pointer"
            onClick={handleDownload}
          >
            Download Itinerary
          </div>
        </div>

        {/* Inclusions */}
        <div className="flex flex-col pt-6 gap-2">
          {tripData.inclusions &&
            tripData.inclusions.some(
              (inclusion) => inclusion.trim() !== ""
            ) && (
              <>
                <h2 className="font-extrabold text-lg lg:text-xl mb-2">
                  Inclusions
                </h2>
                {tripData.inclusions.map(
                  (inclusion, index) =>
                    inclusion.trim() !== "" && (
                      <div className="flex gap-2 items-start" key={index}>
                        <div className="flex-shrink-0 w-5 h-5">
                          <Image
                            width={16}
                            height={16}
                            src={"/tick-circle-solid.svg"}
                            alt="tick"
                            className="mt-1"
                          />
                        </div>
                        <p className="text-sm lg:text-base">{inclusion}</p>
                      </div>
                    )
                )}
              </>
            )}
        </div>

        {/* Exclusions */}
        <div className="flex flex-col pt-6 gap-2">
          {tripData.exclusions &&
            tripData.exclusions.some(
              (exclusion) => exclusion.trim() !== ""
            ) && (
              <>
                <h2 className="font-extrabold text-lg lg:text-xl mb-2">
                  Exclusions
                </h2>
                {tripData.exclusions.map(
                  (exclusion, index) =>
                    exclusion.trim() !== "" && (
                      <div className="flex gap-2" key={index}>
                        <div className="flex-shrink-0 w-5 h-5">
                          <Image
                            width={16}
                            height={16}
                            src={"/cross-circle-solid.svg"}
                            alt="cross"
                            className="mt-1"
                          />
                        </div>
                        <p className="text-sm lg:text-base">{exclusion}</p>
                      </div>
                    )
                )}
              </>
            )}
        </div>

        {/* Customize */}
        {tripData.tripType === "customize" && (
          <div className="mt-8">
            <h2 className="font-bold text-lg lg:text-xl mb-4">Price List (Per person)</h2>
            <table className="min-w-full border-collapse border-primary border-2 text-sm rounded-sm">
              <thead>
                <tr className="text-center">
                  <th
                    className="border-2 p-2 border-primary"
                    style={{ width: "50%" }}
                  >
                    No. of people
                  </th>
                  <th
                    className="border-2 p-2 border-primary"
                    style={{ width: "25%" }}
                  >
                    Standard Hotel/Homestay
                  </th>
                  <th
                    className="border-2 p-2 border-primary"
                    style={{ width: "25%" }}
                  >
                    Deluxe Hotel
                  </th>
                </tr>
              </thead>
              <tbody>
                {tripData.priceList?.map((priceItem: any, index: any) => (
                  <tr key={index} className="text-center">
                    <td className="border-2 p-2 border-primary">
                      {priceItem.people}
                    </td>
                    <td className="border-2 p-2 border-primary">
                      {priceItem.standard}
                    </td>
                    <td className="border-2 p-2 border-primary">
                      {priceItem.deluxe}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Public */}
        {tripData.tripType === "public" && (
          <div className="mt-10">
            <h2 className="text-lg lg:text-xl font-bold mb-6">
              Upcoming Dates
            </h2>
            <Select
              value={selectedMonth.toString()}
              onValueChange={handleMonthChange}
            >
              <div className="w-24 lg:w-28">
                <SelectTrigger className="mb-6 py-1 px-4 border rounded bg-primary text-white font-semibold">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
              </div>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {uniqueMonths.map((month) => (
                  <SelectItem key={month} value={month.toString()}>
                    {format(new Date(2020, month - 1, 1), "MMM")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {renderDates()}
          </div>
        )}

        {/* FAQs */}
        <div className="mt-10">
          {tripData.faqs &&
            tripData.faqs.some(
              (faq: any) =>
                faq.question.trim() !== "" && faq.answer.trim() !== ""
            ) && (
              <>
                <h2 className="font-bold text-lg lg:text-xl">FAQs</h2>
                <Accordion type="single" collapsible>
                  {tripData.faqs.map(
                    (faq: any, index: any) =>
                      faq.question.trim() !== "" &&
                      faq.answer.trim() !== "" && (
                        <AccordionItem key={index} value={`item-${index}`}>
                          <AccordionTrigger className="text-start font-semibold">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent>
                            <p className="font-medium">{faq.answer}</p>
                          </AccordionContent>
                        </AccordionItem>
                      )
                  )}
                </Accordion>
              </>
            )}
        </div>

        <h1 className="mt-10 font-semibold text-lg lg:text-xl">
          Similar Trips
        </h1>
        {isTripsLoading && (
          <div className="flex justify-center items-center mt-4">
            <ImSpinner2
              height={24}
              width={24}
              className="animate-spin self-center text-center mt-4"
            />
          </div>
        )}
        {trips.length === 0 && !isTripsLoading && (
          <h1 className="text-center">No trips found.</h1>
        )}
        {!isTripsLoading && (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            {trips.map((trip, index) => (
              <TripCard key={index} trip={trip} />
            ))}
          </div>
        )}
      </div>

      <TripFooter />
    </>
  );
};

export default TripPage;
