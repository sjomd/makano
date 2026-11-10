import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getStay } from "../../services/staysAPI";

export function useStay() {
  const { id } = useParams();

  const {
    isLoading,
    data: stay,
    error,
  } = useQuery({
    queryKey: ["stay", id],
    queryFn: () => getStay(id),
    enabled: !!id,
    retry: false,
  });

  return { isLoading, stay, error };
}
