import { useSearchParams } from "react-router";
import { useStays } from "../../hooks/stays/useStays";
import SatyCard from "../../ui/SatyCard"; // یا کارت مخصوص اقامتگاه‌ها
import MakanoLoader from "../../ui/MakanoLoader"; // لودر اختصاصی شما

import SortBy from "../../ui/SortBy";
import FilterBar from "../../ui/FilterBar";

function Stays() {
  const [searchParams] = useSearchParams();
  const currentFilter = Object.fromEntries(searchParams.entries());
  const { stays, isLoading } = useStays(currentFilter);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <MakanoLoader />
      </div>
    );
  }

  return (
    <div className="w-full pt-2 lg:pt-23 pb-8">
      <div className="max-w-[1570px] mx-auto px-4 sm:px-6 lg:px-8">
        <FilterBar />

        <div className="mb-6 flex flex-row items-end justify-between gap-3">
          <div className=" flex flex-col gap-y-1.5">
            <h1 className="font-PeydaBlack main text-lg sm:text-2xl">
              اقامتگاه‌های مکانو
            </h1>
            <span className="text-sm sm:text-[16px] lg:text-lg muted font-SansRegular">
              {stays?.length} اقامتگاه
            </span>
          </div>

          <SortBy
            options={[
              { value: "price_per_night-asc", label: "کمترین قیمت" },
              { value: "price_per_night-desc", label: "بیشترین قیمت" },
              { value: "rating-desc", label: "بیشترین امتیاز" },
              { value: "booking_count-desc", label: "بیشترین رزروی" },
              { value: "discount_percent-desc", label: "بیشترین تخفیف" },
            ]}
          />
        </div>

        {stays && stays.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {stays.map((stay) => (
              <SatyCard key={stay.id} {...stay} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-card border border-border rounded-2xl">
            <p className="font-SansRegular muted text-sm">موردی یافت نشد!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Stays;
