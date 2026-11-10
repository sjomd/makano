import { Link } from "react-router"; // استفاده از Link مخصوص ریکت

function BottomNavItem({ to, icon, activeIcon, text, isActive }) {
  return (
    <li className="flex-1 flex justify-center">
      <Link
        to={to}
        aria-current={isActive ? "page" : undefined}
        className={`group relative flex flex-col items-center justify-center w-full min-w-16 py-2 gap-y-1.5 transition-all duration-300 rounded-2xl active:scale-95 ${
          isActive ? "text-main" : "text-muted hover:text-main"
        }`}
      >
        {/* افکت پس‌زمینه شناور */}
        <div
          className={`absolute inset-0 rounded-xl transition-colors duration-300 -z-10 ${
            isActive ? "bg-base/50" : "group-hover:bg-base/30"
          }`}
        ></div>

        {/* آیکون با انیمیشن پرش و بزرگ‌نمایی نرم */}
        <span
          className={`text-[22px] sm:text-2xl transition-transform duration-300 ${
            isActive ? "scale-110 -translate-y-0.5" : "scale-100"
          }`}
        >
          {isActive ? activeIcon : icon}
        </span>

        {/* متن واکنش‌گرا */}
        <span
          className={`font-SansMedium text-[10px] min-[380px]:text-[11px] sm:text-xs transition-all duration-300 ${
            isActive ? "font-bold" : "font-normal"
          }`}
        >
          {text}
        </span>
      </Link>
    </li>
  );
}

export default BottomNavItem;
