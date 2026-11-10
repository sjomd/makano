export const TRIP_TABS = [
  { id: "active", label: "سفرهای فعلی" },
  { id: "past", label: "سفرهای گذشته" },
];

export const STATUS_META = {
  pending_payment: {
    label: "در انتظار پرداخت",
    badgeClass: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    dotClass: "bg-amber-400 animate-pulse",
    actionText: "تکمیل پرداخت",
    isPrimaryAction: true,
    showTimer: true, // فعال‌سازی تایمر
  },
  pending_approval: {
    label: "در انتظار تایید میزبان",
    badgeClass: "bg-sky-500/15 text-sky-400 border-sky-500/30",
    dotClass: "bg-sky-400 animate-pulse",
    actionText: "جزئیات رزرو",
    isPrimaryAction: false,
    showTimer: false,
  },
  paid_waiting: {
    label: "پرداخت شده - منتظر ورود",
    badgeClass: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    dotClass: "bg-emerald-400",
    actionText: "اطلاعات ورود و لوکیشن",
    isPrimaryAction: false,
    showTimer: false,
  },
  completed: {
    label: "تمام شده",
    badgeClass: "bg-purple-500/15 text-purple-400 border-purple-500/30",
    dotClass: "bg-purple-400",
    actionText: "رزرو مجدد / ثبت نظر",
    isPrimaryAction: false,
    showTimer: false,
  },
  cancelled_by_user: {
    label: "لغو شده توسط شما",
    badgeClass: "bg-rose-500/15 text-rose-400 border-rose-500/30",
    dotClass: "bg-rose-400",
    actionText: "جزئیات لغو",
    isPrimaryAction: false,
    showTimer: false,
  },
  cancelled_by_admin: {
    label: "لغو شده توسط پشتیبانی",
    badgeClass: "bg-rose-500/15 text-rose-400 border-rose-500/30",
    dotClass: "bg-rose-400",
    actionText: "پیگیری پشتیبانی",
    isPrimaryAction: false,
    showTimer: false,
  },
};

export const MOCK_TRIPS = [
  {
    id: 1,
    bookingCode: "Mek-13042",
    title: "ویلا استخردار لوکس ساحلی",
    city: "رامسر، طالش محله",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=600&q=80",
    checkIn: "۲۴ مهر ۱۴۰۵",
    checkOut: "۲۶ مهر ۱۴۰۵",
    nights: 2,
    guests: 4,
    totalPrice: 8100000,
    status: "pending_payment", // در انتظار پرداخت همراه با تایمر
    paymentDeadline: Date.now() + 1000 * 60 * 45, // ۴۵ دقیقه دیگر
    isPast: false,
  },
  {
    id: 2,
    bookingCode: "Mek-12890",
    title: "کلبه سوئیسی جنگلی",
    city: "ماسال، اولسبلنگاه",
    image:
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=600&q=80",
    checkIn: "۰۵ آبان ۱۴۰۵",
    checkOut: "۰۷ آبان ۱۴۰۵",
    nights: 2,
    guests: 2,
    totalPrice: 6400000,
    status: "paid_waiting", // منتظر ورود
    isPast: false,
  },
  {
    id: 3,
    bookingCode: "Mek-11402",
    title: "آپارتمان مدرن مرکز شهر",
    city: "تهران، جردن",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80",
    checkIn: "۱۰ شهریور ۱۴۰۵",
    checkOut: "۱۱ شهریور ۱۴۰۵",
    nights: 1,
    guests: 2,
    totalPrice: 3500000,
    status: "completed", // تمام شده
    isPast: true,
  },
  {
    id: 4,
    bookingCode: "Mek-10921",
    title: "سوئیت دنج کوهستانی",
    city: "فشم",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80",
    checkIn: "۰۱ مرداد ۱۴۰۵",
    checkOut: "۰۲ مرداد ۱۴۰۵",
    nights: 1,
    guests: 3,
    totalPrice: 2800000,
    status: "cancelled_by_user", // لغو شده توسط کاربر
    isPast: true,
  },
];
