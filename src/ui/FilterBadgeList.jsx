// src/components/FilterBadgeList.jsx

import ChoiceChip from "./ChoiceChip";

export function FilterBadgeList({ items, selectedValues = [], onToggle }) {
  if (!items || items.length === 0) {
    return <div className="text-xs text-muted py-1">موردی یافت نشد</div>;
  }

  return (
    <div className="flex flex-wrap items-center gap-2.5 w-full py-1.5">
      {items.map((item) => {
        const itemslug = item.slug;
        const isSelected = selectedValues.includes(itemslug);

        return (
          <ChoiceChip
            key={item.id}
            label={item.name}
            variant="solid"
            isActive={isSelected}
            onClick={() => onToggle(itemslug)}
          />
        );
      })}
    </div>
  );
}
