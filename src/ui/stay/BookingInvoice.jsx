import { formatToman } from "@/utils/helpers";

export default function BookingInvoice({ invoice }) {
  if (!invoice || invoice.totalNights <= 0) return null;

  const {
    totalNights,
    normalNights,
    normalTotal,
    weekendNights,
    weekendPercent,
    weekendTotal,
    holidayNights,
    holidayPercent,
    holidayTotal,
    extraGuestsCount,
    extraGuestFee,
    extraGuestsTotal,
    totalPayable,
  } = invoice;

  return (
    <div className="bg-base border border-border rounded-2xl p-4 space-y-2.5 text-xs animate-fadeIn">
      {/* ۱. شب‌های عادی */}
      {normalNights > 0 && (
        <div className="flex items-center justify-between text-muted">
          <span>{normalNights} شب عادی</span>
          <span className="text-main font-PeydaMedium">
            {formatToman(normalTotal)} تومان
          </span>
        </div>
      )}

      {/* ۲. شب‌های آخر هفته */}
      {weekendNights > 0 && (
        <div className="flex items-center justify-between text-muted">
          <span>
            {weekendNights} شب آخر هفته ({weekendPercent}%+)
          </span>
          <span className="text-main font-PeydaMedium">
            {formatToman(weekendTotal)} تومان
          </span>
        </div>
      )}

      {/* ۳. شب‌های تعطیل */}
      {holidayNights > 0 && (
        <div className="flex items-center justify-between text-muted">
          <span>
            {holidayNights} شب تعطیلات ({holidayPercent}%+)
          </span>
          <span className="text-main font-PeydaMedium">
            {formatToman(holidayTotal)} تومان
          </span>
        </div>
      )}

      {/* ۴. نفرات اضافه */}
      {extraGuestsCount > 0 && (
        <div className="flex items-center justify-between text-muted">
          <span>
            {extraGuestsCount} نفر اضافه (شبی {formatToman(extraGuestFee)})
          </span>
          <span className="text-main font-PeydaMedium">
            {formatToman(extraGuestsTotal)} تومان
          </span>
        </div>
      )}

      {/* ۵. جمع کل قابل پرداخت */}
      <div className="pt-3 border-t border-border flex items-center justify-between">
        <span className="font-PeydaBold text-main text-xs sm:text-sm">
          مبلغ قابل پرداخت ({totalNights} شب)
        </span>
        <div className="flex items-baseline gap-x-1">
          <span className="text-lg sm:text-xl font-PeydaBold text-primary">
            {formatToman(totalPayable)}
          </span>
          <span className="text-[11px] text-muted font-PeydaLight">تومان</span>
        </div>
      </div>
    </div>
  );
}
