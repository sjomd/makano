import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
  HiArrowLeft,
} from "react-icons/hi";

import { AUTH_RULES } from "./authValidation";
import useLogin from "./useLogin";

export default function LoginForm({ onSwitchToSignup, onForgetPassword }) {
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const { loginUser, isPending, error } = useLogin();

  const redirectTo = location.state?.from
    ? `${location.state.from.pathname || ""}${location.state.from.search || ""}${location.state.from.hash || ""}`
    : "/";

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
    loginUser(data, {
      onSuccess: () => {
        navigate(redirectTo, { replace: true });
      },
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {/* Email */}
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
          />
        </div>

        {errors.email && (
          <span className="text-[11px] text-rose-400 block pr-1">
            {errors.email.message}
          </span>
        )}
      </div>

      {/* Password */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-PeydaMedium text-muted">
            رمز عبور
          </label>

          <button
            type="button"
            onClick={onForgetPassword}
            className="text-[11px] text-primary hover:underline cursor-pointer"
          >
            فراموشی رمز؟
          </button>
        </div>

        <div className="relative flex items-center">
          <HiOutlineLockClosed
            className={`absolute right-4 text-lg pointer-events-none ${
              errors.password ? "text-rose-400" : "text-primary"
            }`}
          />

          <input
            type={showPass ? "text" : "password"}
            placeholder="••••••••"
            {...register("password", AUTH_RULES.loginPassword)}
            className={`${inputClass(errors.password)} pl-10`}
          />

          <button
            type="button"
            onClick={() => setShowPass((prev) => !prev)}
            className="absolute left-3.5 text-muted hover:text-main cursor-pointer"
            aria-label={showPass ? "مخفی کردن رمز عبور" : "نمایش رمز عبور"}
          >
            {showPass ? (
              <HiOutlineEyeOff className="text-primary" />
            ) : (
              <HiOutlineEye className="text-primary" />
            )}
          </button>
        </div>

        {errors.password && (
          <span className="text-[11px] text-rose-400 block pr-1">
            {errors.password.message}
          </span>
        )}
      </div>

      {/* Server Error */}
      {error && (
        <p className="text-[11px] text-rose-400 text-center">
          {error.message || "ورود به حساب کاربری با مشکل مواجه شد."}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-primary hover:bg-primary-hover text-white text-xs font-PeydaBold py-3.5 rounded-2xl shadow-lg shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-x-2 cursor-pointer disabled:opacity-50 mt-2"
      >
        <span>{isPending ? "در حال بررسی..." : "ورود به حساب کاربری"}</span>

        <HiArrowLeft className="text-sm" />
      </button>

      {/* Switch to Signup */}
      <p className="text-center text-xs text-muted pt-3 border-t border-border/60">
        حساب کاربری ندارید؟{" "}
        <button
          type="button"
          onClick={onSwitchToSignup}
          className="text-primary font-PeydaBold hover:underline cursor-pointer"
        >
          ثبت‌نام کنید
        </button>
      </p>
    </form>
  );
}
