import fs from "node:fs";
import path from "node:path";
import moment from "moment-jalaali";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const CONFIG = {
  holidaysPath: path.resolve("src/assets/holidays.json"),
  tableName: "holidays",
  batchSize: 100,
};

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_KEY;

function validateEnvironment() {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "متغیرهای VITE_SUPABASE_URL و SUPABASE_SERVICE_ROLE_KEY در فایل .env تعریف نشده‌اند.",
    );
  }
}

function readHolidaysFile() {
  if (!fs.existsSync(CONFIG.holidaysPath)) {
    throw new Error(`فایل تعطیلات پیدا نشد: ${CONFIG.holidaysPath}`);
  }

  try {
    return JSON.parse(fs.readFileSync(CONFIG.holidaysPath, "utf8"));
  } catch {
    throw new Error(
      "محتوای holidays.json معتبر نیست یا فایل JSON قابل خواندن نیست.",
    );
  }
}

function jalaliToGregorian(jalaliDate) {
  if (
    typeof jalaliDate !== "string" ||
    !/^\d{4}\/\d{2}\/\d{2}$/.test(jalaliDate)
  ) {
    throw new Error(`فرمت تاریخ شمسی نامعتبر است: ${jalaliDate}`);
  }

  const parsedDate = moment(jalaliDate, "jYYYY/jMM/jDD", true);

  if (!parsedDate.isValid()) {
    throw new Error(`تاریخ شمسی نامعتبر است: ${jalaliDate}`);
  }

  const gregorianDate = parsedDate.format("YYYY-MM-DD");

  // اعتبارسنجی مجدد تاریخ میلادی خروجی
  const roundTrip = moment(gregorianDate, "YYYY-MM-DD", true);

  if (
    !roundTrip.isValid() ||
    roundTrip.format("YYYY-MM-DD") !== gregorianDate
  ) {
    throw new Error(`تبدیل تاریخ ناموفق بود: ${jalaliDate}`);
  }

  return gregorianDate;
}

function normalizeHolidays(holidaysData) {
  const holidaysByDate = new Map();

  for (const [year, holidays] of Object.entries(holidaysData)) {
    if (!Array.isArray(holidays)) {
      throw new Error(`اطلاعات تعطیلات سال ${year} باید آرایه باشد.`);
    }

    for (const holiday of holidays) {
      if (
        !holiday ||
        typeof holiday.date !== "string" ||
        typeof holiday.title !== "string" ||
        !holiday.title.trim()
      ) {
        throw new Error(`یکی از رکوردهای سال ${year} ساختار معتبری ندارد.`);
      }

      const jalaliDate = holiday.date;

      if (!jalaliDate.startsWith(`${year}/`)) {
        throw new Error(
          `سال تاریخ ${jalaliDate} با کلید ${year} مطابقت ندارد.`,
        );
      }

      const row = {
        holiday_date: jalaliToGregorian(jalaliDate),
        jalali_date: jalaliDate,
        title: holiday.title.trim(),
      };

      const existing = holidaysByDate.get(jalaliDate);

      if (existing && existing.title !== row.title) {
        throw new Error(
          `برای تاریخ ${jalaliDate} عنوان‌های متفاوت ثبت شده است.`,
        );
      }

      holidaysByDate.set(jalaliDate, row);
    }
  }

  return [...holidaysByDate.values()].sort((a, b) =>
    a.holiday_date.localeCompare(b.holiday_date),
  );
}

async function upsertBatch(supabase, rows) {
  const { error } = await supabase.from(CONFIG.tableName).upsert(rows, {
    onConflict: "jalali_date",
  });

  if (error) {
    throw new Error(`خطا در ذخیره اطلاعات در Supabase: ${error.message}`);
  }
}

async function importHolidays() {
  validateEnvironment();

  const holidaysData = readHolidaysFile();
  const rows = normalizeHolidays(holidaysData);

  if (rows.length === 0) {
    console.log("هیچ تعطیلی‌ای برای انتقال پیدا نشد.");
    return;
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  console.log(`شروع انتقال ${rows.length} تعطیلی...`);

  for (let i = 0; i < rows.length; i += CONFIG.batchSize) {
    const batch = rows.slice(i, i + CONFIG.batchSize);

    await upsertBatch(supabase, batch);

    console.log(
      `انتقال ${Math.min(i + batch.length, rows.length)} از ${rows.length}`,
    );
  }

  console.log(`انتقال ${rows.length} تعطیلی با موفقیت انجام شد.`);
}

importHolidays().catch((error) => {
  console.error("انتقال تعطیلات ناموفق بود:");
  console.error(error.message);
  process.exitCode = 1;
});
