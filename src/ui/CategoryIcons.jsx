// ویژگی‌های ثابت برای تمام آیکون‌ها جهت حفظ یکپارچگی ظاهری
const svgProps = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  strokeWidth: "1.5",
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

// ۱. بوم‌گردی (نماد گنبد و بادگیر معماری مرکز ایران)
export const EcoLodgeIcon = ({ className = "w-6 h-6" }) => (
  <svg {...svgProps} className={className}>
    {/* بدنه اصلی که با تم دارک و لایت تغییر رنگ می‌دهد */}
    <path
      d="M4 21h16 M7 21v-4a5 5 0 0 1 10 0v4 M10 13V5h4v8 M12 5v8"
      stroke="currentColor"
    />
    {/* جزئیات آیکون با رنگ اختصاصی (primary) سایت شما */}
    <path d="M9 7h6 M9 10h6" className="stroke-primary" />
  </svg>
);

// ۲. کلبه سوئیسی (نماد سقف‌های مثلثی A-Frame)
export const SwissCabinIcon = ({ className = "w-6 h-6" }) => (
  <svg {...svgProps} className={className}>
    <path d="M12 3L3 21h18z M10 21v-4a2 2 0 0 1 4 0v4" stroke="currentColor" />
    <path d="M12 10v.01" strokeWidth="2.5" className="stroke-primary" />
    <path d="M7 14h10" className="stroke-primary" />
  </svg>
);

// ۳. لوکس و VIP (نماد تاج مینیمال پادشاهی)
export const LuxuryIcon = ({ className = "w-6 h-6" }) => (
  <svg {...svgProps} className={className}>
    <path d="M5 21h14 M5 21V9l3 4 4-7 4 7 3-4v12" stroke="currentColor" />
    <path
      d="M5 6v.01 M12 3v.01 M19 6v.01"
      strokeWidth="3"
      className="stroke-primary"
    />
  </svg>
);

// ۴. ویلایی (نماد سقف عریض و خطوط استخر/مدرن)
export const VillaIcon = ({ className = "w-6 h-6" }) => (
  <svg {...svgProps} className={className}>
    <path d="M3 10h18 M5 10v11 M19 10v11 M10 21v-5h4v5" stroke="currentColor" />
    <path d="M5 15h14 M2 21h20" className="stroke-primary" />
  </svg>
);

// ۵. آپارتمان (نماد ساختمان بلند)
export const ApartmentIcon = ({ className = "w-6 h-6" }) => (
  <svg {...svgProps} className={className}>
    <path
      d="M7 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16 M4 21h16"
      stroke="currentColor"
    />
    <path
      d="M10 7h4 M10 11h4 M10 15h4"
      strokeWidth="2"
      className="stroke-primary"
    />
  </svg>
);

// ۶. اقتصادی (نماد خانه کوچک و سکه)
export const EconomicIcon = ({ className = "w-6 h-6" }) => (
  <svg {...svgProps} className={className}>
    <path d="M8 21H4v-7l8-6 8 6v2" stroke="currentColor" />
    <circle cx="16" cy="16" r="4" className="stroke-primary" />
    <path d="M16 14.5v3" className="stroke-primary" />
  </svg>
);
