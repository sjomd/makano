import { useAllCities } from "@/hooks/cities/useAllCities";

export default function CityFilter({ selectedCity, onSelect }) {
  // گرفتن مستقیم allCities از درون آبجکت خروجی هوک
  const { allCities, isLoading } = useAllCities();

  if (isLoading)
    return <div className="text-xs text-muted py-2">در حال بارگذاری...</div>;

  return (
    <div className="flex flex-wrap items-center gap-2.5 w-full py-1.5">
      {Array.isArray(allCities) &&
        allCities.map((item) => {
          const isSelected = selectedCity === item.name;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.name)}
              className={`inline-flex items-center justify-center px-4 py-2 text-xs font-SansMedium rounded-xl transition-all ${
                isSelected
                  ? "bg-primary text-white shadow-md scale-[1.02]"
                  : "bg-base text-muted border border-border hover:border-primary hover:text-main"
              }`}
            >
              {item.name}
            </button>
          );
        })}
    </div>
  );
}
