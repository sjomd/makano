import { useQuery } from "@tanstack/react-query";
import { getFavoriteStays } from "@/services/favoriteApi";
import useAuth from "../auth/useAuth";

export default function useFavoriteStays() {
  const { user } = useAuth();

  const {
    data: favoriteStays,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["favoriteStays", user?.id],
    queryFn: getFavoriteStays,
    enabled: !!user?.id,
  });

  return {
    favoriteStays: favoriteStays ?? [],
    isLoading,
    error,
  };
}
