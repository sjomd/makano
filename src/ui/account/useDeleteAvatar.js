import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAvatar } from "@/services/authApi";
import notify from "@/utils/toast";

export default function useDeleteAvatar() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteAvatar,

    onMutate: async (userId) => {
      const queryKey = ["profile", userId];

      await queryClient.cancelQueries({ queryKey });

      const previousProfile = queryClient.getQueryData(queryKey);

      // نمایش فوری حذف آواتار
      queryClient.setQueryData(queryKey, (oldProfile) => {
        if (!oldProfile) return oldProfile;

        return {
          ...oldProfile,
          avatar_url: null,
        };
      });

      const toastId = notify.loading("در حال حذف تصویر پروفایل...");

      return {
        queryKey,
        previousProfile,
        toastId,
      };
    },

    onSuccess: (profile, _userId, context) => {
      queryClient.setQueryData(context.queryKey, profile);

      notify.dismiss(context.toastId);
      notify.success("تصویر پروفایل با موفقیت حذف شد.");
    },

    onError: (_error, _userId, context) => {
      if (context?.previousProfile) {
        queryClient.setQueryData(context.queryKey, context.previousProfile);
      }

      notify.dismiss(context?.toastId);
      notify.error("حذف تصویر پروفایل ناموفق بود.");
    },
  });

  return {
    deleteAvatarImage: mutation.mutate,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  };
}
