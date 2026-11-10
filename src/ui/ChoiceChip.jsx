import { HiOutlineSparkles } from "react-icons/hi";

export default function ChoiceChip({
  label, // متن داخل دکمه
  isActive = false, // آیا انتخاب شده است؟ (true / false)
  onClick, // تابع کلیک
  variant = "outline", // مدل استایل هنگام انتخاب: "outline" (هدر) | "solid" (مودال)
  showSparkle = false, // نمایش آیکون ستاره هنگام فعال بودن (مخصوص FilterBar)
  showDot = false, // نمایش نقطه کوچک کنار متن (مخصوص لیست همه شهرها)
  icon: Icon, // آیکون سفارشی (اختیاری)
  fullWidth = false, // آیا عرض کامل بگیرد؟ (مخصوص گرید شهرها)
  className = "", // برای هرگونه استایل اضافه از بیرون
  needTik = false,
}) {
  // استایل‌های پایه که بین همه مشترک است
  const baseStyles =
    "px-4 py-2 border rounded-full text-sm transition-all duration-200 flex items-center gap-x-2 select-none cursor-pointer";

  // مدیریت عرض و ترازبندی (برای حالت عادی در برابر حالت گرید شهرها)
  const layoutStyles = fullWidth
    ? "w-full justify-between"
    : "shrink-0 justify-center snap-start";

  // استایل‌های وضعیت فعال و غیرفعال بر اساس variant
  const stateStyles = isActive
    ? variant === "solid"
      ? "bg-primary border-primary text-white font-PeydaBold shadow-sm" // مثل عکس مودال (آبی پررنگ)
      : "bg-primary/10 border-primary text-primary font-PeydaBlack" // مثل FilterBar (آبی ملایم)
    : "bg-card border-border/80 text-main font-SansMedium hover:bg-hover hover:border-border";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseStyles} ${layoutStyles} ${stateStyles} ${className}`}
    >
      <div className="flex items-center gap-x-1.5">
        {/* نقطه کوچک برای لیست شهرها در پاپ‌آپ مقصد */}
        {showDot && (
          <span
            className={`w-2 h-2 rounded-full transition-colors ${
              isActive ? "bg-primary" : "bg-border"
            }`}
          />
        )}
        {/* آیکون ستاره برای فیلترهای سریع */}
        {isActive && showSparkle && (
          <HiOutlineSparkles className="text-[16px] shrink-0 text-primary" />
        )}

        {/* آیکون دلخواه اگر پاس داده شده باشد */}
        {Icon && <Icon className=" shrink-0 text-xl text-muted" />}

        <span>{label}</span>
        {isActive && needTik && (
          <span className="text-primary text-xs font-SansDemiBold">✓</span>
        )}
      </div>
    </button>
  );
}
