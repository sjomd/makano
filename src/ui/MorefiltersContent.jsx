// src/components/MoreFiltersContent.jsx
import { useEffect } from "react";
import { useSearchParams } from "react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/ui/accordion";
import {
  useAmenities,
  usePropertyTypes,
  useRegionTypes,
  useRules,
} from "@/hooks/stays/useFiltersData";
import { FilterBadgeList } from "./FilterBadgeList";
import Counter from "./Counter";
import RatingFilter from "./RatingFilter";
import { useNavigate } from "react-router";
import { usePropertyStore } from "@/hooks/usePropertyStore";
import { useAllCities } from "@/hooks/cities/useAllCities";
import ChoiceChip from "./ChoiceChip";
import NeonSpinner from "./NeonSpinner";
import FilterButton from "./FilterButton";
export function MoreFiltersContent({ onClose }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    getUrlParams,
    setRating,
    rating,
    setGuests,
    guests,
    setRooms,
    rooms,
    city,
    setCity,
    propertyTypes: propertyTypeStore,
    regionTypes: regionTypeStore,
    amenities: amenitiesStore,
    rules: rulesStore,
    toggleArrayFilter,
    initFromUrl,
    resetSearch,
  } = usePropertyStore();
  useEffect(() => {
    initFromUrl(searchParams);
  }, [searchParams, initFromUrl]);

  const { amenities, isLoading: amenitiesLoading } = useAmenities();
  const { rules, isLoading: rulesLoading } = useRules();
  const { propertyTypes, isLoading: typesLoading } = usePropertyTypes();
  const { regionTypes, isLoading: regionsLoading } = useRegionTypes();
  const { allCities, isLoading: citiesLoading } = useAllCities();
  const isLoading =
    typesLoading ||
    regionsLoading ||
    amenitiesLoading ||
    rulesLoading ||
    citiesLoading;

  const handleApplyFilters = () => {
    const rawParams = getUrlParams();
    const queryParams = new URLSearchParams(rawParams);
    console.log(queryParams.toString());
    navigate(`/stays?${queryParams.toString()}`);
    // بستن پنل بعد از اعمال فیلترها (اگر تابع onClose وجود داشت)
    if (onClose) onClose();
  };
  function handleClear() {
    resetSearch?.();
    navigate("/stays");
    if (onClose) onClose();
  }
  if (isLoading) return <NeonSpinner className="mx-auto my-auto" />;
  return (
    <div className=" flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center gap-x-3 overflow-x-auto no-scrollbar snap-x snap-mandatory">
          {allCities.map((item) => (
            <ChoiceChip
              key={item.id}
              label={item.name}
              isActive={city === item.slug}
              showDot={true}
              onClick={() =>
                city !== item.slug ? setCity(item.slug) : setCity("")
              }
            />
          ))}
        </div>
        <Counter
          value={guests}
          onChange={(newValue) => {
            setGuests(newValue);
          }}
          max={15}
          title="نفرات"
        />
        <Counter
          value={rooms}
          onChange={(newValue) => {
            setRooms(newValue);
          }}
          max={8}
          title="اتاق"
        />
        <Accordion type="multiple" defaultValue={[]}>
          {/* اصلاح بخش امتیاز: اضافه شدن value و کلاس‌های استایل مشابه بقیه */}
          <AccordionItem value="rating" className="border-b border-border pb-2">
            <AccordionTrigger className="text-sm font-PeydaMedium text-main hover:text-primary transition-colors py-3">
              امتیاز
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-3">
              <RatingFilter
                selectedRating={rating}
                onSelect={(id) =>
                  rating !== id ? setRating(id) : setRating("")
                }
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="property-type"
            className="border-b border-border pb-2"
          >
            <AccordionTrigger className="text-sm font-PeydaMedium text-main hover:text-primary transition-colors py-3">
              نوع اقامتگاه
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-3">
              <FilterBadgeList
                items={propertyTypes}
                selectedValues={propertyTypeStore}
                onToggle={(slug) => toggleArrayFilter("propertyTypes", slug)}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="region-type"
            className="border-b border-border pb-2"
          >
            <AccordionTrigger className="text-sm font-PeydaMedium text-main hover:text-primary transition-colors py-3">
              نوع منطقه
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-3">
              <FilterBadgeList
                items={regionTypes}
                selectedValues={regionTypeStore}
                onToggle={(slug) => toggleArrayFilter("regionTypes", slug)}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="amenities"
            className="border-b border-border pb-2"
          >
            <AccordionTrigger className="text-sm font-PeydaMedium text-main hover:text-primary transition-colors py-3">
              امکانات رفاهی
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-3">
              <FilterBadgeList
                items={amenities}
                selectedValues={amenitiesStore}
                onToggle={(slug) => toggleArrayFilter("amenities", slug)}
              />
            </AccordionContent>
          </AccordionItem>

          {/* بخش قوانین هم دست‌نخورده باقی ماند (بدون بوردر پایین چون آیتم آخر است) */}
          <AccordionItem value="rules" className="border-b border-border pb-2">
            <AccordionTrigger className="text-sm font-PeydaMedium text-main hover:text-primary transition-colors py-3">
              قوانین و مقررات
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-3">
              <FilterBadgeList
                items={rules}
                selectedValues={rulesStore}
                onToggle={(slug) => toggleArrayFilter("rules", slug)}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-border font-PeydaBold ">
        <FilterButton variant="clear" onClick={handleClear} type="button">
          پاک کردن
        </FilterButton>
        <FilterButton onClick={handleApplyFilters} type="button">
          نمایش اقامتگاه‌ها
        </FilterButton>
      </div>
    </div>
  );
}
