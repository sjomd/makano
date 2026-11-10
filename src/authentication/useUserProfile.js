import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "@/services/authApi";

export default function useUserProfile(userId) {
  const {
    data: profile,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["profile", userId],
    queryFn: () => getUserProfile(userId),
    enabled: Boolean(userId),
  });

  return {
    profile,
    isLoading,
    isError,
    error,
    refetch,
  };
}
