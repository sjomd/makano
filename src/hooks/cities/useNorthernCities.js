import { useQuery } from "@tanstack/react-query";
import { getNorthernCities } from "../../services/citiesAPI";

export function useNortherncities() {
  const {
    data: northernCities,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["northernCities"],
    queryFn: getNorthernCities,
  });

  return { northernCities, isLoading, error };
}
