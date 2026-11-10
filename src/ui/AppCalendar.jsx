import { useMemo } from "react";
import { Calendar, DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { usePropertyStore } from "../hooks/usePropertyStore";
import {
  calculateNightsBreakdown,
  toEnDigits,
  toFaDigits,
} from "../utils/dateUtils";
import { getDayTypeInfo } from "../utils/holidayUtils";
import { formatToman } from "@/utils/helpers";

const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

export default function AppCalendar({
  getDayPrice,
  numberOfMonths = 1,
  customState = null,
}) {
  const store = usePropertyStore();

  const checkIn = customState ? customState.checkIn : store.checkIn;
  const checkOut = customState ? customState.checkOut : store.checkOut;
  const setDates = customState ? customState.setDates : store.setDates;

  const hasPricing = Boolean(getDayPrice);

  const { nights, formattedDate } = useMemo(() => {
    if (!customState) {
      return { nights: store.nights, formattedDate: store.formattedDate };
    }
    if (!checkIn) return { nights: 0, formattedDate: "" };

    const startObj = new DateObject({
      date: checkIn,
      calendar: persian,
      locale: persian_fa,
    });
    if (!checkOut) {
      return {
        nights: 0,
        formattedDate: ` ورود: ${startObj.format("D MMMM")}`,
      };
    }

    const endObj = new DateObject({
      date: checkOut,
      calendar: persian,
      locale: persian_fa,
    });
    const diffDays = Math.round((endObj.toUnix() - startObj.toUnix()) / 86400);

    return {
      nights: diffDays > 0 ? diffDays : 0,
      formattedDate: `${startObj.format("D MMMM")} تا ${endObj.format("D MMMM")}`,
    };
  }, [customState, checkIn, checkOut, store.nights, store.formattedDate]);

  const calendarValue = useMemo(() => {
    const values = [];
    if (checkIn) {
      values.push(
        new DateObject({
          date: checkIn,
          calendar: persian,
          locale: persian_fa,
        }),
      );
    }
    if (checkIn && checkOut) {
      values.push(
        new DateObject({
          date: checkOut,
          calendar: persian,
          locale: persian_fa,
        }),
      );
    }
    return values;
  }, [checkIn, checkOut]);

  const handleCalendarChange = (values) => {
    if (!values || values.length === 0) {
      setDates("", "");
      return;
    }
    if (values.length === 1) {
      const start = toEnDigits(values[0].format("YYYY/MM/DD"));
      setDates(start, "");
    } else if (values.length >= 2) {
      const start = toEnDigits(values[0].format("YYYY/MM/DD"));
      const end = toEnDigits(values[values.length - 1].format("YYYY/MM/DD"));
      setDates(start, start === end ? "" : end);
      calculateNightsBreakdown(checkIn, checkOut);
    }
  };

  // تمیزکننده فرمت قیمت برای جلوگیری از قاطی شدن حروف انگلیسی (مثل k) با اعداد فارسی
  const formatCleanPrice = (rawPrice) => {
    if (!rawPrice) return "";
    const str = String(rawPrice).trim();
    return toFaDigits(str);
  };

  return (
    <div className="w-full font-SansRegular select-none" dir="rtl">
      {/* هدر دقیقاً مطابق عکس دوم شما */}
      <div className="flex items-center justify-between px-4 py-3.5 mb-3 rounded-2xl bg-base/80 backdrop-blur-md border border-border/60 shadow-sm">
        <div className="flex flex-col">
          <span className="text-[11px] text-muted mb-1 font-SansMedium">
            مدت اقامت و تاریخ
          </span>
          <span className="text-xs sm:text-sm font-PeydaBold text-main">
            {formattedDate || "تاریخ ورود و خروج را انتخاب کنید"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {nights > 0 ? (
            <span className="px-3 py-1.5 rounded-xl bg-primary/15 border border-primary/40 text-primary font-PeydaBold text-xs shadow-sm">
              {toFaDigits(nights)} شب اقامت
            </span>
          ) : (
            <span className="text-xs text-muted font-SansMedium px-2 py-1">
              {checkIn ? "انتخاب خروج..." : "منتظر انتخاب"}
            </span>
          )}

          {checkIn && (
            <button
              type="button"
              onClick={() => setDates("", "")}
              className="text-xs px-3 py-1.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white transition-all cursor-pointer font-SansMedium"
            >
              پاک کردن
            </button>
          )}
        </div>
      </div>

      {/* بدنه اصلی تقویم */}
      <div className="w-full p-3 sm:p-4 rounded-2xl bg-card border border-border/50 shadow-lg flex flex-col items-center">
        <Calendar
          calendar={persian}
          locale={persian_fa}
          weekDays={weekDays}
          range
          rangeHover
          numberOfMonths={numberOfMonths}
          minDate={new DateObject({ calendar: persian })}
          value={calendarValue}
          onChange={handleCalendarChange}
          className={`clean-modern-calendar ${hasPricing ? "with-price" : "no-price"}`}
          arrow={true}
          mapDays={({ date }) => {
            const dateStr = toEnDigits(date.format("YYYY/MM/DD"));
            const { isOfficialHoliday, isWeekend } = getDayTypeInfo(
              dateStr,
              date,
            );

            const priceData = getDayPrice
              ? getDayPrice(dateStr, date, { isWeekend, isOfficialHoliday })
              : null;

            let cellClassName = "";
            if (isOfficialHoliday) {
              cellClassName = "is-holiday-cell";
            } else if (isWeekend) {
              cellClassName = "is-weekend-cell";
            }

            return {
              className: cellClassName,
              children: (
                <div className="day-content-box">
                  {/* نقطه کوچک نشانگر تعطیلی در گوشه بالا */}
                  {(isOfficialHoliday || isWeekend) && (
                    <span
                      className={`holiday-dot ${
                        isOfficialHoliday ? "dot-red" : "dot-orange"
                      }`}
                    />
                  )}

                  {/* عدد روز - کاملاً تفکیک شده در بخش بالایی */}
                  <span className="day-num">{date.format("D")}</span>

                  {/* قیمت روز - کاملاً تفکیک شده در بخش پایینی با جهت LTR برای نمایش درست 50k */}
                  {hasPricing && priceData?.price && (
                    <span className="day-price-tag mt-10 text-2xl" dir="ltr">
                      {formatCleanPrice(priceData.price)}
                    </span>
                  )}
                </div>
              ),
            };
          }}
        />

        {/* راهنمای پایین تقویم (فقط وقتی قیمت داریم نمایش داده شود) */}
        {hasPricing && (
          <div className="w-full mt-3 pt-2.5 border-t border-border/40 flex items-center justify-between text-[11px] text-muted px-1">
            <div className="flex items-center gap-3.5">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                <span>تعطیل رسمی</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>آخر هفته</span>
              </div>
            </div>
            <span className="text-[10px] opacity-75">مبالغ به تومان</span>
          </div>
        )}
      </div>
    </div>
  );
}
