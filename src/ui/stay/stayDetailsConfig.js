import {
  HiOutlineHeart,
  HiOutlineSun,
  HiOutlineUserGroup,
  HiOutlineSparkles,
  HiOutlineFire,
  HiOutlineWifi,
  HiOutlineHome,
} from "react-icons/hi";

export const PERSONA_ITEMS = [
  {
    title: "سفر دونفره",
    desc: "محیطی دنج و رمانتیک",
    icon: HiOutlineHeart,
    theme: "text-rose-400 bg-rose-500/10 hover:border-rose-500/40",
  },
  {
    title: "علاقه‌مندان طبیعت",
    desc: "چشم‌انداز بکر و هوای پاک",
    icon: HiOutlineSun,
    theme: "text-emerald-400 bg-emerald-500/10 hover:border-emerald-500/40",
  },
  {
    title: "خانواده و دوستان",
    desc: "فضای وسیع و تفریحی",
    icon: HiOutlineUserGroup,
    theme: "text-sky-400 bg-sky-500/10 hover:border-sky-500/40",
  },
  {
    title: "سفر لوکس",
    desc: "معماری مدرن و استخر آبگرم",
    icon: HiOutlineSparkles,
    theme: "text-amber-400 bg-amber-500/10 hover:border-amber-500/40",
  },
];

export const AMENITY_CATEGORIES = [
  {
    title: "امکانات ویژه و تفریحی",
    icon: HiOutlineFire,
    items: [
      "استخر آبگرم سرپوشیده",
      "جکوزی ۴ نفره",
      "میز بیلیارد حرفه‌ای",
      "آلاچیق و باربیکیو",
    ],
  },
  {
    title: "تجهیزات رفاهی و رسانه",
    icon: HiOutlineWifi,
    items: [
      "اینترنت وای‌فای رایگان",
      "تلویزیون هوشمند ۵۵ اینچ",
      "سیستم صوتی حرفه‌ای",
      "اسپلیت و گرمایش از کف",
    ],
  },
  {
    title: "آشپزخانه و امنیت",
    icon: HiOutlineHome,
    items: [
      "آشپزخانه فول فرنیش",
      "ماشین لباسشویی و ظرفشویی",
      "پارکینگ مسقف (۳ خودرو)",
      "نگهبانی ۲۴ ساعته شهرک",
    ],
  },
];

export const VIBE_STATS = [
  { value: "۹۸٪", label: "رضایت از نظافت", color: "text-emerald-400" },
  { value: "۲۴/۷", label: "پشتیبانی میزبان", color: "text-sky-400" },
  { value: "۴.۸", label: "امتیاز کل", color: "text-amber-400" },
];
