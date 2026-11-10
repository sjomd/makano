import { useMutation } from "@tanstack/react-query";
import { login } from "@/services/authApi";

export default function useLogin() {
  const {
    mutate: loginUser,
    isPending,
    isSuccess,
    error,
    reset,
  } = useMutation({
    mutationFn: login,
  });

  return {
    loginUser,
    isPending,
    isSuccess,
    error,
    reset,
  };
}
