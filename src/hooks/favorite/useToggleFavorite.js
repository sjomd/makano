import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addFavorite, removeFavorite } from "@/services/favoriteApi";
import useAuth from "../auth/useAuth";
import useFavorite from "./useFavorite";

function useToggleFavorite(stayId) {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { favoriteIds } = useFavorite();

  const favoriteKey = ["favorites", user?.id];
  const favoriteStaysKey = ["favoriteStays", user?.id];

  const isFavorite = favoriteIds.has(stayId);

  const { mutate: toggleFavorite, isPending } = useMutation({
    mutationFn: () => {
      if (!user) throw new Error("User is not authenticated");

      if (isFavorite) {
        return removeFavorite({ stayId, userId: user.id });
      }

      return addFavorite({ stayId, userId: user.id });
    },

    onMutate: async () => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: favoriteKey }),
        queryClient.cancelQueries({ queryKey: favoriteStaysKey }),
      ]);

      const previousFavorites = queryClient.getQueryData(favoriteKey);

      const previousFavoriteStays = queryClient.getQueryData(favoriteStaysKey);

      // Update favorite IDs
      queryClient.setQueryData(favoriteKey, (oldFavorites = []) => {
        if (isFavorite) {
          return oldFavorites.filter((favorite) => favorite.stay_id !== stayId);
        }

        return [...oldFavorites, { stay_id: stayId }];
      });

      // Update favorite stays
      if (isFavorite) {
        queryClient.setQueryData(favoriteStaysKey, (oldStays) => {
          if (!oldStays) return oldStays;

          return oldStays.filter((stay) => stay.id !== stayId);
        });
      }

      return {
        previousFavorites,
        previousFavoriteStays,
      };
    },

    onError: (_error, _variables, context) => {
      if (!context) return;

      queryClient.setQueryData(favoriteKey, context.previousFavorites);

      queryClient.setQueryData(favoriteStaysKey, context.previousFavoriteStays);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: favoriteKey });

      queryClient.invalidateQueries({
        queryKey: favoriteStaysKey,
      });
    },
  });

  return {
    isFavorite,
    toggleFavorite,
    isPending,
  };
}

export default useToggleFavorite;
