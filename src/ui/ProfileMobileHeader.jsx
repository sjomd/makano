import { NavLink } from "react-router";
import { HiOutlineLogout } from "react-icons/hi";

export default function ProfileMobileHeader({ user, navItems = [], onLogout }) {
  const name = user?.full_name || "کاربر مکانو";
  const subText = user?.phone ? user?.phone : user?.role;

  return (
    <header className="lg:hidden sticky top-0 z-40 bg-card/90 backdrop-blur-xl border-b border-border px-4 py-3 shadow-lg">
      <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-border/60">
        <div className="flex items-center gap-x-2.5">
          {user?.avatar_url ? (
            <img
              className="w-8 h-8 rounded-xl bg-primary/15 border border-primary/30 text-primary font-PeydaBold text-xs flex items-center justify-center"
              src={user?.avatar_url}
            />
          ) : (
            <div className="w-8 h-8 rounded-xl bg-primary/15 border border-primary/30 text-primary font-PeydaBold text-xs flex items-center justify-center">
              {name.charAt(0)}
            </div>
          )}

          <div>
            <h2 className="text-xs font-PeydaBold text-main">{name}</h2>
            <span className="text-[10px] text-muted font-PeydaLight block">
              {subText}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={onLogout}
          className="text-rose-400 hover:bg-rose-500/10 px-2.5 py-1.5 rounded-xl transition-colors flex items-center gap-x-1 text-[11px] font-PeydaMedium cursor-pointer"
        >
          <HiOutlineLogout className="text-base" />
          <span>خروج</span>
        </button>
      </div>

      <nav className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
        {navItems.map(({ id, label, path, icon: Icon, badge }) => (
          <NavLink
            key={id}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-x-1.5 px-3.5 py-2 rounded-xl text-xs font-PeydaBold shrink-0 transition-all ${
                isActive
                  ? "bg-primary text-white shadow-md shadow-primary/25"
                  : "bg-base text-muted hover:text-main border border-border"
              }`
            }
          >
            <Icon className="text-base shrink-0" />
            <span>{label}</span>
            {badge && (
              <span className="px-1.5 rounded-full text-[10px] bg-white/20">
                {badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
