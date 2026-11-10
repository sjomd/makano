import { getAllCities } from "@/services/citiesAPI";
import { useQuery } from "@tanstack/react-query";

export function useAllCities() {
  const {
    isLoading,
    data: allCities,
    error,
  } = useQuery({
    queryKey: ["allCities"],
    queryFn: getAllCities,
  });

  return { isLoading, allCities, error };
}
