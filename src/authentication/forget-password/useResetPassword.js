import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "@/services/authApi";

export default function useResetPassword() {
  const {
    mutate: resetPassword,
    isPending,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: updatePassword,
  });

  return {
    resetPassword,
    isPending,
    isSuccess,
    error,
  };
}
