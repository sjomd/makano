import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { uploadAvatar } from "@/services/authApi";
import notify from "@/utils/toast";

function getAvatarErrorMessage(error) {
  const message = error?.message?.toLowerCase() || "";

  if (message.includes("فرمت تصویر")) {
    return error.message;
  }

  if (message.includes("حجم تصویر")) {
    return error.message;
  }

  if (message.includes("network")) {
    return "ارتباط با سرور برقرار نشد. اتصال اینترنت را بررسی کنید.";
  }

  if (message.includes("permission") || message.includes("policy")) {
    return "اجازه آپلود تصویر وجود ندارد.";
  }

  if (message.includes("storage")) {
    return "آپلود تصویر با مشکل مواجه شد.";
  }

  return "تغییر تصویر پروفایل ناموفق بود. لطفاً دوباره تلاش کنید.";
}

export default function useUploadAvatar() {
  const queryClient = useQueryClient();
  const uploadLock = useRef(false);

  const mutation = useMutation({
    mutationFn: uploadAvatar,

    onMutate: async ({ file, userId }) => {
      const queryKey = ["profile", userId];

      await queryClient.cancelQueries({ queryKey });

      const previousProfile = queryClient.getQueryData(queryKey);
      const previewUrl = URL.createObjectURL(file);

      queryClient.setQueryData(queryKey, (oldProfile) => ({
        ...oldProfile,
        avatar_url: previewUrl,
      }));

      const toastId = notify.loading("در حال آپلود تصویر پروفایل...");

      return {
        previousProfile,
        previewUrl,
        queryKey,
        toastId,
      };
    },

    onSuccess: (profile, _variables, context) => {
      queryClient.setQueryData(context.queryKey, profile);

      notify.dismiss(context.toastId);
      notify.success("تصویر پروفایل با موفقیت تغییر کرد.");
    },

    onError: (error, _variables, context) => {
      if (context?.previousProfile) {
        queryClient.setQueryData(context.queryKey, context.previousProfile);
      }

      notify.dismiss(context?.toastId);
      notify.error(getAvatarErrorMessage(error));
    },

    onSettled: (_data, _error, _variables, context) => {
      if (context?.previewUrl) {
        URL.revokeObjectURL(context.previewUrl);
      }

      uploadLock.current = false;
    },
  });

  function uploadAvatarImage(variables) {
    if (uploadLock.current) return;

    uploadLock.current = true;
    mutation.mutate(variables);
  }

  return {
    uploadAvatarImage,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  };
}
