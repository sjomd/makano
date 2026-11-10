import useAuth from "@/hooks/auth/useAuth";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router";

export default function FavoriteButton({
  isFavorite = false,
  onToggle,
  variant = "icon", // "icon" | "pill"
  isLoading = false,
  className = "",
}) {
  const { user, isLoading: isLogin } = useAuth();
  const isDisabled = isLoading || isLogin;
  const navigate = useNavigate();
  const location = useLocation();
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation(); // جلوگیری از باز شدن لینک کارت هنگام کلیک روی قلب
    if (!user) {
      navigate("/login", {
        state: { from: location },
      });
      return;
    }

    if (!isLoading) onToggle?.();
  };

  // اگر از بیرون کلاس absolute پاس داده شد، دیگر relative نگذاریم تا تداخل نکند
  const positionClass = className.includes("absolute") ? "" : "relative";

  // مرکز باز شدن دایره: در حالت آیکونی وسط (50%) و در حالت متنی دقیقاً روی آیکون قلب در راست
  const originX = variant === "icon" ? "50%" : "calc(100% - 22px)";
  const clipPathValue = isFavorite
    ? `circle(150% at ${originX} 50%)`
    : `circle(0% at ${originX} 50%)`;

  const sizeStyles =
    variant === "icon"
      ? "w-10 h-10 rounded-full backdrop-blur-md"
      : "w-[125px] px-4 py-2 rounded-2xl gap-x-2 text-xs font-PeydaMedium";

  const borderStyles = isFavorite
    ? "border-rose-500/60 shadow-lg shadow-rose-500/30"
    : variant === "icon"
      ? "bg-black/40 border-white/20 hover:bg-black/60"
      : "bg-card border-border hover:border-rose-500/40";

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={handleClick}
      aria-label="افزودن به علاقه‌مندی‌ها"
      className={`group ${positionClass} overflow-hidden inline-flex items-center justify-center border transition-all duration-700 active:scale-90 cursor-pointer select-none disabled:opacity-50 ${sizeStyles} ${borderStyles} ${className}`}
    >
      {/* ۱. موج صورتی آرام از مرکز قلب (700ms) */}
      <span
        style={{ clipPath: clipPathValue }}
        className="absolute inset-0 bg-linear-to-tr from-rose-600 via-rose-500 to-pink-500 transition-[clip-path] duration-700 ease-in-out pointer-events-none"
      />

      {/* ۲. آیکون قلب با تغییر نرم (Cross-fade) */}
      <span className="relative z-10 w-5 h-5 flex items-center justify-center">
        <HiOutlineHeart
          className={`absolute text-lg transition-all duration-500 ${
            isFavorite
              ? "opacity-0 scale-50"
              : "opacity-100 scale-100 group-hover:scale-110"
          } ${variant === "icon" ? "text-white group-hover:text-rose-400" : "text-muted group-hover:text-rose-400"}`}
        />
        <HiHeart
          className={`absolute text-lg text-white transition-all duration-500 ${
            isFavorite ? "opacity-100 scale-115" : "opacity-0 scale-50"
          }`}
        />
      </span>

      {/* ۳. متن دکمه در حالت کپسولی (تغییر رنگ هماهنگ با موج) */}
      {variant === "pill" && (
        <span
          className={`relative z-10 transition-colors duration-700 ease-in-out ${
            isFavorite
              ? "text-white font-PeydaBold"
              : "text-muted group-hover:text-main"
          }`}
        >
          {isFavorite ? "ذخیره شده" : "ذخیره کردن"}
        </span>
      )}
    </button>
  );
}
