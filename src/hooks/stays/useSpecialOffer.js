import { useQuery } from "@tanstack/react-query";
import { getRandomFeaturedStay } from "../../services/staysAPI";

export function useSpecialOffer() {
  const { data: specialStay, isLoading } = useQuery({
    queryKey: ["specialStay"],
    queryFn: getRandomFeaturedStay,
  });
  return { specialStay, isLoading };
}
