import { useState } from "react";
import { HiOutlineDuplicate, HiOutlineCheck } from "react-icons/hi";

export default function TripCardHeader({ meta, bookingCode }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(bookingCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3.5 border-b border-border/60">
      {/* بج وضعیت نئونی */}
      <div
        className={`inline-flex items-center gap-x-2 px-3 py-1 rounded-full text-[11px] font-PeydaBold border ${meta.badgeClass}`}
      >
        <span className={`w-2 h-2 rounded-full ${meta.dotClass}`} />
        <span>{meta.label}</span>
      </div>

      {/* دکمه کپی کد بوکینگ به سبک تیکت */}
      <button
        type="button"
        onClick={handleCopy}
        title="کپی کد رزرو"
        className="group flex items-center gap-x-1.5 bg-card hover:border-primary/50 border border-border px-2.5 py-1 rounded-xl text-[11px] transition-all cursor-pointer"
      >
        <span className="text-muted font-PeydaLight">کد رزرو:</span>
        <span className="font-mono font-bold text-main tracking-wider group-hover:text-primary transition-colors">
          {bookingCode}
        </span>
        {copied ? (
          <HiOutlineCheck className="text-emerald-400 text-sm" />
        ) : (
          <HiOutlineDuplicate className="text-muted group-hover:text-primary text-sm transition-colors" />
        )}
      </button>
    </div>
  );
}
