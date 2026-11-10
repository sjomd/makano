import { TRIP_TABS } from "./tripsConfig";

export default function TripsFilterBar({
  activeTab,
  setActiveTab,
  counts = {},
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-border">
      {/* عنوان و توضیح کوتاه */}
      <div>
        <h1 className="text-base sm:text-lg font-PeydaBold text-main">
          سفرهای من
        </h1>
        <p className="text-xs text-muted font-PeydaLight mt-1">
          مدیریت رزروهای فعلی و مشاهده تاریخچه سفرهای قبلی
        </p>
      </div>

      {/* سوییچ کپسولی ۲ حالته (Segmented Control) با شمارنده */}
      <div className="bg-base border border-border p-1.5 rounded-2xl flex items-center gap-1 self-stretch sm:self-auto">
        {TRIP_TABS.map(({ id, label }) => {
          const isActive = activeTab === id;
          const count = counts[id] || 0;

          return (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-x-2 px-4 py-2 rounded-xl text-xs font-PeydaBold transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "text-muted hover:text-main"
              }`}
            >
              <span>{label}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-card border border-border text-muted"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
