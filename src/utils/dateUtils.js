const PERSIAN_MONTHS = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];
import holidays from "../assets/holidays.json";
// تبدیل اعداد فارسی به انگلیسی
export const toEnDigits = (str = "") =>
  String(str).replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));

// تبدیل اعداد انگلیسی به فارسی
export const toFaDigits = (num = "") =>
  String(num).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

// تبدیل تاریخ جلالی به روز برای محاسبات اختلاف
export const jalaliToDays = (dateStr) => {
  if (!dateStr) return 0;
  const cleanStr = toEnDigits(dateStr);
  const [y, m, d] = cleanStr.split("/").map(Number);
  if (!y || !m || !d) return 0;

  const monthDays = m <= 6 ? (m - 1) * 31 : 186 + (m - 7) * 30;
  const leapDays = Math.floor((y * 8 + 29) / 33);
  return y * 365 + leapDays + monthDays + d;
};

// محاسبه تعداد شب‌ها
export const calcNights = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return 0;
  const diff = jalaliToDays(checkOut) - jalaliToDays(checkIn);
  return diff > 0 ? diff : 0;
};

// فرمت‌کننده بازه تاریخ (مثلاً: ۲۷ تا ۲۹ مهر یا ۲۹ مهر تا ۳ آبان)
export const formatJalaliRange = (checkIn, checkOut) => {
  if (!checkIn) return "";
  const [y1, m1, d1] = toEnDigits(checkIn).split("/").map(Number);
  if (!m1 || !d1) return "";

  const month1Name = PERSIAN_MONTHS[m1 - 1];

  if (!checkOut) {
    return `ورود: ${toFaDigits(d1)} ${month1Name}`;
  }

  const [y2, m2, d2] = toEnDigits(checkOut).split("/").map(Number);
  if (!m2 || !d2) return ` ورود: ${toFaDigits(d1)} ${month1Name}`;

  const month2Name = PERSIAN_MONTHS[m2 - 1];

  if (y1 === y2 && m1 === m2) {
    return `${toFaDigits(d1)} تا ${toFaDigits(d2)} ${month1Name}`;
  }

  return `${toFaDigits(d1)} ${month1Name} تا ${toFaDigits(d2)} ${month2Name}`;
};
export const getDatesInRange = (startDate, endDate) => {
  const dates = [];

  // برای اینکه دیتای اصلی تغییر نکنه، یک کپی از تاریخ ورود می‌گیریم
  let currentDate = new Date(startDate);
  const end = new Date(endDate);

  // حلقه تا زمانی که تاریخ فعلی کوچکتر از تاریخ خروج باشه ادامه داره
  while (currentDate < end) {
    // تاریخ رو تو آرایه پوش می‌کنیم (باز هم یه کپی جدید می‌گیریم)
    dates.push(new Date(currentDate));

    // یک روز به تاریخ فعلی اضافه می‌کنیم تا بریم روز بعدی
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates; // خروجی: آرایه‌ای از تمام شب‌های اقامت
};

// فرض می‌کنیم آرایه‌ای از تاریخ‌های تعطیل از تنظیمات (Supabase) به این شکل داری:
// const holidays = ["2024-03-20", "2024-03-21", ...];

export const calculateNightsBreakdown = (
  checkIn,
  checkOut,
  holidaysList = holidays,
) => {
  const dates = getDatesInRange(checkIn, checkOut);

  return dates.reduce(
    (acc, date) => {
      // ۱. استخراج دقیق سال، ماه و روز شمسی با اعداد انگلیسی (بدون باگ جابه‌جایی مرورگر)
      const formatter = new Intl.DateTimeFormat("en-US", {
        calendar: "persian",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

      const parts = formatter.formatToParts(date);
      const year = parts.find((p) => p.type === "year").value;
      const month = parts.find((p) => p.type === "month").value;
      const day = parts.find((p) => p.type === "day").value;

      // ۲. چسباندن دستی قطعات برای تضمین فرمت دقیق "1405/03/14"
      const dateString = `${year}/${month}/${day}`;

      // ۳. مقایسه با لیست تعطیلات
      const yearHolidays = holidaysList[year] || [];
      const isHoliday = yearHolidays.some(
        (holiday) => holiday.date === dateString,
      );

      // ۴. بررسی آخر هفته (پنجشنبه و جمعه)
      const dayOfWeek = date.getDay();
      const isWeekend = dayOfWeek === 5 || dayOfWeek === 6;

      // ۵. دسته‌بندی و اولویت‌بندی
      if (isHoliday) {
        acc.holidayNights += 1;
        acc.details.push({ date: dateString, type: "holiday" });
      } else if (isWeekend) {
        acc.weekendNights += 1;
        acc.details.push({ date: dateString, type: "weekend" });
      } else {
        acc.normalNights += 1;
        acc.details.push({ date: dateString, type: "normal" });
      }

      acc.totalNights += 1;
      return acc;
    },
    {
      totalNights: 0,
      normalNights: 0,
      weekendNights: 0,
      holidayNights: 0,
      details: [],
    },
  );
};
