import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
// مسیر ایمپورت دقیقاً روی پوشه‌ای تنظیم شده که با هم برای shadcn ساختیم
import { Slider } from "@/ui/slider";
import { formatToman } from "@/utils/helpers";
import { usePropertyStore } from "@/hooks/usePropertyStore";
import FilterButton from "./FilterButton";

const MIN_PRICE = 500000;
const MAX_PRICE = 10000000;
const STEP = 100000;

export function PriceRangeContent({ onClose }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,
    getUrlParams,
    initFromUrl,
    resetSearch,
  } = usePropertyStore();
  useEffect(() => {
    initFromUrl(searchParams);
  }, [initFromUrl, searchParams]);

  const currentMin = minPrice;
  const currentMax = maxPrice;
  const [range, setRange] = useState([currentMin, currentMax]);

  const [prevMin, setPrevMin] = useState(currentMin);
  const [prevMax, setPrevMax] = useState(currentMax);

  if (currentMin !== prevMin || currentMax !== prevMax) {
    setPrevMin(currentMin);
    setPrevMax(currentMax);
    setRange({ currentMin, currentMax });
  }

  function handleApply() {
    const [selectedMin, selectedMax] = range;
    if (selectedMax == MAX_PRICE && selectedMin === MIN_PRICE) onClose?.();
    if (selectedMin > MIN_PRICE) {
      setMinPrice(selectedMin);
    }
    if (selectedMax < MAX_PRICE) {
      setMaxPrice(selectedMax);
    }
    const rawParams = getUrlParams();
    const queryParams = new URLSearchParams(rawParams);
    console.log(queryParams.toString());
    navigate(`/stays?${queryParams.toString()}`);
    // بستن پنل بعد از اعمال فیلترها (اگر تابع onClose وجود داشت)
    if (onClose) onClose();
  }

  function handleClear() {
    setRange({ MIN_PRICE, MAX_PRICE });
    navigate("/stays");
    resetSearch();
    if (onClose) onClose();
  }
  return (
    <div className="space-y-6 w-full min-w-75 p-2">
      <div>
        <h4 className="font-SansMedium text-main mb-6 text-[16px] px-2">
          محدوده قیمت هر شب
        </h4>

        <div className="px-2 py-4">
          <Slider
            dir="ltr"
            // با منفی کردن مقادیر، مینیمم و ماکزیمم جابجا می‌شوند
            min={-MAX_PRICE}
            max={-MIN_PRICE}
            step={STEP}
            // دستگیره چپ (val[0]) میشه حداکثر، دستگیره راست (val[1]) میشه حداقل
            value={[-range[1], -range[0]]}
            onValueChange={(val) => {
              // هنگام تغییر، دوباره اعداد رو مثبت می‌کنیم و سر جای درست می‌ذاریم
              setRange([-val[1], -val[0]]);
            }}
            className="w-full"
          />
        </div>

        <div className="flex items-center justify-between gap-3 mt-6">
          <div className="flex-1 flex flex-col items-center bg-card border border-border rounded-xl py-2 px-3">
            <span className="font-PeydaMedium text-xs text-muted mb-1">از</span>
            <span className="text-sm font-PeydaMedium text-main/80">
              {formatToman(range[0])}
            </span>
          </div>
          <span className="text-main/70 font-bold">-</span>
          <div className="flex-1 flex flex-col items-center bg-card border border-border rounded-xl py-2 px-3">
            <span className="font-PeydaMedium text-xs text-muted mb-1">تا</span>
            <span className="text-sm font-PeydaMedium text-main/80">
              {formatToman(range[1])}
            </span>
          </div>
        </div>
      </div>

      {/* دکمه‌های اکشن */}
      <div className="flex items-center gap-3 pt-4 border-t border-border font-PeydaBold">
        <FilterButton
          variant="clear"
          onClick={handleClear}
          className="px-4 py-2.5 text-sm text-main transition-colors cursor-pointer"
          disabled={range[0] === MIN_PRICE && range[1] === MAX_PRICE}
        >
          پاک کردن
        </FilterButton>
        <FilterButton
          onClick={handleApply}
          className="flex-1 py-2.5 bg-card text-main rounded-xl text-sm font-medium  transition-all shadow-sm cursor-pointer"
        >
          مشاهده اقامتگاه‌ها
        </FilterButton>
      </div>
    </div>
  );
}
