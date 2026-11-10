import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "@/services/authApi";

export default function useForgotPassword() {
  const {
    mutate: sendResetEmail,
    isPending,
    isSuccess,
    error,
    reset,
  } = useMutation({
    mutationFn: resetPassword,
  });

  return {
    sendResetEmail,
    isPending,
    isSuccess,
    error,
    reset,
  };
}
