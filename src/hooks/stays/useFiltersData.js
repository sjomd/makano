import {
  getAmenities,
  getPropertyTypes,
  getRegionTypes,
  getRules,
} from "@/services/staysAPI";
import { useQuery } from "@tanstack/react-query";

export function useAmenities() {
  const { data: amenities, isLoading } = useQuery({
    queryKey: ["amenities"],
    queryFn: getAmenities,
  });

  return { amenities, isLoading };
}
export function usePropertyTypes() {
  const { data: propertyTypes, isLoading } = useQuery({
    queryKey: ["PropertyTypes"],
    queryFn: getPropertyTypes,
  });
  return { propertyTypes, isLoading };
}
export function useRegionTypes() {
  const { data: regionTypes, isLoading } = useQuery({
    queryKey: ["RegionTypes"],
    queryFn: getRegionTypes,
  });
  return { regionTypes, isLoading };
}
export function useRules() {
  const { data: rules, isLoading } = useQuery({
    queryKey: ["Rules"],
    queryFn: getRules,
  });
  return { rules, isLoading };
}
