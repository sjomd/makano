// src/hooks/stays/useStays.js
import { useQuery } from "@tanstack/react-query";
import { getStays } from "../../services/staysAPI";
import { useSearchParams } from "react-router";

export function useStays() {
  const [searchParams] = useSearchParams();

  const allParams = Object.fromEntries(searchParams.entries());
  const { sortBy: sortByRaw = "price_per_night-asc", ...rawFilters } =
    allParams;

  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  const filters = Object.entries(rawFilters)
    .filter(
      ([key, value]) =>
        key && !key.includes(" ") && value !== "" && value !== "0",
    )
    .map(([key, value]) => {
      // جدا کردن نام فیلد و اپراتور از آخرِ کلید (مثلا property_type-in میشه field: property_type و operator: in)
      const lastDashIndex = key.lastIndexOf("-");
      const hasOperator = lastDashIndex !== -1;

      const filterField = hasOperator ? key.slice(0, lastDashIndex) : key;
      const operator = hasOperator ? key.slice(lastDashIndex + 1) : "eq";

      // اگر اپراتور in بود، رشته را به آرایه تمیز تبدیل کن
      if (operator === "in") {
        const arrayValue = String(value)
          .split(/,|%2C/)
          .map((v) => v.trim())
          .filter(Boolean);

        return { field: filterField, operator: "in", value: arrayValue };
      }

      // تبدیل اعداد به تایپ Number و نگه داشتن رشته‌ها (مثل نام/اسلاگ شهر)
      const parsedValue =
        !isNaN(value) && value.trim() !== "" ? Number(value) : value;

      return { field: filterField, operator, value: parsedValue };
    })
    .filter((f) =>
      Array.isArray(f.value) ? f.value.length > 0 : f.value !== undefined,
    );

  const { data: stays, isLoading } = useQuery({
    queryKey: ["stays", filters, sortBy],
    queryFn: () => getStays({ filters, sortBy }),
  });

  return { stays, isLoading };
}
