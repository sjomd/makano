import {
  HiOutlineLocationMarker,
  HiOutlineCalendar,
  HiOutlineUsers,
  HiArrowLeft,
  HiOutlineCreditCard,
} from "react-icons/hi";
import { STATUS_META } from "./tripsConfig";
import { formatToman } from "@/utils/helpers";
import TripCardHeader from "./TripCardHeader";
import TripPaymentTimer from "./TripPaymentTimer";
import { calcNights } from "@/utils/dateUtils";

export default function TripCard({ trip }) {
  const meta = STATUS_META[trip.status] || STATUS_META.paid_waiting;

  return (
    <div className="group relative bg-base border border-border hover:border-primary/40 rounded-[26px] p-4 sm:p-5 transition-all duration-300 shadow-lg hover:shadow-2xl overflow-hidden">
      {/* نوار نئونی وضعیت در حاشیه راست کارت */}
      <div
        className={`absolute top-0 right-0 bottom-0 w-1.5 ${meta.dotClass}`}
      />

      {/* ۱. هدر کارت (وضعیت + کد رزرو کپی‌شونده) */}
      <TripCardHeader meta={meta} bookingCode={trip.booking_code} />

      {/* ۲. بدنه اصلی کارت */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-5">
        {/* راست: تصویر با افکت زوم + مشخصات و باکس‌های تاریخ/مهمان */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1 min-w-0">
          <div className="relative w-full sm:w-32 h-40 sm:h-28 rounded-2xl overflow-hidden shrink-0 border border-border">
            <img
              src={trip.image}
              alt={trip.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent sm:hidden" />
            <span className="absolute bottom-2 right-2 bg-card/85 backdrop-blur-md text-main text-[10px] font-PeydaBold px-2.5 py-0.5 rounded-lg border border-border">
              {calcNights(trip.check_in, trip.check_out)} شب اقامت
            </span>
          </div>

          <div className="space-y-3 min-w-0 flex-1 w-full">
            <div>
              <h3 className="text-sm sm:text-[16px] font-PeydaBold text-main truncate group-hover:text-primary transition-colors">
                {trip.title}
              </h3>
              <span className="text-xs text-muted flex items-center gap-x-1 mt-1 font-PeydaLight">
                <HiOutlineLocationMarker className="text-primary text-sm shrink-0" />
                <span className="truncate">{trip.city}</span>
              </span>
            </div>

            {/* باکس‌های مینیاتوری تاریخ و نفرات */}
            <div className="flex flex-wrap items-center gap-2 text-[11px]">
              <div className="bg-card border border-border rounded-xl px-3 py-1.5 flex items-center gap-x-1.5">
                <HiOutlineCalendar className="text-primary text-sm shrink-0" />
                <span className="text-muted">اقامت:</span>
                <span className="font-PeydaBold text-main">
                  {trip.check_in} تا {trip.check_out}
                </span>
              </div>

              <div className="bg-card border border-border rounded-xl px-3 py-1.5 flex items-center gap-x-1.5">
                <HiOutlineUsers className="text-primary text-sm shrink-0" />
                <span className="font-PeydaBold text-main">
                  {trip.guest_count} مهمان
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* چپ: باکس قیمت، تایمر معکوس و دکمه عملیات */}
        <div className="flex flex-col justify-between gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 lg:border-r border-border/60 lg:pr-5 shrink-0 lg:min-w-52.5">
          {meta.showTimer && trip.paymentDeadline && (
            <TripPaymentTimer deadline={trip.paymentDeadline} />
          )}

          <div className="flex lg:flex-col items-center lg:items-end justify-between gap-2">
            <span className="text-[11px] text-muted font-PeydaLight">
              مبلغ کل فاکتور
            </span>
            <div className="flex items-baseline gap-x-1">
              <span className="text-[16px] sm:text-lg font-PeydaBold text-main">
                {formatToman
                  ? formatToman(trip.total_amount)
                  : trip.totalPrice.toLocaleString("fa-IR")}
              </span>
              <span className="text-[10px] text-muted font-PeydaLight">
                تومان
              </span>
            </div>
          </div>

          <button
            type="button"
            className={`w-full py-2.5 px-4 rounded-xl text-xs font-PeydaBold flex items-center justify-center gap-x-1.5 transition-all cursor-pointer ${
              meta.isPrimaryAction
                ? "bg-primary hover:bg-primary-hover text-white shadow-lg shadow-primary/25 active:scale-95"
                : "bg-card hover:bg-primary/10 hover:border-primary/40 hover:text-primary text-main border border-border"
            }`}
          >
            {meta.isPrimaryAction && (
              <HiOutlineCreditCard className="text-base" />
            )}
            <span>{meta.actionText}</span>
            {!meta.isPrimaryAction && <HiArrowLeft className="text-xs" />}
          </button>
        </div>
      </div>
    </div>
  );
}
