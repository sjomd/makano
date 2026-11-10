import { useForm } from "react-hook-form";
import { HiOutlineMail, HiArrowLeft } from "react-icons/hi";

import { AUTH_RULES } from "../authValidation";
import useForgotPassword from "./useForgetPassword";

export default function ForgotPasswordForm({ onBackToLogin }) {
  const { sendResetEmail, isPending, isSuccess, error } = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const inputClass = (hasError) =>
    `w-full bg-base border rounded-2xl pr-11 py-3 text-xs text-main outline-none transition-all dir-ltr text-right font-mono ${
      hasError
        ? "border-rose-500/80 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
        : "border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
    }`;

  function onSubmit(data) {
    sendResetEmail(data.email);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-xs font-PeydaMedium text-muted block">
          پست الکترونیک (ایمیل)
        </label>

        <div className="relative flex items-center">
          <HiOutlineMail
            className={`absolute right-4 text-lg pointer-events-none ${
              errors.email ? "text-rose-400" : "text-primary"
            }`}
          />

          <input
            type="email"
            placeholder="example@gmail.com"
            {...register("email", AUTH_RULES.email)}
            className={`${inputClass(errors.email)} pl-4`}
            disabled={isPending || isSuccess}
          />
        </div>

        {errors.email && (
          <span className="text-[11px] text-rose-400 block pr-1">
            {errors.email.message}
          </span>
        )}
      </div>

      {error && (
        <p className="text-[11px] text-rose-400 text-center">
          {error.message || "ارسال ایمیل بازیابی با مشکل مواجه شد."}
        </p>
      )}

      {isSuccess && (
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3">
          <p className="text-xs text-emerald-500 leading-6 text-center">
            اگر حساب کاربری مرتبط با این ایمیل وجود داشته باشد، لینک بازیابی رمز
            عبور برای شما ارسال شده است. لطفاً صندوق ورودی و پوشه Spam ایمیل خود
            را بررسی کنید.
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={isPending || isSuccess}
        className="w-full bg-primary hover:bg-primary-hover text-white text-xs font-PeydaBold py-3.5 rounded-2xl shadow-lg shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-x-2 cursor-pointer disabled:opacity-50 mt-2"
      >
        <span>
          {isPending
            ? "در حال ارسال..."
            : isSuccess
              ? "ایمیل ارسال شد"
              : "ارسال لینک بازیابی"}
        </span>

        <HiArrowLeft className="text-sm" />
      </button>

      <p className="text-center text-xs text-muted pt-3 border-t border-border/60">
        رمز عبورت رو به خاطر آوردی؟{" "}
        <button
          type="button"
          onClick={onBackToLogin}
          className="text-primary font-PeydaBold hover:underline cursor-pointer"
        >
          بازگشت به ورود
        </button>
      </p>
    </form>
  );
}
