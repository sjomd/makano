import { HiOutlineLocationMarker, HiStar } from "react-icons/hi";
import { Link } from "react-router"; // یا "react-router-dom"
import { formatToman } from "../utils/helpers";
import FavoriteButton from "./FavoriteButton";
import useFavorite from "@/hooks/favorite/useFavorite";
import useToggleFavorite from "@/hooks/favorite/useToggleFavorite";
function StayCard({
  id,
  title,
  cities,
  neighborhood,
  capacity,
  rooms_count,
  price_per_night,
  discount,
  rating,
  cover_image,
}) {
  const { favoriteIds } = useFavorite();
  const { toggleFavorite, isPending } = useToggleFavorite(id);
  // محاسبه قیمت نهایی در صورت وجود تخفیف
  const finalPrice = discount
    ? price_per_night * (1 - discount / 100)
    : price_per_night;

  const isFavorite = favoriteIds.has(id);
  return (
    // block و w-full باعث می‌شوند کارت در موبایل عرض کامل بگیرد
    <Link
      to={`/stays/${id}`}
      className=" w-full h-full bg-card rounded-2xl overflow-hidden border border-border/50 shadow-sm hover:shadow-md transition-all flex flex-col relative group"
    >
      {/* بخش تصویر */}
      <div className="relative w-full aspect-4/3 overflow-hidden bg-base">
        <img
          src={cover_image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* دکمه لایک */}
        <FavoriteButton
          isLoading={isPending}
          isFavorite={isFavorite}
          onToggle={toggleFavorite}
          variant="icon"
          className="absolute top-3 left-3 z-10"
        />
        {/* برچسب تخفیف */}
        {discount > 0 && (
          <div className="absolute top-3 right-3 bg-red-500 text-white text-[11px] font-PeydaBlack px-2.5 py-1 rounded-lg z-10">
            {discount}٪ تخفیف
          </div>
        )}

        {/* امتیاز */}
        {rating && (
          <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-lg flex items-center gap-x-1 z-10">
            <span className="font-SansRegular">({rating})</span>
            <HiStar className="text-yellow-400" />
          </div>
        )}
      </div>
      {/* بخش اطلاعات */}
      <div className="p-4 flex flex-col grow">
        <h3 className="font-PeydaBlack main text-sm sm:text-base mb-2 line-clamp-1">
          {title}
        </h3>

        <div className="flex items-center gap-x-1 muted text-xs mb-1.5">
          <HiOutlineLocationMarker className="shrink-0" />
          <span className="font-SansRegular line-clamp-1">
            {cities?.name}، {neighborhood} | {rooms_count} اتاق خواب | تا{" "}
            {capacity} نفر
          </span>
        </div>
        {/* بخش قیمت (دیزاین و منطق خودت با استایل‌های اصلاح‌شده) */}
        <div className="mt-auto pt-4 flex flex-col items-end">
          <div className="flex items-baseline gap-x-2 w-full justify-between">
            <span className="text-[11px] muted font-SansRegular">هر شب از</span>

            <div className="flex items-baseline gap-x-2">
              <span
                className={`text-primary ${
                  discount
                    ? "line-through text-sm muted opacity-70 font-SansMedium"
                    : "font-PeydaBlack sm:text-lg"
                }`}
              >
                {formatToman(price_per_night)}
              </span>

              <div className="flex items-baseline gap-x-1">
                <span className="font-PeydaBlack text-primary sm:text-lg">
                  {discount > 0 && formatToman(finalPrice)}
                </span>
                <span className="text-[11px] font-SansRegular muted">
                  تومان
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
export default StayCard;
