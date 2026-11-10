import { NavLink } from "react-router";
import { HiOutlineLogout, HiOutlineShieldCheck } from "react-icons/hi";

export default function AppSidebar({
  user,
  navItems = [],
  footerSlot,
  onLogout,
}) {
  const name = user?.full_name || "کاربر مکانو";
  const subText = user?.phone ? user?.phone : user?.role;
  const avatar = user?.avatar_url;

  return (
    <aside className="hidden lg:flex lg:col-span-3 sticky top-6 flex-col justify-between bg-card border border-border rounded-[28px] p-5 shadow-2xl min-h-[calc(100vh-3rem)] relative overflow-hidden">
      <div className="absolute -top-12 -right-12 w-36 h-36 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="space-y-6 relative z-10">
        {/* هدر پروفایل (کاربر یا ادمین) */}
        <div className="bg-base border border-border rounded-2xl p-3.5 flex items-center gap-x-3">
          <div className="relative shrink-0">
            <div className="w-11 h-11 rounded-2xl bg-primary/15 border border-primary/30 text-primary font-PeydaBold text-base flex items-center justify-center overflow-hidden">
              {avatar ? (
                <img
                  src={avatar}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              ) : (
                name.charAt(0)
              )}
            </div>
            <span className="absolute -bottom-1 -left-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-base flex items-center justify-center">
              <HiOutlineShieldCheck className="text-[10px] text-white" />
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-xs sm:text-sm font-PeydaBold text-main truncate">
              {name}
            </h2>
            <span className="text-[11px] text-muted font-PeydaLight block mt-0.5 truncate">
              {subText}
            </span>
          </div>
        </div>

        {/* لیست لینک‌های داینامیک */}
        <nav className="space-y-1.5">
          {navItems.map(({ id, label, path, icon: Icon, badge }) => (
            <NavLink
              key={id}
              to={path}
              className={({ isActive }) =>
                `group flex items-center justify-between px-4 py-3 rounded-2xl text-xs xl:text-sm font-PeydaBold transition-all duration-200 ${
                  isActive
                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                    : "text-muted hover:text-main hover:bg-base border border-transparent hover:border-border"
                }`
              }
            >
              <div className="flex items-center gap-x-3">
                <Icon className="text-lg shrink-0 transition-transform group-hover:scale-110" />
                <span>{label}</span>
              </div>
              {badge && (
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-base/30 border border-white/15">
                  {badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* فوتر سایدبار: اسلات دلخواه + دکمه خروج */}
      <div className="space-y-3 pt-5 mt-5 border-t border-border relative z-10">
        {footerSlot}
        <button
          type="button"
          onClick={onLogout}
          className="w-full flex items-center gap-x-3 px-4 py-3 rounded-2xl text-xs font-PeydaBold text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all cursor-pointer"
        >
          <HiOutlineLogout className="text-lg shrink-0" />
          <span>خروج از حساب کاربری</span>
        </button>
      </div>
    </aside>
  );
}
