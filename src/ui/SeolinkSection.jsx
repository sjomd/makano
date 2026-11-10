import { Link } from "react-router";

const seoLinks = [
  { id: 1, title: "اجاره ویلا در رامسر", url: "/s/ramsar-villa" },
  { id: 2, title: "اقامتگاه بوم‌گردی قشم", url: "/s/qeshm-ecolodge" },
  { id: 3, title: "اجاره روزانه خانه در تهران", url: "/s/tehran-house" },
  { id: 4, title: "اجاره کلبه جنگلی در ماسال", url: "/s/masal-cabin" },
  { id: 5, title: "اجاره ویلا استخردار کردان", url: "/s/kordan-pool-villa" },
  { id: 6, title: "سوئیت ارزان در مشهد", url: "/s/mashhad-suite" },
  { id: 7, title: "اجاره آپارتمان مبله در کیش", url: "/s/kish-apartment" },
  { id: 8, title: "ویلا ساحلی متل قو", url: "/s/motel-qoo-villa" },
  { id: 9, title: "اقامتگاه سنتی کاشان", url: "/s/kashan-traditional" },
  { id: 10, title: "اجاره کلبه چوبی شمال", url: "/s/shomal-wooden-cabin" },
  { id: 11, title: "رزرو اقامتگاه در اصفهان", url: "/s/isfahan-stays" },
  { id: 12, title: "اجاره ویلا لوکس لواسان", url: "/s/lavasan-luxury-villa" },
  { id: 13, title: "ویلا با میز بیلیارد", url: "/s/billiard-villa" },
  { id: 14, title: "اجاره ویلا برای تولد", url: "/s/birthday-villa" },
];

function SeoLinksSection() {
  return (
    <section
      className="w-full py-10 bg-base text-right border-t border-border/60"
      dir="rtl"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* عنوان و توضیحات کوتاه سئویی */}
        <div className="mb-6">
          <h3 className="font-PeydaBlack main text-sm sm:text-base mb-2">
            از شمال تا جنوب ایران، با مکانو جورِ جوره
          </h3>
          <p className="font-SansRegular muted text-[11px] sm:text-xs leading-relaxed max-w-4xl">
            سفر همیشه با خودش یک حال خوب دارد. چه به دنبال اجاره ویلا ساحلی در
            شمال باشید، چه رزرو یک اقامتگاه بوم‌گردی در دل کویر، مکانو بهترین
            گزینه‌ها را با تضمین کیفیت برای شما فراهم کرده است. با چند کلیک،
            اقامتگاه رویایی خود را پیدا کنید.
          </p>
        </div>

        {/* لیست کلمات کلیدی (لینک‌های سئو) */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {seoLinks.map((link) => (
            <Link
              key={link.id}
              to={link.url}
              className="font-SansRegular muted hover:text-primary text-[11px] sm:text-xs transition-colors whitespace-nowrap"
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SeoLinksSection;
