import {
  HiOutlineHeart,
  HiOutlineSun,
  HiOutlineUserGroup,
  HiOutlineSparkles,
  HiOutlineWifi,
  HiOutlineCash,
  HiOutlineEmojiHappy,
  HiOutlineShieldCheck,
} from "react-icons/hi";

// تابع کمکی برای جستجوی راحت‌تر در آرایه امکانات و متن‌ها
const hasKeyword = (source = [], keywords = []) => {
  const text = Array.isArray(source) ? source.join(" ") : String(source || "");
  return keywords.some((kw) => text.includes(kw));
};

export const getMatchedPersonas = (stay) => {
  if (!stay) return [];

  // ۱. استخراج و نرمال‌سازی تمام داده‌های اقامتگاه
  const capacity = Number(stay.capacity) || 2;
  const extraCapacity = Number(stay.extra_capacity) || 0;
  const maxGuests = capacity + extraCapacity;
  const rooms = Number(stay.rooms || stay.bedrooms) || 1;
  const area = Number(stay.area || stay.size) || 85;
  const price = Number(stay.price_per_night) || 0;
  const discount = Number(stay.discount) || 0;
  const rating = Number(stay.rating) || 4.5;
  const amenities = Array.isArray(stay.amenities) ? stay.amenities : [];
  const bio = `${stay.title || ""} ${stay.description || ""} ${stay.region || ""} ${stay.address || ""}`;

  // ۲. تشخیص هوشمند ویژگی‌های کلیدی
  const hasPool = hasKeyword(amenities, ["استخر", "آبگرم", "آب گرم"]);
  const hasJacuzzi = hasKeyword(amenities, ["جکوزی", "سونا"]);
  const hasGame = hasKeyword(amenities, [
    "بیلیارد",
    "فوتبال",
    "پینگ پنگ",
    "ایرهاکی",
    "بردگیم",
    "گیم",
  ]);
  const hasWifi = hasKeyword(amenities, [
    "وای‌فای",
    "اینترنت",
    "wifi",
    "پوشش شبکه",
    "آنتن",
  ]);
  const hasYardOrBBQ = hasKeyword(amenities, [
    "باربیکیو",
    "آلاچیق",
    "حیاط",
    "تراس",
    "بالکن",
    "آتشکده",
  ]);
  const isCoastal = hasKeyword(bio, ["ساحل", "دریا", "پلاژ"]);
  const isForest = hasKeyword(bio, [
    "جنگل",
    "کوه",
    "ییلاق",
    "دالخانی",
    "جواهرده",
    "طبیعت",
    "باغ",
  ]);
  const isPetFriendly = Boolean(
    stay.pet_allowed || hasKeyword(stay.rules, ["حیوان خانگی مجاز"]),
  );

  // ۳. لیست کاندیداهای پرسونا با امتیازدهی وزنی و متن‌ساز داینامیک
  const candidates = [
    {
      id: "luxury",
      title: "سفر لوکس و VIP",
      icon: HiOutlineSparkles,
      theme: "text-amber-400 bg-amber-500/10 hover:border-amber-500/40",
      score:
        (hasPool ? 45 : 0) +
        (hasJacuzzi ? 25 : 0) +
        (area >= 180 ? 20 : 0) +
        (price >= 3500000 ? 15 : 0) +
        (hasKeyword(bio, ["لوکس", "مدرن", "دوبلکس", "تریبلکس", "استخردار"])
          ? 20
          : 0),
      desc:
        hasPool && hasJacuzzi
          ? "مجهز به استخر آبگرم و جکوزی اختصاصی"
          : hasPool
            ? `استخر اختصاصی با ${area} متر زیربنای مدرن`
            : `معماری مدرن با ${rooms} اتاق خواب مستر`,
    },
    {
      id: "group_family",
      title: "خانواده و جمع دوستان",
      icon: HiOutlineUserGroup,
      theme: "text-sky-400 bg-sky-500/10 hover:border-sky-500/40",
      score:
        (maxGuests >= 6 ? 40 : maxGuests >= 4 ? 25 : 10) +
        (rooms >= 2 ? 25 : 0) +
        (hasGame ? 25 : 0) +
        (hasYardOrBBQ ? 15 : 0),
      desc: hasGame
        ? `ظرفیت تا ${maxGuests} نفر + امکانات تفریحی و بازی`
        : `${rooms} خوابه، مناسب جمع‌های تا ${maxGuests} نفر`,
    },
    {
      id: "nature",
      title: isCoastal ? "عاشقان ساحل و دریا" : "علاقه‌مندان طبیعت",
      icon: HiOutlineSun,
      theme: "text-emerald-400 bg-emerald-500/10 hover:border-emerald-500/40",
      score:
        (isCoastal ? 50 : 0) +
        (isForest ? 50 : 0) +
        (hasYardOrBBQ ? 20 : 0) +
        15, // امتیاز پایه برای ویلاهای شمال
      desc:
        isCoastal && isForest
          ? "ترکیب کم‌نظیر دسترسی به ساحل و جنگل"
          : isCoastal
            ? "موقعیت ساحلی عالی با دسترسی سریع به دریا"
            : "محیطی سرسبز، دنج و به دور از هیاهوی شهر",
    },
    {
      id: "couples",
      title: "سفر دونفره و رمانتیک",
      icon: HiOutlineHeart,
      theme: "text-rose-400 bg-rose-500/10 hover:border-rose-500/40",
      score:
        (capacity <= 4 ? 40 : 15) +
        (hasJacuzzi ? 35 : 0) +
        (hasPool ? 15 : 0) +
        (isCoastal || isForest ? 15 : 0),
      desc: hasJacuzzi
        ? "خلوت و دنج با جکوزی و چشم‌انداز عالی"
        : `فضایی آرام و ایده‌آل برای استراحت دو نفره`,
    },
    {
      id: "economic",
      title: "خوش‌قیمت و اقتصادی",
      icon: HiOutlineCash,
      theme: "text-teal-400 bg-teal-500/10 hover:border-teal-500/40",
      score:
        (discount >= 15 ? 60 : discount > 0 ? 40 : 0) +
        (price > 0 && price <= 2500000 ? 40 : 0) +
        (maxGuests >= 6 && price <= 4000000 ? 25 : 0), // به‌صرفه برای نفرات بالا
      desc:
        discount > 0
          ? `رزرو اقتصادی با ${discount}٪ تخفیف ویژه فعلی`
          : `ارزش خرید بالا نسبت به امکانات و ظرفیت ${maxGuests} نفره`,
    },
    {
      id: "remote_work",
      title: "دورکاری و اقامت طولانی",
      icon: HiOutlineWifi,
      theme: "text-indigo-400 bg-indigo-500/10 hover:border-indigo-500/40",
      score:
        (hasWifi ? 45 : 0) +
        (hasKeyword(amenities, ["لباسشویی", "آشپزخانه", "فرنگی"]) ? 25 : 0) +
        10,
      desc: "پوشش اینترنت و آنتن‌دهی عالی + تجهیزات کامل رفاهی",
    },
    {
      id: "entertainment",
      title: "تفریح و سرگرمی در ویلا",
      icon: HiOutlineEmojiHappy,
      theme: "text-purple-400 bg-purple-500/10 hover:border-purple-500/40",
      score:
        (hasGame ? 50 : 0) +
        (hasPool ? 30 : 0) +
        (hasKeyword(amenities, ["صوتی", "تلویزیون"]) ? 20 : 0) +
        (isPetFriendly ? 20 : 0),
      desc: "امکانات کامل سرگرمی بدون نیاز به خروج از اقامتگاه",
    },
    {
      id: "high_trust",
      title: "مورد تایید مهمانان قبلی",
      icon: HiOutlineShieldCheck,
      theme: "text-cyan-400 bg-cyan-500/10 hover:border-cyan-500/40",
      score:
        (rating >= 4.7 ? 45 : 25) +
        (hasKeyword(amenities, ["نگهبانی", "پارکینگ"]) ? 20 : 0),
      desc: `کسب امتیاز ${rating} از ۵ با امنیت و نظافت تضمین شده`,
    },
  ];

  // ۴. مرتب‌سازی بر اساس بالاترین امتیاز و انتخاب ۴ مورد برتر
  return candidates
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((item) => ({
      ...item,
      // تبدیل امتیاز به درصد تطابق (بین ۸۲٪ تا ۹۹٪ برای زیبایی نمایش در UI)
      matchPercent: Math.min(
        99,
        Math.max(82, Math.round(65 + item.score * 0.35)),
      ),
    }));
};
