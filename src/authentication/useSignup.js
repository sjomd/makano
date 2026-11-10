import { useMutation } from "@tanstack/react-query";
import { signup } from "@/services/authApi";

export default function useSignup() {
  const {
    mutate: signupUser,
    isPending,
    error,
    isSuccess,
    reset,
  } = useMutation({
    mutationFn: signup,
  });

  return {
    signupUser,
    isPending,
    error,
    isSuccess,
    reset,
  };
}
