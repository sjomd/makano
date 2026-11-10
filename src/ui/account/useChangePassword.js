import { useMutation } from "@tanstack/react-query";
import { changePassword } from "@/services/authApi";
import notify from "@/utils/toast";

export default function useChangePassword() {
  const mutation = useMutation({
    mutationFn: changePassword,

    onError: (error) => {
      // خطای رمز فعلی باید زیر همان فیلد نمایش داده شود.
      if (error.message === "CURRENT_PASSWORD_INVALID") {
        return;
      }

      notify.error(
        error.message || "تغییر رمز عبور ناموفق بود. دوباره تلاش کنید.",
      );
    },
  });

  return {
    changePassword: mutation.mutateAsync,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    reset: mutation.reset,
  };
}
