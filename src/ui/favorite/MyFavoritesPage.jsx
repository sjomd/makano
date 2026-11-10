import { Link } from "react-router";
import { HiOutlineHeart, HiArrowLeft } from "react-icons/hi";
import StayCard from "@/ui/SatyCard"; // مسیر کامپوننت کارت اقامتگاه

import NeonSpinner from "../NeonSpinner";
import useFavoriteStays from "@/hooks/favorite/usefavoriteStays";

export default function MyFavoritesPage() {
  const { favoriteStays, isLoading } = useFavoriteStays();

  if (isLoading) return <NeonSpinner />;
  return (
    <div className="space-y-6">
      {/* هدر صفحه علاقه‌مندی‌ها */}
      <div className="flex items-center justify-between pb-5 border-b border-border">
        <div>
          <h1 className="text-[16px] sm:text-lg font-PeydaBold text-main">
            علاقه‌مندی‌ها
          </h1>
          <p className="text-xs text-muted font-PeydaLight mt-1">
            اقامتگاه‌هایی که ذخیره کرده‌اید تا بعداً بررسی یا رزرو کنید
          </p>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-PeydaBold bg-rose-500/10 text-rose-400 border border-rose-500/20">
          {favoriteStays.length} اقامتگاه
        </span>
      </div>

      {/* گرید نمایش کارت‌ها یا حالت خالی */}
      {favoriteStays.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
          {favoriteStays.map((favorite) => (
            <StayCard key={favorite.id} {...favorite} />
          ))}
        </div>
      ) : (
        <div className="bg-base/60 border border-border border-dashed rounded-3xl py-16 px-4 flex flex-col items-center justify-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-3">
            <HiOutlineHeart className="text-2xl" />
          </div>
          <h3 className="text-sm font-PeydaBold text-main mb-1">
            هیچ اقامتگاهی در لیست علاقه‌مندی‌های شما نیست!
          </h3>
          <p className="text-xs text-muted font-PeydaLight max-w-xs mb-5 leading-5">
            با کلیک روی آیکون قلب روی هر ویلا، آن را به لیست علاقه‌مندی‌های خود
            اضافه کنید.
          </p>
          <Link
            to="/stays"
            className="bg-primary hover:bg-primary-hover text-white text-xs font-PeydaBold px-5 py-2.5 rounded-xl flex items-center gap-x-1.5 shadow-lg shadow-primary/25 transition-all"
          >
            <span>مشاهده اقامتگاه‌ها</span>
            <HiArrowLeft className="text-xs" />
          </Link>
        </div>
      )}
    </div>
  );
}
