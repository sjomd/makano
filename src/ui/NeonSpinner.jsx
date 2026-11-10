export default function NeonSpinner({ className = "" }) {
  return (
    <div
      className={`relative flex items-center justify-center w-14 h-14 ${className}`}
    >
      {/* ۱. هاله نورانی پس‌زمینه (Glow) که پالس می‌زند */}
      <div className="absolute inset-0 rounded-full bg-primary/30 blur-lg animate-pulse"></div>

      {/* ۲. حلقه اصلی و بیرونی (چرخش عادی) */}
      <div className="absolute inset-0 rounded-full border-y-[3px] border-x-px border-transparent border-t-primary border-b-primary/50 animate-spin shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]"></div>

      {/* ۳. حلقه داخلی (چرخش برعکس و نرم‌تر) */}
      <div className="absolute inset-2.5 rounded-full border-y-2px border-x-px border-transparent border-r-primary border-l-primary/50 animate-[spin_1.2s_linear_infinite_reverse]"></div>

      {/* ۴. نقطه درخشان مرکزی */}
      <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_var(--primary)] animate-ping"></div>
    </div>
  );
}
