import { getSettings } from "@/services/settingsApi";
import { useQuery } from "@tanstack/react-query";

export function useGetSettings() {
  const {
    isLoading,
    data: settings,
    error,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });
  return { isLoading, settings, error };
}
