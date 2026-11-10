import {
  HiOutlineShieldCheck,
  HiChevronLeft,
  HiOutlineLocationMarker,
} from "react-icons/hi";

export default function StayAboutAndMap({
  description,
  locationTitle = "مازندران، رامسر، طالش محله",
}) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
      {/* درباره اقامتگاه */}
      <div className="lg:col-span-7 bg-card border border-border rounded-[28px] p-6 flex flex-col justify-between shadow-lg">
        <div>
          <h2 className="text-base sm:text-lg font-PeydaBold text-main mb-3">
            درباره این اقامتگاه
          </h2>
          <p className="text-xs sm:text-sm text-muted leading-7 sm:leading-8 text-justify font-PeydaLight">
            {description ||
              "این ویلا با معماری مدرن و طراحی خاص، در دل طبیعت سرسبز و ساحلی رامسر قرار گرفته و فضایی بی‌نظیر برای استراحت و آرامش شما فراهم می‌کند..."}
          </p>
        </div>
        <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
          <div className="flex items-center gap-x-2 text-xs text-emerald-400 font-PeydaMedium">
            <HiOutlineShieldCheck className="text-lg" />
            <span>تضمین نظافت هتلی پیش از ورود</span>
          </div>
          <button
            type="button"
            className="text-xs font-PeydaBold text-primary hover:underline flex items-center gap-x-1 cursor-pointer"
          >
            <span>مطالعه بیشتر</span>
            <HiChevronLeft />
          </button>
        </div>
      </div>

      {/* ویجت نقشه راداری */}
      <div className="lg:col-span-5 bg-card border border-border rounded-[28px] p-3 shadow-lg min-h-[220px]">
        <div className="w-full h-full bg-base rounded-2xl relative flex flex-col items-center justify-center p-5 overflow-hidden border border-border/50">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="relative flex items-center justify-center mb-3">
            <div className="w-16 h-16 rounded-full bg-primary/15 border border-primary/30 animate-ping absolute" />
            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center relative z-10 shadow-lg shadow-primary">
              <HiOutlineLocationMarker className="text-xl" />
            </div>
          </div>
          <span className="text-xs font-PeydaBold text-main z-10">
            {locationTitle}
          </span>
          <span className="text-[10px] text-muted font-PeydaLight mt-1 z-10">
            فاصله تا ساحل: ۳ دقیقه
          </span>
          <button
            type="button"
            className="mt-3.5 z-10 bg-card hover:bg-primary hover:text-white text-main border border-border text-xs font-PeydaMedium px-4 py-2 rounded-xl transition-all cursor-pointer"
          >
            مشاهده روی نقشه
          </button>
        </div>
      </div>
    </section>
  );
}
