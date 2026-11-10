import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateUserProfile } from "@/services/authApi";
import notify from "@/utils/toast";

export default function useUpdateProfile() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateUserProfile,

    onSuccess: (updatedProfile, variables) => {
      queryClient.setQueryData(["profile", variables.userId], updatedProfile);

      notify.success("اطلاعات حساب با موفقیت بروزرسانی شد.");
    },

    onError: (error) => {
      notify.error(error.message || "بروزرسانی اطلاعات حساب ناموفق بود.");
    },
  });

  return {
    updateProfile: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
    reset: mutation.reset,
  };
}
