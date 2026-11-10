import { useQuery } from "@tanstack/react-query";
import useAuth from "../auth/useAuth";
import { getFavorites } from "@/services/favoriteApi";
import { useMemo } from "react";

export default function useFavorite() {
  const { user } = useAuth();

  const {
    data: favorites,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["favorites", user?.id],
    queryFn: getFavorites,
    enabled: !!user?.id,
  });
  const favoriteIds = useMemo(
    () => new Set(favorites?.map((favorite) => favorite.stay_id)),
    [favorites],
  );
  return {
    favorites: favorites ?? [],
    favoriteIds,
    isLoading,
    error,
  };
}
