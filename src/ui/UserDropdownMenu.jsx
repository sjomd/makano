import { Link } from "react-router";
import { HiOutlineLogout, HiChevronLeft } from "react-icons/hi";
import { PROFILE_NAV_ITEMS } from "@/ui/profile/profilenavConfig";
import { logout } from "@/services/authApi";

export default function UserDropdownMenu({ onClose, phone, role }) {
  return (
    <div className="absolute left-0 top-full mt-2.5 w-60 bg-card/95 backdrop-blur-xl border border-border rounded-3xl p-2 shadow-2xl z-50">
      {/* هدر کوچک اطلاعات داخل منو */}
      <div className="px-3.5 py-2.5 mb-1.5 border-b border-border/60 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-muted block font-PeydaLight">
            شماره همراه
          </span>
          <span className="text-xs font-mono font-bold text-main tracking-wider">
            {phone && phone}
          </span>
        </div>
        <span className="text-[10px] font-PeydaBold bg-primary/15 text-primary border border-primary/30 px-2 py-0.5 rounded-full">
          {role}
        </span>
      </div>

      {/* آیتم‌های منو */}
      <div className="space-y-1">
        {PROFILE_NAV_ITEMS.map(({ id, label, path, icon: Icon }) => (
          <Link
            key={id}
            to={path}
            onClick={onClose}
            className="flex items-center justify-between px-3 py-2.5 rounded-2xl text-xs font-PeydaMedium text-muted hover:text-main hover:bg-base transition-all group"
          >
            <div className="flex items-center gap-x-2.5">
              <Icon className="text-base text-primary group-hover:scale-110 transition-transform" />
              <span>{label}</span>
            </div>
            <HiChevronLeft className="text-xs opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
          </Link>
        ))}
      </div>

      {/* دکمه خروج */}
      <button
        type="button"
        onClick={() => logout()}
        className="w-full mt-1.5 pt-2 border-t border-border/60 flex items-center gap-x-2.5 px-3 py-2.5 rounded-2xl text-xs font-PeydaBold text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
      >
        <HiOutlineLogout className="text-base" />
        <span>خروج از حساب</span>
      </button>
    </div>
  );
}
