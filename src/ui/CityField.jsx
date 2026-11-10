import { useState } from "react";
import { usePropertyStore } from "../hooks/usePropertyStore";
import { useAllCities } from "../hooks/cities/useAllCities";
import ChoiceChip from "./ChoiceChip";

export default function CityField() {
  const { setCity, city: selectedCity } = usePropertyStore();

  const { allCities, isLoading } = useAllCities();
  const cityList = allCities || [];

  const [searchTerm, setSearchTerm] = useState("");

  // ۱. نرمال‌سازی به صورت آبجکت کامل (شامل name و slug و id) برای حفظ یکپارچگی
  const normalizedCities = cityList
    .map((item) => {
      if (typeof item === "string") {
        return { name: item, slug: item, id: item };
      }
      return {
        id: item?.id,
        name: item?.name || item?.city || "",
        slug: item?.slug || item?.name || item?.city || "",
      };
    })
    .filter((item) => item.name);

  // فیلتر بر اساس جستجوی کاربر روی نام شهر
  const filteredCities = normalizedCities.filter((item) =>
    item.name.includes(searchTerm.trim()),
  );

  // ۴ شهر اول به عنوان پیشنهاد سریع
  const quickPicks = normalizedCities.slice(0, 4);

  const handleSelect = (citySlug) => {
    if (selectedCity === citySlug) {
      setCity("");
    } else {
      setCity(citySlug); // همیشه slug می‌شینه تو استور
    }
  };

  // پیدا کردن نام شهر انتخاب شده بر اساس slug ذخیره شده در استور
  const findCityObj = cityList.find((item) => {
    const slug = typeof item === "string" ? item : item?.slug;
    return slug === selectedCity;
  });

  const selectedCityName = findCityObj
    ? typeof findCityObj === "string"
      ? findCityObj
      : findCityObj.name
    : selectedCity;

  return (
    <div
      className="w-full space-y-4 font-SansRegular animate-fade-in select-none"
      dir="rtl"
    >
      {/* ۱. هدر و بج وضعیت انتخاب */}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-PeydaBold text-sm text-main">
            کجا می‌خواهید بروید؟
          </h4>
          <p className="text-[11px] text-muted mt-0.5">
            مقصد خود را جستجو یا از لیست انتخاب کنید
          </p>
        </div>

        {selectedCity && (
          <button
            type="button"
            onClick={() => setCity("")}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-SansMedium hover:bg-primary hover:text-white transition-all cursor-pointer"
          >
            <span>{selectedCityName}</span>
            <span className="text-[10px]">✕</span>
          </button>
        )}
      </div>

      {/* ۲. باکس جستجوی مدرن */}
      <div className="relative flex items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="جستجوی نام شهر (مثلاً رشت، رامسر...)"
          className="w-full px-3.5 py-2.5 text-xs rounded-2xl card text-main placeholder:text-muted focus:outline-none focus:border-primary transition-all"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={() => setSearchTerm("")}
            className="absolute left-3 text-xs text-muted hover:text-main cursor-pointer"
          >
            پاک کردن
          </button>
        )}
      </div>

      {/* ۳. چیپ‌های پیشنهاد سریع (مقاصد پرطرفدار) */}
      {!searchTerm && quickPicks.length > 0 && (
        <div className="space-y-1.5">
          <span className="text-[11px] font-SansMedium text-muted px-1">
            مقاصد پرطرفدار
          </span>
          <div className="flex items-center gap-1.5 overflow-x-auto hide-scrollbar pb-1">
            {quickPicks.map((item) => {
              const isSelected = selectedCity === item.slug;
              return (
                <ChoiceChip
                  key={item.id || item.slug}
                  label={item.name}
                  variant="solid"
                  isActive={isSelected}
                  onClick={() => handleSelect(item.slug)}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* ۴. گرید ۲ ستونه همه شهرها */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-SansMedium text-muted px-1">
          {searchTerm ? "نتایج جستجو" : "همه شهرها"}
        </span>

        <div className="max-h-52 overflow-y-auto hide-scrollbar grid grid-cols-2 gap-2 pt-0.5">
          {isLoading ? (
            [1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-11 rounded-2xl card animate-pulse" />
            ))
          ) : filteredCities.length === 0 ? (
            <div className="col-span-2 py-8 text-center card rounded-2xl">
              <p className="font-PeydaMedium text-xs text-main">
                شهری با این نام پیدا نشد!
              </p>
              <p className="text-[11px] text-muted mt-1">
                نام شهر دیگری را امتحان کنید
              </p>
            </div>
          ) : (
            filteredCities.map((item, idx) => {
              const isSelected = selectedCity === item.slug;

              return (
                <ChoiceChip
                  key={`${item.slug}-${idx}`}
                  label={item.name}
                  isActive={isSelected}
                  needTik={true}
                  onClick={() => handleSelect(item.slug)}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
