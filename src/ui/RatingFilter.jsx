import ChoiceChip from "./ChoiceChip";

// src/components/RatingFilterList.jsx
export default function RatingFilter({ selectedRating, onSelect }) {
  const ratingOptions = [
    { id: "3", name: "بالای ۳" },
    { id: "3.5", name: "بالای ۳.۵" },
    { id: "4", name: "بالای ۴" },
    { id: "4.5", name: "بالای ۴.۵" },
    { id: "5", name: "۵ ستاره" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2.5 w-full py-1.5">
      {ratingOptions.map((item) => {
        const isSelected = selectedRating === item.id;

        return (
          <ChoiceChip
            key={item.id}
            label={item.name}
            isActive={isSelected}
            variant="solid"
            onClick={() => onSelect(item.id)}
          />
        );
      })}
    </div>
  );
}
