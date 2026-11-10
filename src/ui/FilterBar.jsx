import { useSearchParams } from "react-router";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import Modal from "./Modal";
import { PriceRangeContent } from "./PriceRangeContent";
import { TbFilterSearch } from "react-icons/tb";
import { MoreFiltersContent } from "./MorefiltersContent";
import ChoiceChip from "./ChoiceChip";

const QUICK_FILTERS = [
  { id: "pool", label: "استخردار", key: "amenities-in", value: "pool" },
  { id: "pet", label: "پت‌فرندلی", key: "rules-in", value: "pet" },
  { id: "villa", label: "ویلا", key: "property_type-in", value: "villa" },
  { id: "suite", label: "سوئیت", key: "property_type-in", value: "suite" },
];

function FilterBar() {
  const [searchParams, setSearchParams] = useSearchParams();

  const toggleQuickFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);

    // اگر فیلتر از قبل فعال بود، حذفش کن (Toggle off)
    if (newParams.get(key) === value) {
      newParams.delete(key);
    } else {
      // در غیر این صورت فعالش کن
      newParams.set(key, value);
    }

    setSearchParams(newParams);
  };

  return (
    <>
      <div className="w-full bg-base z-15  py-3 sticky top-17 lg:top-20  mb-4">
        <div className="max-w-[1570px] mx-auto">
          <div className="flex items-center gap-x-3 overflow-x-auto no-scrollbar snap-x snap-mandatory">
            <Modal>
              <Modal.Open opens="more">
                <ChoiceChip label="فیلترهای بیشتر" icon={TbFilterSearch} />
              </Modal.Open>
              <Modal.Open opens="price">
                <ChoiceChip label="قیمت" icon={HiOutlineCurrencyDollar} />
              </Modal.Open>

              <Modal.Window name="more" title="فیلترهای بیشتر">
                <MoreFiltersContent />
              </Modal.Window>
              <Modal.Window name="price" title="بازه قیمت" proFilter={true}>
                <PriceRangeContent />
              </Modal.Window>
            </Modal>

            {/* خط جداکننده */}
            <div className="w-px h-6 bg-border/80 shrink-0 mx-1" />

            {/* فیلترهای سریع */}
            {QUICK_FILTERS.map((filter) => {
              const isActive = searchParams.get(filter.key) === filter.value;
              return (
                <ChoiceChip
                  key={filter.id}
                  label={filter.label}
                  isActive={isActive}
                  variant="outline"
                  showSparkle={true}
                  onClick={() => toggleQuickFilter(filter.key, filter.value)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
export default FilterBar;
