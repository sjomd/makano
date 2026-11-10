import { usePropertyStore } from "@/hooks/usePropertyStore";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";
import AppCalendar from "./AppCalendar";
import BudgetField from "./BudgetField";
import CityField from "./CityField";
import Counter from "./Counter";
import FilterButton from "./FilterButton";
import { useAllCities } from "@/hooks/cities/useAllCities";
import { useNavigate, useSearchParams } from "react-router";
import { useEffect } from "react";

function MobileSearchContent({ onClose }) {
  const [searchParams] = useSearchParams();
  const {
    city,
    formattedDate,
    guests,
    setGuests,
    totalBudget,
    nights,
    getUrlParams,
    resetSearch,
    initFromUrl,
  } = usePropertyStore();
  useEffect(() => {
    initFromUrl(searchParams);
  }, [searchParams, initFromUrl]);

  const { allCities } = useAllCities();
  const navigate = useNavigate();
  const findName = allCities?.find((item) => item.slug === city);
  const handleApplyFilters = () => {
    const rawParams = getUrlParams();
    const queryParams = new URLSearchParams(rawParams);
    console.log(queryParams.toString());
    navigate(`/stays?${queryParams.toString()}`);
    if (onClose) onClose();
  };
  function handleClear() {
    resetSearch?.();
    navigate("/stays");
    if (onClose) onClose();
  }
  return (
    <div className="flex flex-col justify-between h-full pb-2">
      <Accordion
        type="multiple"
        defaultValue={["city"]}
        className="w-full space-y-2"
      >
        <AccordionItem value="city" className="border-b border-border pb-2">
          <AccordionTrigger className="text-sm font-PeydaMedium text-main hover:text-primary transition-colors py-3">
            {city ? findName.name : "مقصد"}
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-3">
            <CityField />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="date" className="border-b border-border pb-2">
          <AccordionTrigger className="text-sm font-PeydaMedium text-main hover:text-primary transition-colors py-3">
            {formattedDate ? formattedDate : "تاریخ ورود و خروج"}
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-3">
            <AppCalendar />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="capacity" className="border-b border-border pb-2">
          <AccordionTrigger className="text-sm font-PeydaMedium text-main hover:text-primary transition-colors py-3">
            {guests > 1 ? `${guests} نفر` : "نفرات"}
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-3">
            <Counter
              value={guests}
              onChange={(newValue) => {
                setGuests(newValue);
              }}
              max={15}
              title="نفرات"
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="Budget" className="border-b border-border pb-2">
          <AccordionTrigger className="text-sm font-PeydaMedium text-main hover:text-primary transition-colors py-3">
            {totalBudget
              ? `${totalBudget} تومان ${nights < 0 ? `${nights} شب` : ""} `
              : "کل بودجه"}
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-3">
            <BudgetField />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="flex items-center gap-3 pt-4 border-t border-border font-PeydaBold ">
        <FilterButton variant="clear" onClick={handleClear} type="button">
          پاک کردن
        </FilterButton>
        <FilterButton onClick={handleApplyFilters} type="button">
          جستجو
        </FilterButton>
      </div>
    </div>
  );
}

export default MobileSearchContent;
