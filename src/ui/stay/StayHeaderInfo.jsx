import {
  HiStar,
  HiOutlineLocationMarker,
  HiOutlineShare,
  HiOutlineUsers,
  HiOutlineHome,
  HiOutlineSparkles,
} from "react-icons/hi";
import { BiArea } from "react-icons/bi";
import NeonSpinner from "../NeonSpinner";
import FavoriteButton from "../FavoriteButton";
import useFavorite from "@/hooks/favorite/useFavorite";
import useToggleFavorite from "@/hooks/favorite/useToggleFavorite";

export default function StayHeaderInfo({ data, isLoading }) {
  const { favoriteIds } = useFavorite();
  const { toggleFavorite, isPending } = useToggleFavorite(data?.id);
  const isFavorite = favoriteIds.has(data?.id);
  if (isLoading) return <NeonSpinner />;

  const {
    title,
    rating = 4.8,
    reviews_count = 12,
    cities,
    neighborhood,
    capacity,
    max_capacity,
    rooms_count,
    area_size,
    property_types,
    region_types,
    code,
  } = data;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("لینک اقامتگاه کپی شد!");
    }
  };

  return (
    <div className="w-full border-b border-white/10 pb-6 mb-6">
      {/* ردیف بالا: عنوان و دکمه‌های عملیاتی */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-x-2 mb-2">
            {property_types?.name && (
              <span className="bg-primary/15 text-primary text-xs font-PeydaMedium px-2.5 py-1 rounded-lg">
                {property_types.name}
              </span>
            )}
            {code && (
              <span className="text-muted text-xs font-PeydaRegular bg-white/5 px-2.5 py-1 rounded-lg">
                کد: {code}
              </span>
            )}
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-PeydaBold text-main">
            {title}
          </h1>
        </div>

        {/* دکمه‌های ذخیره و اشتراک‌گذاری */}
        <div className="flex items-center gap-x-2 self-end sm:self-auto">
          <button
            onClick={handleShare}
            className="flex items-center gap-x-1.5 bg-card hover:bg-black/20 dark:hover:bg-white/10 text-main text-xs sm:text-sm font-PeydaMedium px-3.5 py-2.5 rounded-xl border border-white/10 transition-colors cursor-pointer"
          >
            <HiOutlineShare className="text-lg" />
            <span>اشتراک‌گذاری</span>
          </button>
          <FavoriteButton
            className="flex items-center gap-x-1.5 bg-card hover:bg-black/20 dark:hover:bg-white/10 text-main text-xs sm:text-sm font-PeydaMedium px-3.5 py-2.5 rounded-xl border border-white/10 transition-colors cursor-pointer"
            variant="pill"
            isLoading={isPending}
            onToggle={toggleFavorite}
            isFavorite={isFavorite}
          />
        </div>
      </div>

      {/* ردیف میانی: موقعیت مکانی و امتیاز */}
      <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-sm text-muted mb-6">
        <div className="flex items-center gap-x-1.5 text-white">
          <HiStar className="text-yellow-400 text-lg" />
          <span className="font-PeydaBold text-main">{rating}</span>
          <span className="text-muted text-xs">({reviews_count} دیدگاه)</span>
        </div>

        <div className="flex items-center gap-x-1.5">
          <HiOutlineLocationMarker className="text-primary text-lg" />
          <span>
            {cities?.name} {neighborhood ? `، ${neighborhood} ` : ""}
          </span>
        </div>
      </div>

      {/* ردیف پایین: کارت‌های ویژگی کلیدی (Quick Specs) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-card/60 border border-white/5 rounded-2xl p-3.5 flex items-center gap-x-3">
          <div className="bg-primary/10 text-primary p-2.5 rounded-xl">
            <HiOutlineUsers className="text-xl" />
          </div>
          <div className="flex flex-col gap-y-1.5">
            <p className="text-xs text-muted mb-0.5">ظرفیت</p>
            <p className="text-sm font-PeydaBold text-main">
              {capacity} نفر {max_capacity ? `(تا ${max_capacity} نفر)` : ""}
            </p>
          </div>
        </div>
        <div className="bg-card/60 border border-white/5 rounded-2xl p-3.5 flex items-center gap-x-3">
          <div className="bg-primary/10 text-primary p-2.5 rounded-xl">
            <HiOutlineHome className="text-xl" />
          </div>
          <div className="flex flex-col gap-y-1.5">
            <p className="text-xs text-muted mb-0.5">تعداد اتاق</p>
            <p className="text-sm font-PeydaBold text-main">
              {rooms_count > 0 ? `${rooms_count} خوابه` : "بدون اتاق خواب"}
            </p>
          </div>
        </div>

        <div className="bg-card/60 border border-white/5 rounded-2xl p-3.5 flex items-center gap-x-3">
          <div className="bg-primary/10 text-primary p-2.5 rounded-xl">
            <BiArea className="text-xl" />
          </div>
          <div className="flex flex-col gap-y-1.5">
            <p className="text-xs text-muted mb-0.5">متراژ زیربنا</p>
            <p className="text-sm font-PeydaBold text-main">
              {area_size ? `${area_size} متر` : "ثبت نشده"}
            </p>
          </div>
        </div>

        <div className="bg-card/60 border border-white/5 rounded-2xl p-3.5 flex items-center gap-x-3">
          <div className="bg-primary/10 text-primary p-2.5 rounded-xl">
            <HiOutlineSparkles className="text-xl" />
          </div>
          <div className="flex flex-col gap-y-1.5">
            <p className="text-xs text-muted mb-0.5">منطقه</p>
            <p className="text-sm font-PeydaBold text-main">
              {region_types?.name || "شهری"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
