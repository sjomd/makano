import holidaysData from "../assets/holidays.json"; // ایمپورت مستقیم فایل جیسون
import { toEnDigits } from "./dateUtils";

export const getDayTypeInfo = (dateStr, persianDateObj) => {
  // ۱. بررسی آخر هفته (پنجشنبه index 5 و جمعه index 6)
  const dayIndex = persianDateObj?.weekDay?.index;
  const isWeekend = dayIndex === 5 || dayIndex === 6;

  // ۲. بررسی تعطیلات رسمی از فایل JSON
  const cleanDateStr = toEnDigits(dateStr);
  const year = cleanDateStr.split("/")[0];
  const yearHolidays = holidaysData[year] || [];
  const foundHoliday = yearHolidays.find((h) => h.date === cleanDateStr);

  return {
    isOfficialHoliday: Boolean(foundHoliday),
    isWeekend: isWeekend && !foundHoliday, // اگر خودش وسط هفته بود ولی پنجشنبه/جمعه بود
    holidayTitle: foundHoliday ? foundHoliday.title : null,
  };
};
