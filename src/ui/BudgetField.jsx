import { usePropertyStore } from "../hooks/usePropertyStore";

// مبالغ پیشنهادی سریع (چیپ‌های آماده برای انتخاب سریع کاربر)
const QUICK_BUDGETS = [
  { label: "تا 6 میلیون", value: 6000000 },
  { label: "تا 15 میلیون", value: 15000000 },
  { label: "تا 4۰ میلیون", value: 40000000 },
  { label: "بدون محدودیت", value: "" },
];

export default function BudgetField() {
  const totalBudget = usePropertyStore((state) => state.totalBudget);
  const nights = usePropertyStore((state) => state.nights);
  const price_per_night = usePropertyStore((state) => state.price_per_night);
  const setTotalBudget = usePropertyStore((state) => state.setTotalBudget);

  return (
    <div
      className="w-full space-y-4 font-SansRegular animate-fade-in select-none"
      dir="rtl"
    >
      {/* هدر بخش */}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-PeydaBold text-sm text-main">بودجه سفر</h4>
          <p className="text-[11px] text-muted mt-0.5">
            {nights > 0
              ? ` محاسبه برای ${nights} شب اقامت `
              : "حداکثر بودجه کل یا هر شب"}
          </p>
        </div>

        {totalBudget && (
          <button
            type="button"
            onClick={() => setTotalBudget("")}
            className="text-[11px] text-red-500 hover:underline cursor-pointer"
          >
            پاک کردن فیلتر
          </button>
        )}
      </div>

      {/* اینپوت اصلی مبلغ کل */}
      <div className="relative flex items-center">
        <input
          type="text"
          inputMode="numeric"
          placeholder="مثلاً ۱۰,۰۰۰,۰۰۰"
          value={totalBudget ? Number(totalBudget).toLocaleString("en-US") : ""}
          onChange={(e) => setTotalBudget(e.target.value)}
          dir="ltr"
          className="w-full px-4 py-3 text-sm rounded-2xl card text-main placeholder:text-muted focus:outline-none focus:border-primary transition-all pl-16 text-left font-SansMedium"
        />
        <span className="absolute left-4 text-xs text-muted pointer-events-none">
          تومان
        </span>
      </div>

      {/* چیپ‌های پیش‌فرض سریع */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-SansMedium text-muted px-1">
          انتخاب سریع بودجه کل
        </span>
        <div className="grid grid-cols-2 gap-2">
          {QUICK_BUDGETS.map((item, idx) => {
            const isSelected = String(totalBudget) === String(item.value);
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setTotalBudget(item.value)}
                className={`py-2 px-3 rounded-xl text-xs transition-all cursor-pointer border flex items-center justify-center ${
                  isSelected
                    ? "bg-primary/10 border-primary text-primary font-SansDemiBold"
                    : "card text-main hover:border-primary/50"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* باکس محاسبه هوشمند قیمت هر شب */}
      {price_per_night > 0 && (
        <div className="p-3 rounded-2xl bg-primary/5 border border-primary/20 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-muted">حداکثر قیمت هر شب:</span>
          </div>
          <span className="font-SansDemiBold text-primary">
            {price_per_night.toLocaleString("fa-IR")} تومان
          </span>
        </div>
      )}
    </div>
  );
}
