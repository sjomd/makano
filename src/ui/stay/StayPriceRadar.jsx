import { useMemo } from "react";
import {
  HiOutlineSparkles,
  HiOutlineTrendingDown,
  HiOutlineScale,
  HiOutlineTrendingUp,
} from "react-icons/hi";
import { evaluateStayPrice } from "@/utils/priceEvaluator";

export default function StayPriceRadar({ stay, similarStays = [] }) {
  const analysis = useMemo(() => {
    return evaluateStayPrice(stay, similarStays);
  }, [stay, similarStays]);

  if (!analysis) return null;

  const { status, badge, title, desc, color, bgBadge, markerPosition } =
    analysis;

  const StatusIcon =
    status === "great"
      ? HiOutlineTrendingDown
      : status === "fair"
        ? HiOutlineScale
        : HiOutlineTrendingUp;

  return (
    <div className="w-full lg:max-w-md xl:max-w-lg bg-card border border-border rounded-[24px] p-4 sm:p-5 shadow-xl mx-auto mb-3.5 relative overflow-hidden">
      {/* درخشش ملایم پس‌زمینه */}
      <div className="absolute -top-10 -left-10 w-28 h-28 bg-primary/10 rounded-full blur-2xl pointer-events-none" />

      {/* ۱. هدر کارت مقایسه */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-x-2">
          <div className="w-8 h-8 rounded-xl bg-base border border-border flex items-center justify-center shrink-0">
            <HiOutlineSparkles className={`text-base ${color}`} />
          </div>
          <div>
            <span className="text-[10px] text-muted block font-PeydaLight">
              تحلیل هوشمند ارزش اقامتگاه
            </span>
            <h4 className="text-xs sm:text-sm font-PeydaBold text-main">
              {title}
            </h4>
          </div>
        </div>

        <span
          className={`inline-flex items-center gap-x-1 text-[10px] font-PeydaBold px-2.5 py-1 rounded-full border shrink-0 ${bgBadge}`}
        >
          <StatusIcon className="text-xs" />
          <span>{badge}</span>
        </span>
      </div>

      {/* ۲. نوار گیج طیف قیمتی (Price Spectrum Gauge) */}
      <div className="my-4">
        <div className="relative h-2 w-full rounded-full bg-base border border-border/60 p-0.5 flex items-center">
          {/* گرادینت طیف (از راست به چپ: سبز به آبی به کهربایی) */}
          <div className="w-full h-full rounded-full bg-gradient-to-l from-emerald-400 via-sky-400 to-amber-400 opacity-85" />

          {/* نشانگر متحرک (پین موقعیت قیمت) */}
          <div
            style={{ right: `${markerPosition}%` }}
            className="absolute -top-1.5 translate-x-1/2 flex flex-col items-center transition-all duration-500"
          >
            <div className="w-4 h-4 rounded-full bg-main border-[3px] border-card shadow-lg ring-2 ring-primary/40" />
          </div>
        </div>

        {/* برچسب‌های زیر نوار */}
        <div className="flex items-center justify-between text-[9px] text-muted font-PeydaLight mt-2 px-0.5">
          <span
            className={
              status === "great" ? "text-emerald-400 font-PeydaBold" : ""
            }
          >
            خوش‌قیمت
          </span>
          <span
            className={status === "fair" ? "text-sky-400 font-PeydaBold" : ""}
          >
            منصفانه (میانگین)
          </span>
          <span
            className={status === "high" ? "text-amber-400 font-PeydaBold" : ""}
          >
            لوکس و ویژه
          </span>
        </div>
      </div>

      {/* ۳. توضیحات تحلیلی */}
      <p className="text-[11px] text-muted leading-5 font-PeydaLight bg-base/60 border border-border/60 rounded-xl p-2.5">
        {desc}
      </p>
    </div>
  );
}
