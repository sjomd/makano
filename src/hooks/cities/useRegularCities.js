import { getRegularCities } from "@/services/citiesAPI";
import { useQuery } from "@tanstack/react-query";

export function useRegularCities() {
  const {
    isLoading,
    data: regularCities,
    error,
  } = useQuery({
    queryKey: ["cities"],
    queryFn: getRegularCities,
  });
  return { isLoading, regularCities, error };
}
