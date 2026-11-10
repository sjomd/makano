import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import {
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";

import { useState } from "react";
import useResetPassword from "./useResetPassword";

export default function ResetPasswordForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { resetPassword, isPending, isSuccess, error } = useResetPassword();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const password = watch("password");

  const inputClass = (hasError) =>
    `w-full bg-base border rounded-2xl pr-11 py-3 text-xs text-main outline-none transition-all ${
      hasError
        ? "border-rose-500/80 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
        : "border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
    }`;

  function onSubmit(data) {
    resetPassword(data.password);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-xs font-PeydaMedium text-muted block">
          رمز عبور جدید
        </label>

        <div className="relative flex items-center">
          <HiOutlineLockClosed className="absolute right-4 text-lg text-primary pointer-events-none" />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="حداقل ۸ کاراکتر"
            disabled={isPending || isSuccess}
            {...register("password", {
              required: "رمز عبور را وارد کنید.",
              minLength: {
                value: 8,
                message: "رمز عبور باید حداقل ۸ کاراکتر باشد.",
              },
            })}
            className={`${inputClass(errors.password)} pl-12`}
          />

          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            className="absolute left-4 text-muted hover:text-primary"
          >
            {showPassword ? (
              <HiOutlineEyeOff className="text-lg" />
            ) : (
              <HiOutlineEye className="text-lg" />
            )}
          </button>
        </div>

        {errors.password && (
          <span className="text-[11px] text-rose-400 block pr-1">
            {errors.password.message}
          </span>
        )}
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-PeydaMedium text-muted block">
          تکرار رمز عبور جدید
        </label>

        <div className="relative flex items-center">
          <HiOutlineLockClosed className="absolute right-4 text-lg text-primary pointer-events-none" />

          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="رمز عبور را دوباره وارد کنید"
            disabled={isPending || isSuccess}
            {...register("confirmPassword", {
              required: "تکرار رمز عبور را وارد کنید.",
              validate: (value) =>
                value === password || "رمزهای عبور مطابقت ندارند.",
            })}
            className={`${inputClass(errors.confirmPassword)} pl-12`}
          />

          <button
            type="button"
            onClick={() => setShowConfirmPassword((value) => !value)}
            className="absolute left-4 text-muted hover:text-primary"
          >
            {showConfirmPassword ? (
              <HiOutlineEyeOff className="text-lg" />
            ) : (
              <HiOutlineEye className="text-lg" />
            )}
          </button>
        </div>

        {errors.confirmPassword && (
          <span className="text-[11px] text-rose-400 block pr-1">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>

      {error && (
        <p className="text-[11px] text-rose-400 text-center">
          {error.message || "تغییر رمز عبور با مشکل مواجه شد."}
        </p>
      )}

      {isSuccess && (
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3">
          <p className="text-xs text-emerald-500 leading-6 text-center">
            رمز عبور شما با موفقیت تغییر کرد.
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={isPending || isSuccess}
        className="w-full bg-primary hover:bg-primary-hover text-white text-xs font-PeydaBold py-3.5 rounded-2xl shadow-lg shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-x-2 cursor-pointer disabled:opacity-50"
      >
        {isPending
          ? "در حال تغییر رمز..."
          : isSuccess
            ? "رمز عبور تغییر کرد"
            : "ثبت رمز عبور جدید"}
      </button>

      {isSuccess && (
        <button
          type="button"
          onClick={() => navigate("/login", { replace: true })}
          className="w-full text-xs text-primary hover:underline pt-2"
        >
          بازگشت به صفحه ورود
        </button>
      )}
    </form>
  );
}
