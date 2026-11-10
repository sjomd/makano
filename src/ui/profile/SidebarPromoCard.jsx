import { HiOutlineSparkles, HiArrowLeft } from "react-icons/hi";

export default function SidebarPromoCard() {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-primary/20 via-base to-base border border-primary/30 p-3.5">
      <div className="flex items-center gap-x-1.5 text-amber-400 mb-1">
        <HiOutlineSparkles className="text-base shrink-0" />
        <span className="text-xs font-PeydaBold text-main">
          سفرهای خاص‌تر با مکانو
        </span>
      </div>
      <p className="text-[10px] text-muted font-PeydaLight leading-4 mb-2.5">
        تخفیف‌های ویژه برای ویلاهای لوکس و ساحلی
      </p>
      <button
        type="button"
        className="w-full bg-card/80 hover:bg-primary hover:text-white text-main border border-border text-[11px] font-PeydaBold py-2 rounded-xl flex items-center justify-center gap-x-1.5 transition-all cursor-pointer"
      >
        <span>مشاهده پیشنهادها</span>
        <HiArrowLeft className="text-xs" />
      </button>
    </div>
  );
}
