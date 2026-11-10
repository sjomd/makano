import { IoSearchSharp } from "react-icons/io5";
import {
  HiOutlineLocationMarker,
  HiOutlineCalendar,
  HiOutlineUser,
} from "react-icons/hi";

function DesktopHeroSearch() {
  return (
    <div
      id="hero-search-box"
      className="hidden lg:flex w-full bg-card border border-border rounded-full p-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
    >
      <div className="flex items-center w-full divide-x divide-x-reverse divide-border">
        <button
          type="button"
          className="flex-1 flex items-center gap-x-3 px-6 py-2 hover:bg-base rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
        >
          <HiOutlineLocationMarker className="text-2xl text-muted" />
          <div className="flex flex-col text-right">
            <span className="text-sm font-SansDemiBold text-main">مقصد</span>
            <span className="text-xs text-muted font-SansRegular mt-1 truncate max-w-30">
              هر کجا که بخواهید
            </span>
          </div>
        </button>

        <button
          type="button"
          className="flex-1 flex items-center gap-x-3 px-6 py-2 hover:bg-base rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
        >
          <HiOutlineCalendar className="text-2xl text-muted" />
          <div className="flex flex-col text-right">
            <span className="text-sm font-SansDemiBold text-main">
              تاریخ ورود
            </span>
            <span className="text-xs text-muted font-SansRegular mt-1">
              ۱۴۰۳/۰۴/۲۵
            </span>
          </div>
        </button>

        <button
          type="button"
          className="flex-1 flex items-center gap-x-3 px-6 py-2 hover:bg-base rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
        >
          <HiOutlineCalendar className="text-2xl text-muted" />
          <div className="flex flex-col text-right">
            <span className="text-sm font-SansDemiBold text-main">
              تاریخ خروج
            </span>
            <span className="text-xs text-muted font-SansRegular mt-1">
              ۱۴۰۳/۰۴/۲۸
            </span>
          </div>
        </button>

        <button
          type="button"
          className="flex-1 flex items-center gap-x-3 px-6 py-2 hover:bg-base rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
        >
          <HiOutlineUser className="text-2xl text-muted" />
          <div className="flex flex-col text-right">
            <span className="text-sm font-SansDemiBold text-main">مسافران</span>
            <span className="text-xs text-muted font-SansRegular mt-1">
              ۲ بزرگسال
            </span>
          </div>
        </button>

        <div className="pr-2 pl-1">
          <button
            type="submit"
            aria-label="جستجوی اقامتگاه"
            className="flex items-center justify-center gap-x-2 bg-primary hover:bg-primary-hover text-white h-12 px-8 rounded-full font-SansMedium text-sm transition-all duration-300 active:scale-95 shadow-[0_4px_15px_rgba(37,99,235,0.3)]"
          >
            <IoSearchSharp className="text-xl" />
            <span>جستجو</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default DesktopHeroSearch;
