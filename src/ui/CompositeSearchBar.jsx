import { createPortal } from "react-dom";
import {
  HiOutlineLocationMarker,
  HiOutlineCalendar,
  HiOutlineUserGroup,
  HiSearch,
} from "react-icons/hi";
import { MdAttachMoney } from "react-icons/md";
import { useSearchMenu } from "../hooks/useSearchMenu";

import { formatToman } from "@/utils/helpers";
import CityField from "./CityField";
import Counter from "./Counter";
import { usePropertyStore } from "@/hooks/usePropertyStore";
import BudgetField from "./BudgetField";

import AppCalendar from "./AppCalendar";
import { useNavigate } from "react-router";
import { useAllCities } from "@/hooks/cities/useAllCities";

function CompositeSearchBar({ variant = "hero", className }) {
  const { activeTab, setActiveTab, menuRef } = useSearchMenu();
  const isHero = variant === "hero";

  const navigate = useNavigate();
  const { allCities } = useAllCities();
  const {
    guests,
    setGuests,
    city,
    nights,
    totalBudget: budget,
    formattedDate,
    getUrlParams,
  } = usePropertyStore();
  const findName = allCities?.find((item) => item.slug === city);
  function handleSearch() {
    setActiveTab(null);
    const rawParams = getUrlParams();
    const queryParams = new URLSearchParams(rawParams);
    console.log(queryParams.toString());
    navigate(`/stays?${queryParams.toString()}`);
  }
  return (
    <>
      {typeof document !== "undefined" &&
        createPortal(
          <div
            className={`fixed inset-0 bg-black/5 backdrop-blur-sm z-10 transition-opacity duration-300 ${
              activeTab
                ? "opacity-100 visible"
                : "opacity-0 invisible pointer-events-none"
            }`}
          ></div>,
          document.body,
        )}

      <div
        className={`relative z-50 w-full ${isHero ? "max-w-5xl" : "max-w-2xl"} ${isHero ? "block" : className} mx-auto transition-all`}
        dir="rtl"
        ref={menuRef}
      >
        <div
          className={`flex items-center bg-base rounded-full shadow-lg border border-border/50 relative z-50 transition-all ${isHero ? "p-2" : "p-1"}`}
        >
          <div
            onClick={() =>
              setActiveTab(activeTab === "destination" ? null : "destination")
            }
            className={`flex-1 flex flex-col justify-center rounded-full cursor-pointer transition-colors ${isHero ? "px-6 py-2.5" : "px-4 py-1.5"} ${
              activeTab === "destination"
                ? "shadow-md bg-base"
                : "hover:bg-primary/5"
            }`}
          >
            <div className="flex items-center gap-2 text-primary">
              {isHero && (
                <HiOutlineLocationMarker className="text-lg text-primary" />
              )}
              <span className="font-PeydaBold text-xs sm:text-sm text-main line-clamp-1">
                مقصد
              </span>
            </div>
            <span className="font-SansRegular text-[10px] sm:text-[11px] text-muted truncate mt-0.5 line-clamp-1">
              {city ? findName.name : "شهر, استان یا اقامتگاه"}
            </span>
          </div>

          <div className="w-px h-8 bg-border mx-1"></div>

          <div
            onClick={() => setActiveTab(activeTab === "date" ? null : "date")}
            className={`flex-1 hidden sm:flex flex-col justify-center rounded-full cursor-pointer transition-colors ${isHero ? "px-6 py-2.5" : "px-4 py-1.5"} ${
              activeTab === "checkin"
                ? "shadow-md bg-base"
                : "hover:bg-primary/5"
            }`}
          >
            <div className="flex items-center gap-2">
              {isHero && <HiOutlineCalendar className="text-lg text-primary" />}
              <span className="font-PeydaBold text-xs sm:text-sm text-main line-clamp-1">
                تاریخ ورود و خروج
              </span>
            </div>
            <span className="font-SansRegular text-[10px] sm:text-[11px] text-muted mt-0.5 line-clamp-1">
              {formattedDate ? formattedDate : "تاریخ آغاز و اتمام اقامت"}
            </span>
          </div>

          <div className="hidden sm:block w-px h-8 bg-border mx-1"></div>

          <div
            onClick={() =>
              setActiveTab(activeTab === "guests" ? null : "guests")
            }
            className={`flex-1 flex flex-col justify-center rounded-full cursor-pointer transition-colors ${isHero ? "px-6 py-2.5" : "px-4 py-1.5"} ${
              activeTab === "guests"
                ? "shadow-md bg-base"
                : "hover:bg-primary/5"
            }`}
          >
            <div className="flex items-center gap-2">
              {isHero && (
                <HiOutlineUserGroup className="text-lg text-primary" />
              )}
              <span
                className={`font-PeydaBold ${isHero ? "text-xs sm:text-sm" : "text-sm"} line-clamp-1`}
              >
                مسافران
              </span>
            </div>
            <span className="font-SansRegular text-[10px] sm:text-[11px] text-muted mt-0.5 line-clamp-1">
              {guests ? `${guests} نفر` : "تعداد نفرات"}
            </span>
          </div>
          <div className="hidden sm:block w-px h-8 bg-border mx-1"></div>
          <div
            onClick={() =>
              setActiveTab(activeTab === "budget" ? null : "budget")
            }
            className={`flex-1 flex flex-col justify-center rounded-full cursor-pointer transition-colors ${isHero ? "px-6 py-2.5" : "px-4 py-1.5"} ${
              activeTab === "budget"
                ? "shadow-md bg-base"
                : "hover:bg-primary/5"
            }`}
          >
            <div className="flex items-center gap-2">
              {isHero && <MdAttachMoney className="text-lg text-primary" />}
              <span
                className={`font-PeydaBold ${isHero ? "text-xs sm:text-sm" : "text-sm"} line-clamp-1`}
              >
                {nights ? `بودجه شما برای ${nights} شب` : "کل بودجه شما"}
              </span>
            </div>
            <span className="font-SansRegular text-[10px] sm:text-[11px] text-muted mt-0.5 line-clamp-1">
              {budget ? `${formatToman(budget)} تومان` : "بودجتو وارد کن"}
            </span>
          </div>
          <button
            onClick={handleSearch}
            className={`bg-primary hover:bg-primary-hover text-white rounded-full flex items-center justify-center gap-2 transition-all shadow-md ml-1 ${isHero ? "p-4 sm:px-8 sm:py-4" : "p-3"} cursor-pointer`}
          >
            <HiSearch className={`${isHero ? "text-xl" : "text-xl"}`} />
            {isHero && (
              <span
                className={`hidden sm:inline font-PeydaBold ${isHero ? "text-sm" : "text-xs"}`}
              >
                جستجو
              </span>
            )}
          </button>
        </div>

        <div
          className={`popArtSearchBar right-0 ${
            activeTab === "destination"
              ? "opacity-100 visible scale-100 translate-y-0"
              : "opacity-0 invisible scale-95 -translate-y-2 pointer-events-none"
          }`}
        >
          <h4 className="font-PeydaBold">مقصد های مکانو</h4>
          <CityField />
        </div>
        <div
          className={`popArtSearchBar right-2/9 ${
            activeTab === "date"
              ? "opacity-100 visible scale-100 translate-y-0"
              : "opacity-0 invisible scale-95 -translate-y-2 pointer-events-none"
          }`}
        >
          <AppCalendar />
        </div>
        <div
          className={`popArtSearchBar right-4/9 ${
            activeTab === "guests"
              ? "opacity-100 visible scale-100 translate-y-0"
              : "opacity-0 invisible scale-95 -translate-y-2 pointer-events-none"
          }`}
        >
          <Counter
            value={guests}
            onChange={(newVal) => setGuests(newVal)}
            max={15}
            title="نفرات"
          />
        </div>

        <div
          className={`popArtSearchBar left-0 ${
            activeTab === "budget"
              ? "opacity-100 visible scale-100 translate-y-0"
              : "opacity-0 invisible scale-95 -translate-y-2 pointer-events-none"
          }`}
        >
          <BudgetField />
        </div>
      </div>
    </>
  );
}

export default CompositeSearchBar;
