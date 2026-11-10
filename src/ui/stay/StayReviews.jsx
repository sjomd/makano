import { HiStar } from "react-icons/hi";

const DUMMY_REVIEWS = [
  {
    name: "علی رضایی",
    date: "شهریور ۱۴۰۵",
    rate: "۵.۰",
    text: "ویلا از عکس‌هاش هم قشنگ‌تر و تمیزتر بود! آب استخر کاملاً گرم و زلال بود و میزبان بسیار محترم بودن.",
  },
  {
    name: "سارا محمدی",
    date: "مرداد ۱۴۰۵",
    rate: "۴.۸",
    text: "امکانات آشپزخانه کامل بود و امنیت شهرک فوق‌العاده بالا بود. برای سفر خانوادگی بهترین انتخابه.",
  },
];

export default function StayReviews({
  rating = "۴.۹",
  count = 12,
  reviews = DUMMY_REVIEWS,
}) {
  return (
    <section className="bg-card border border-border rounded-[28px] p-6 shadow-lg">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-base sm:text-lg font-PeydaBold text-main">
            نظرات مهمانان
          </h2>
          <span className="text-[11px] text-muted font-PeydaLight">
            تجربه واقعی مسافران قبلی
          </span>
        </div>
        <div className="flex items-center gap-x-1.5 bg-base border border-border px-3 py-1.5 rounded-2xl">
          <HiStar className="text-amber-400 text-base" />
          <span className="text-sm font-PeydaBold text-main">{rating}</span>
          <span className="text-[10px] text-muted font-PeydaLight">
            ({count} نظر)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviews.map(({ name, date, rate, text }, idx) => (
          <div
            key={idx}
            className="bg-base border border-border rounded-2xl p-4 flex flex-col justify-between space-y-3 hover:border-primary/30 transition-colors"
          >
            <p className="text-xs text-muted leading-6 font-PeydaLight">
              "{text}"
            </p>
            <div className="flex items-center justify-between pt-3 border-t border-border/60">
              <div className="flex items-center gap-x-2.5">
                <div className="w-8 h-8 rounded-full bg-primary/15 text-primary font-PeydaBold text-xs flex items-center justify-center">
                  {name.charAt(0)}
                </div>
                <div>
                  <span className="text-xs font-PeydaBold text-main block">
                    {name}
                  </span>
                  <span className="text-[10px] text-muted font-PeydaLight">
                    {date}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-x-1 bg-card border border-border px-2 py-1 rounded-lg">
                <span className="text-[11px] font-PeydaBold text-main">
                  {rate}
                </span>
                <HiStar className="text-amber-400 text-xs" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
