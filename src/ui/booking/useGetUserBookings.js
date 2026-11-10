import useAuth from "@/hooks/auth/useAuth";
import { getUserBookings } from "@/services/bookingsApi";
import { useQuery } from "@tanstack/react-query";

export function useGetUserBookings() {
  const { user } = useAuth();
  const { data: userBookings, isLoading } = useQuery({
    queryKey: ["bookings", user?.id],
    queryFn: () => getUserBookings(),
  });

  return { userBookings, isLoading };
}
