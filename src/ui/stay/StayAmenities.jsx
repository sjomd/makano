import {
  HiOutlineSparkles,
  HiChevronLeft,
  HiOutlineWifi,
  HiOutlineShieldCheck,
  HiOutlineFire,
  HiOutlineHome,
  HiOutlineCheckCircle,
  HiOutlineDesktopComputer,
  HiOutlineStatusOnline,
} from "react-icons/hi";

// ۱. تابع هوشمند تشخیص آیکون و استایل بر اساس نام ویژگی (قابل توسعه)
const getAmenityMeta = (name = "") => {
  if (name.includes("استخر") || name.includes("جکوزی")) {
    return { icon: HiOutlineSparkles, isHighlight: true, label: "ویژگی ممتاز" };
  }
  if (name.includes("پوشش شبکه") || name.includes("آنتن")) {
    return {
      icon: HiOutlineStatusOnline,
      isHighlight: false,
      label: "ارتباطات",
    };
  }
  if (name.includes("وای‌فای") || name.includes("اینترنت")) {
    return { icon: HiOutlineWifi, isHighlight: false, label: "ارتباطات" };
  }
  if (
    name.includes("تهویه") ||
    name.includes("سرمایش") ||
    name.includes("گرمایش") ||
    name.includes("شومینه")
  ) {
    return { icon: HiOutlineFire, isHighlight: false, label: "تاسیسات" };
  }
  if (name.includes("تلویزیون") || name.includes("صوتی")) {
    return {
      icon: HiOutlineDesktopComputer,
      isHighlight: false,
      label: "رسانه",
    };
  }
  if (
    name.includes("نگهبانی") ||
    name.includes("امنیت") ||
    name.includes("پارکینگ")
  ) {
    return {
      icon: HiOutlineShieldCheck,
      isHighlight: false,
      label: "امنیت و رفاه",
    };
  }
  if (
    name.includes("سرویس") ||
    name.includes("آشپزخانه") ||
    name.includes("مبلمان")
  ) {
    return { icon: HiOutlineHome, isHighlight: false, label: "امکانات داخلی" };
  }
  return {
    icon: HiOutlineCheckCircle,
    isHighlight: false,
    label: "امکانات رفاهی",
  };
};

const DEFAULT_AMENITIES = [
  "استخر",
  "سیستم تهویه هوا",
  "پوشش شبکه موبایل",
  "سرویس بهداشتی ایرانی",
  "اینترنت وای‌فای",
  "پارکینگ اختصاصی",
];

export default function StayAmenities({ amenities = DEFAULT_AMENITIES }) {
  return (
    <section className="bg-card border border-border rounded-[28px] p-6 sm:p-7 shadow-lg">
      {/* هدر سکشن */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-base sm:text-lg font-PeydaBold text-main">
            امکانات و خدمات رفاهی
          </h2>
          <span className="text-[11px] text-muted font-PeydaLight">
            تجهیزات فراهم شده برای اقامت شما
          </span>
        </div>

        <button
          type="button"
          className="border border-border bg-base hover:border-primary/50 text-main text-xs font-PeydaMedium px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-x-1"
        >
          <span>مشاهده همه ({amenities.length})</span>
          <HiChevronLeft className="text-sm" />
        </button>
      </div>

      {/* گرید کارت‌های امکانات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
        {amenities.map((item, idx) => {
          const { icon: Icon, isHighlight, label } = getAmenityMeta(item);

          return (
            <div
              key={idx}
              className={`group relative overflow-hidden rounded-2xl p-3.5 flex items-center justify-between border transition-all duration-300 hover:-translate-y-0.5 ${
                isHighlight
                  ? "bg-primary/5 border-primary/30 hover:border-primary/60"
                  : "bg-base border-border hover:border-primary/30"
              }`}
            >
              {/* سمت راست: آیکون باکس + عنوان و زیرعنوان */}
              <div className="flex items-center gap-x-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                    isHighlight
                      ? "bg-primary text-white shadow-md shadow-primary/25"
                      : "bg-card border border-border text-primary"
                  }`}
                >
                  <Icon className="text-xl" />
                </div>

                <div className="flex flex-col items-start">
                  <span className="text-xs sm:text-sm font-PeydaBold text-main">
                    {item}
                  </span>
                  <span className="text-[10px] text-muted font-PeydaLight mt-0.5">
                    {label}
                  </span>
                </div>
              </div>

              {/* سمت چپ: بج یا نشانگر وضعیت */}
              {isHighlight ? (
                <span className="text-[9px] font-PeydaBold bg-primary/15 text-primary px-2 py-0.5 rounded-full">
                  ویژه
                </span>
              ) : (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/60 group-hover:bg-emerald-400 transition-colors ml-1" />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
