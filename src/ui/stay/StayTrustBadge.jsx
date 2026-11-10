// import { HiOutlineLightningBolt, HiOutlineUserCheck } from "react-icons/hi";

export default function StayTrustBadge({ stay }) {
  // استخراج داده‌های واقعی یا مقادیر پیش‌فرض ایمن
  const responseTime = stay?.host_response_time || "کمتر از ۱۵ دقیقه";
  const successfulBookings = stay?.total_bookings || 14;

  return (
    <section className="bg-card border border-border rounded-[28px] p-5 sm:p-6 shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        {/* ویژگی ۱: عملکرد میزبان */}
        <div className="flex items-center gap-x-3.5 p-3 rounded-2xl bg-base border border-border/60">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            {/* <HiOutlineLightningBolt className="text-xl" /> */}
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-muted font-PeydaLight">
              سرعت پاسخگویی میزبان
            </span>
            <span className="text-xs sm:text-sm font-PeydaBold text-main">
              {responseTime}
            </span>
          </div>
        </div>

        {/* ویژگی ۲: اثبات اجتماعی (Social Proof) */}
        <div className="flex items-center gap-x-3.5 p-3 rounded-2xl bg-base border border-border/60">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
            {/* <HiOutlineUserCheck className="text-xl" /> */}
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-muted font-PeydaLight">
              میزان محبوبیت
            </span>
            <span className="text-xs sm:text-sm font-PeydaBold text-main">
              {successfulBookings} رزرو موفق اخیر
            </span>
          </div>
        </div>

        {/* ویژگی ۳: تضمین کیفیت و پلتفرم */}
        <div className="flex items-center gap-x-3.5 p-3 rounded-2xl bg-base border border-border/60">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
            {/* <HiOutlineShieldCheck className="text-xl" /> */}
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-muted font-PeydaLight">
              ضمانت مکانو
            </span>
            <span className="text-xs sm:text-sm font-PeydaBold text-main">
              تطابق ۱۰۰٪ با تصاویر
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
