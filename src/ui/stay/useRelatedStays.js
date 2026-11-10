import { getRelatedStays } from "@/services/staysAPI";
import { useQuery } from "@tanstack/react-query";

export function useRelatedStays(currentStay) {
  const { data: relatedStays, isLoading } = useQuery({
    queryKey: ["relatedStays", currentStay?.id],
    queryFn: () => getRelatedStays(currentStay),
    enabled: Boolean(currentStay?.id),
  });
  return { relatedStays, isLoading };
}
