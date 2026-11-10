import { useState, useEffect } from "react";
import { HiOutlineClock } from "react-icons/hi";

export default function TripPaymentTimer({ deadline }) {
  const [timeLeft, setTimeLeft] = useState(() =>
    Math.max(0, deadline - Date.now()),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = Math.max(0, deadline - Date.now());
      setTimeLeft(remaining);
    }, 1000);
    return () => clearInterval(timer);
  }, [deadline]);

  if (timeLeft <= 0) {
    return (
      <span className="text-[11px] text-rose-400 bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-xl font-PeydaBold">
        مهلت پرداخت منقضی شد
      </span>
    );
  }

  const mins = String(Math.floor((timeLeft / 1000 / 60) % 60)).padStart(2, "0");
  const secs = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, "0");

  return (
    <div className="flex items-center justify-between sm:justify-start gap-x-2 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-xl text-amber-400">
      <div className="flex items-center gap-x-1 text-[11px] font-PeydaMedium">
        <HiOutlineClock className="text-sm animate-pulse shrink-0" />
        <span>مهلت پرداخت:</span>
      </div>
      <span className="font-mono text-xs font-bold tracking-widest tabular-nums bg-card/80 px-2 py-0.5 rounded-lg border border-amber-500/20">
        {mins}:{secs}
      </span>
    </div>
  );
}
