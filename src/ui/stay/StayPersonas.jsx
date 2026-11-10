import { useMemo } from "react";
import { HiOutlineSparkles } from "react-icons/hi";
import { getMatchedPersonas } from "@/utils/personaEvaluator";

export default function StayPersonas({ stay }) {
  const matchedPersonas = useMemo(() => {
    return getMatchedPersonas(stay);
  }, [stay]);

  if (!matchedPersonas.length) return null;

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base sm:text-lg font-PeydaBold text-main flex items-center gap-x-2">
          <HiOutlineSparkles className="text-primary text-xl" />
          <span>مناسب برای چه کسانی؟</span>
        </h2>
        <span className="text-[11px] text-muted font-PeydaLight hidden sm:block">
          آنالیز هوشمند بر اساس امکانات، متراژ و موقعیت ویلا
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        {matchedPersonas.map(
          ({ id, title, desc, icon: Icon, theme, matchPercent }) => {
            const [textColor, bgColor, borderHover] = theme.split(" ");

            return (
              <div
                key={id}
                className={`relative bg-card border border-border ${borderHover} rounded-3xl p-4 flex flex-col items-center text-center group transition-all duration-300 hover:-translate-y-1 shadow-lg`}
              >
                {/* بج درصد تطابق هوشمند */}
                <span
                  className={`absolute top-3 left-3 text-[9px] font-PeydaBold px-2 py-0.5 rounded-full ${bgColor} ${textColor}`}
                >
                  {matchPercent}٪ تطابق
                </span>

                <div
                  className={`w-12 h-12 rounded-2xl ${bgColor} ${textColor} flex items-center justify-center mt-2 mb-3 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="text-2xl" />
                </div>

                <h3 className="text-xs sm:text-sm font-PeydaBold text-main mb-1.5">
                  {title}
                </h3>

                <p className="text-[10px] sm:text-[11px] text-muted leading-5 font-PeydaLight">
                  {desc}
                </p>
              </div>
            );
          },
        )}
      </div>
    </section>
  );
}
