import { useMemo, useState } from "react";
import {
  HiOutlineCalendar,
  HiOutlineUsers,
  HiOutlineClock,
  HiOutlineShieldCheck,
  HiPlus,
  HiMinus,
  HiChevronDown,
} from "react-icons/hi";
import AppCalendar from "../AppCalendar";
import NeonSpinner from "../NeonSpinner";
import BookingInvoice from "./BookingInvoice";
import { useBookingStore } from "./useBookingStore";
import { useGetSettings } from "@/hooks/settings/useGetSettings";
import {
  calculateDiscountPrice,
  calculateExtraGuests,
  calculateSurcharge,
  formatToman,
} from "@/utils/helpers";
import { calculateNightsBreakdown, formatJalaliRange } from "@/utils/dateUtils";
import { createBooking } from "@/services/bookingsApi";
import { useNavigate } from "react-router";
import useAuth from "@/hooks/auth/useAuth";

export default function StayBookingCard({ stay }) {
  // ۱. فراخوانی تمام هوک‌ها در بالاترین سطح (رعایت Rules of Hooks)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const { checkIn, checkOut, guests, setGuests, setDates } = useBookingStore();
  const { settings, isLoading: isLoadingSettings } = useGetSettings();
  const navigate = useNavigate();
  // استخراج ایمن مقادیر با مقادیر پیش‌فرض (جلوگیری از کرش در صورت نبودن stay)
  const {
    price_per_night = 0,
    discount = 0,
    capacity = 1,
    extra_capacity = 0,
  } = stay || {};

  const maxCapacity = capacity + extra_capacity;
  const appSettings = settings?.[0] || {}; // دسترسی ایمن به تنظیمات

  // محاسبه قیمت پایه هر شب (با احتساب تخفیف)
  const finalPricePerNight = useMemo(() => {
    return discount
      ? calculateDiscountPrice(price_per_night, discount)
      : price_per_night;
  }, [price_per_night, discount]);

  // ۲. مغز متفکر محاسبات فاکتور (با Dependency Array کامل)
  const invoiceData = useMemo(() => {
    if (!checkIn || !checkOut) return null;

    const {
      normalNights = 0,
      weekendNights = 0,
      holidayNights = 0,
      totalNights = 0,
    } = calculateNightsBreakdown(checkIn, checkOut);

    if (totalNights <= 0) return null;

    // استخراج درصدها و هزینه‌ها از تنظیمات به صورت ایمن
    const weekendPercent = appSettings.weekend_markup_percent || 0;
    const holidayPercent = appSettings.holiday_markup_percent || 0;
    const extraGuestFee = appSettings.extraGuest_markup_percent || 0;

    // محاسبه مبالغ هر بخش
    const normalTotal = normalNights * finalPricePerNight;
    const weekendTotal = calculateSurcharge(
      finalPricePerNight,
      weekendPercent,
      weekendNights,
    );
    const holidayTotal = calculateSurcharge(
      finalPricePerNight,
      holidayPercent,
      holidayNights,
    );

    const extraGuestsCount = Math.max(0, guests - capacity);
    const extraGuestsTotal = calculateExtraGuests(
      extraGuestsCount,
      extraGuestFee,
      totalNights,
    );

    const totalPayable =
      normalTotal + weekendTotal + holidayTotal + extraGuestsTotal;

    return {
      totalNights,
      normalNights,
      normalTotal,
      weekendNights,
      weekendPercent,
      weekendTotal,
      holidayNights,
      holidayPercent,
      holidayTotal,
      extraGuestsCount,
      extraGuestFee,
      extraGuestsTotal,
      totalPayable,
    };
  }, [checkIn, checkOut, guests, capacity, finalPricePerNight, appSettings]);
  const { user, isLoading } = useAuth();
  // ۳. حالا بعد از هوک‌ها، وضعیت لودینگ را چک می‌کنیم
  if (!stay || isLoadingSettings) return <NeonSpinner />;

  const formattedDate = formatJalaliRange(checkIn, checkOut);

  function handleBookingAction() {
    if (!user) {
      navigate("/login");
      return;
    }

    if (!invoiceData) {
      setIsCalendarOpen(true);
      return;
    }
    console.log(checkIn, checkOut);
    createBooking({
      stayId: stay.id,
      checkIn,
      checkOut,
      guestCount: guests,
    });
  }
  return (
    <div className="w-full  lg:max-w-md xl:max-w-lg bg-card border border-border rounded-[28px] p-5 sm:p-6 shadow-2xl mx-auto">
      {/* ۱. هدر قیمت و نشانگر بازدید */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5 pb-5 border-b border-border">
        <div className="flex flex-col items-start w-full sm:w-auto">
          <span className="text-[11px] text-muted block mb-1 font-PeydaLight">
            شروع قیمت هر شب
          </span>
          <div className="flex items-baseline gap-x-1.5">
            <span className="text-2xl sm:text-3xl font-PeydaBold text-main tracking-tight">
              {formatToman(finalPricePerNight)}
            </span>
            <span className="text-xs text-muted font-PeydaLight">تومان</span>
          </div>

          {discount > 0 && (
            <div className="flex items-center gap-x-2 mt-1">
              <span className="bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-[10px] font-PeydaBold px-2 py-0.5 rounded-lg">
                {discount}% تخفیف
              </span>
              <span className="text-xs text-muted line-through">
                {formatToman(price_per_night)}
              </span>
            </div>
          )}
        </div>

        <div className="inline-flex items-center gap-x-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-xs font-PeydaMedium text-emerald-600 dark:text-emerald-400">
            ۳ نفر در حال بازدید
          </span>
        </div>
      </div>

      {/* ۲. کنترلرها و فرم */}
      <div className="space-y-3.5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-3.5">
          {/* انتخابگر تاریخ */}
          <div
            onClick={() => setIsCalendarOpen((prev) => !prev)}
            className={`bg-base hover:opacity-90 border ${
              isCalendarOpen ? "border-primary" : "border-border"
            } rounded-2xl p-3.5 flex items-center justify-between cursor-pointer transition-all duration-200`}
          >
            <div className="flex items-center gap-x-3">
              <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <HiOutlineCalendar className="text-lg" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[11px] text-muted block mb-0.5 font-PeydaLight">
                  تاریخ اقامت
                </span>
                <span className="text-xs sm:text-sm font-PeydaBold text-main">
                  {formattedDate || "انتخاب کنید"}
                </span>
              </div>
            </div>
            <HiChevronDown
              className={`text-muted text-lg shrink-0 transition-transform duration-300 ${
                isCalendarOpen ? "rotate-180 text-primary" : ""
              }`}
            />
          </div>

          {/* انتخابگر تعداد نفرات */}
          <div className="bg-base border border-border rounded-2xl p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-x-3">
              <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <HiOutlineUsers className="text-lg" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-xs sm:text-sm font-PeydaBold text-main block">
                  تعداد مسافران
                </span>
                <span className="text-[9px] sm:text-[10px] text-muted block mt-0.5 font-PeydaLight">
                  {capacity} نفر استاندارد
                  {extra_capacity > 0 && ` (+${extra_capacity} نفر اضافه)`}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-x-2 bg-card border border-border p-1.5 rounded-xl shrink-0">
              <button
                type="button"
                disabled={guests >= maxCapacity}
                onClick={() => setGuests(Math.min(maxCapacity, guests + 1))}
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-base border border-border hover:bg-primary hover:text-white active:scale-95 disabled:opacity-40 disabled:pointer-events-none text-main flex items-center justify-center transition-all cursor-pointer"
              >
                <HiPlus className="text-xs" />
              </button>
              <span className="text-sm font-PeydaBold text-main min-w-[16px] sm:min-w-[20px] text-center tabular-nums">
                {guests}
              </span>
              <button
                type="button"
                disabled={guests <= 1}
                onClick={() => setGuests(Math.max(1, guests - 1))}
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-base border border-border hover:bg-primary hover:text-white active:scale-95 disabled:opacity-40 disabled:pointer-events-none text-main flex items-center justify-center transition-all cursor-pointer"
              >
                <HiMinus className="text-xs" />
              </button>
            </div>
          </div>
        </div>

        {/* ۳. تقویم */}
        {isCalendarOpen && (
          <div className="pt-2 pb-1 animate-fadeIn">
            <div className="bg-base border border-border rounded-2xl p-2 sm:p-3 overflow-hidden shadow-inner">
              <AppCalendar
                customState={{
                  checkIn,
                  checkOut,
                  setDates: (start, end) => {
                    setDates(start, end);
                    if (start && end) {
                      setTimeout(() => setIsCalendarOpen(false), 250);
                    }
                  },
                }}
              />
            </div>
          </div>
        )}

        {/* ۴. کامپوننت فاکتور */}
        <BookingInvoice invoice={invoiceData} />

        {/* ۵. دکمه اکشن نهایی */}
        <button
          onClick={handleBookingAction}
          type="button"
          className="w-full bg-primary hover:bg-primary-hover text-white font-PeydaBold py-3.5 rounded-2xl shadow-lg shadow-primary/20 active:scale-[0.99] transition-all cursor-pointer text-sm"
        >
          {invoiceData ? "ثبت درخواست رزرو" : "انتخاب تاریخ اقامت"}
        </button>
      </div>

      {/* ۶. فوتر تضمین */}
      <div className="mt-5 space-y-2 pt-4 border-t border-border text-[11px] text-muted">
        <div className="flex items-start gap-x-2">
          <HiOutlineClock className="text-amber-500 dark:text-amber-400 text-base shrink-0 mt-0.5" />
          <p className="leading-relaxed text-right">
            پس از تایید، تقویم به مدت{" "}
            <strong className="text-main">۲ ساعت</strong> برای تکمیل پرداخت شما
            قفل می‌شود.
          </p>
        </div>
        <div className="flex items-center gap-x-2">
          <HiOutlineShieldCheck className="text-emerald-500 dark:text-emerald-400 text-base shrink-0" />
          <span>ضمانت تحویل اقامتگاه منطبق با تصاویر و مشخصات</span>
        </div>
      </div>
    </div>
  );
}
