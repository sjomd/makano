import { VIBE_STATS } from "./stayDetailsConfig";

export default function StayVibeBanner() {
  return (
    <section className="relative rounded-[28px] overflow-hidden border border-border shadow-2xl bg-card">
      <div className="absolute inset-0 bg-gradient-to-l from-card via-card/95 to-primary/20 z-10" />
      <div className="relative z-20 p-6 sm:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-xl space-y-2">
          <span className="inline-block bg-primary/15 border border-primary/30 text-primary text-[10px] font-PeydaBold px-3 py-1 rounded-full">
            تضمین کیفیت مکانو
          </span>
          <h2 className="text-lg font-PeydaBold text-main">
            تجربه‌ای فراتر از یک اقامت معمولی
          </h2>
          <p className="text-xs text-muted leading-6 font-PeydaLight">
            تلفیقی از معماری مدرن، آرامش ساحل و امکانات هتل ۵ ستاره. جزو ۱۰٪
            ویلاهای برتر از نظر رضایت مسافران.
          </p>
        </div>

        <div className="flex items-center divide-x divide-x-reverse divide-border bg-base/80 backdrop-blur-md border border-border p-3.5 rounded-2xl shrink-0 self-stretch sm:self-auto justify-around">
          {VIBE_STATS.map(({ value, label, color }, idx) => (
            <div key={idx} className="text-center px-3 sm:px-4">
              <span className={`block text-base font-PeydaBold ${color}`}>
                {value}
              </span>
              <span className="text-[10px] text-muted font-PeydaLight">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
