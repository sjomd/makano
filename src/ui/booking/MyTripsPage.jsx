import { useMemo, useState } from "react";
import { Link } from "react-router";
import { HiOutlineBriefcase, HiArrowLeft } from "react-icons/hi";

import TripsFilterBar from "./TripsFilterBar";
import TripCard from "./TripCard";
import { useGetUserBookings } from "./useGetUserBookings";
import NeonSpinner from "../NeonSpinner";

export default function MyTripsPage({ user }) {
  const [activeTab, setActiveTab] = useState("active");
  console.log(user);

  const { userBookings, isLoading } = useGetUserBookings(user.id);
  const trips = userBookings?.length > 0 ? userBookings : [];

  const counts = useMemo(() => {
    return trips.reduce(
      (acc, trip) => {
        trip.isPast ? (acc.past += 1) : (acc.active += 1);
        return acc;
      },
      { active: 0, past: 0 },
    );
  }, [trips]);
  // ۲. فیلتر کردن لیست بر اساس تب فعال
  const filteredTrips = useMemo(() => {
    return trips.filter((trip) =>
      activeTab === "active" ? !trip.isPast : trip.isPast,
    );
  }, [trips, activeTab]);
  // if (isLoading) return <p>gg</p>;
  if (isLoading) return <NeonSpinner />;
  return (
    <div className="space-y-6">
      <TripsFilterBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        counts={counts}
      />

      {filteredTrips.length > 0 ? (
        <div className="space-y-4">
          {filteredTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      ) : (
        <div className="bg-base/60 border border-border border-dashed rounded-3xl py-14 px-4 flex flex-col items-center justify-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-3">
            <HiOutlineBriefcase className="text-2xl" />
          </div>
          <h3 className="text-sm font-PeydaBold text-main mb-1">
            {activeTab === "active"
              ? "در حال حاضر سفر فعالی ندارید!"
              : "هنوز سفری در تاریخچه شما ثبت نشده است"}
          </h3>
          <p className="text-xs text-muted font-PeydaLight max-w-xs mb-5 leading-5">
            از بین صدها ویلا و اقامتگاه لوکس، مقصد بعدی خود را انتخاب کنید.
          </p>
          <Link
            to="/stays"
            className="bg-primary hover:bg-primary-hover text-white text-xs font-PeydaBold px-5 py-2.5 rounded-xl flex items-center gap-x-1.5 shadow-lg shadow-primary/25 transition-all"
          >
            <span>جستجوی اقامتگاه</span>
            <HiArrowLeft className="text-xs" />
          </Link>
        </div>
      )}
    </div>
  );
}
