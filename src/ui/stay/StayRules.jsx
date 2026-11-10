import { useGetSettings } from "@/hooks/settings/useGetSettings";
import { useRules } from "@/hooks/stays/useFiltersData";
import {
  HiOutlineClock,
  HiOutlineXCircle,
  HiOutlineCheckCircle,
} from "react-icons/hi";

export default function StayRules({ stayRules }) {
  const { rules, isLoading } = useRules();
  const { settings } = useGetSettings();
  if (isLoading || !stayRules) return null;
  const appSettings = settings?.[0] || {};
  const cabinRules = stayRules.map((item) => item.rules.slug);

  const times = [
    {
      label: "ساعت ورود",
      val: `${appSettings.default_check_in} به بعد`,
      color: "text-emerald-400 bg-emerald-500/10",
    },
    {
      label: "ساعت خروج",
      val: ` تا ${appSettings.default_check_out} ظهر`,
      color: "text-rose-400 bg-rose-500/10",
    },
  ];

  return (
    <section className="bg-card border border-border rounded-[28px] p-6 shadow-lg">
      <h2 className="text-[16px] sm:text-lg font-PeydaBold text-main mb-4">
        مقررات و زمان‌بندی اقامتگاه
      </h2>

      <div className="grid grid-cols-2 gap-3.5 mb-4">
        {times.map(({ label, val, color }, i) => (
          <div
            key={i}
            className="bg-base border border-border rounded-2xl p-3.5 flex items-center gap-x-3"
          >
            <div
              className={`w-9 h-9 rounded-xl ${color} flex items-center justify-center shrink-0`}
            >
              <HiOutlineClock className="text-lg" />
            </div>
            <div>
              <span className="text-[10px] text-muted block font-PeydaLight">
                {label}
              </span>
              <span className="text-xs sm:text-sm font-PeydaBold text-main">
                {val}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        {rules.map(({ name, slug }, i) => {
          const isAllowed = cabinRules.includes(slug);
          return (
            <div
              key={i}
              className="bg-base border border-border rounded-xl p-3 flex items-center gap-x-2 text-main"
            >
              {isAllowed ? (
                <HiOutlineCheckCircle className="text-emerald-400 text-lg shrink-0" />
              ) : (
                <HiOutlineXCircle className="text-rose-500 text-lg shrink-0" />
              )}
              <span>{name}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
