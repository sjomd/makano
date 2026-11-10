export default function AccountHeaderCard({ fullName = "امید رضایی" }) {
  return (
    <div className="bg-base border border-border rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-5">
      <div className="relative">
        <div className="w-20 h-20 rounded-2xl bg-primary/20 border border-primary/40 text-primary font-PeydaBold text-2xl flex items-center justify-center overflow-hidden shadow-inner">
          {fullName.charAt(4)}
        </div>
      </div>
      <div className="space-y-1 text-center sm:text-right flex-1">
        <h3 className="text-sm sm:text-base font-PeydaBold text-main">
          {fullName}
        </h3>
        <span className="text-xs text-muted font-PeydaLight block">
          مسافر تایید شده مکانو
        </span>
        <p className="text-[11px] text-primary pt-1">
          برای تغییر تصویر پروفایل روی آن کلیک کنیدffff
        </p>
      </div>
    </div>
  );
}
