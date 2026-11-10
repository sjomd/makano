import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";

import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
  HiArrowLeft,
} from "react-icons/hi";

import { AUTH_RULES } from "./authValidation";
import useSignup from "./useSignup";

const SIGNUP_FIELDS = [
  {
    name: "fullName",
    label: "نام و نام خانوادگی",
    placeholder: "مثلاً: امید رضایی",
    icon: HiOutlineUser,
    rules: AUTH_RULES.fullName,
  },
  {
    name: "email",
    label: "پست الکترونیک (ایمیل)",
    placeholder: "example@gmail.com",
    type: "email",
    icon: HiOutlineMail,
    ltr: true,
    mono: true,
    rules: AUTH_RULES.email,
  },
  {
    name: "password",
    label: "انتخاب رمز عبور",
    placeholder: "حداقل ۸ کاراکتر (حروف و عدد)",
    isPassword: true,
    icon: HiOutlineLockClosed,
    ltr: true,
    mono: true,
    rules: AUTH_RULES.signupPassword,
  },
];

export default function SignupForm({ onSwitchToLogin }) {
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const { signupUser, isPending, error } = useSignup();

  const redirectTo = location.state?.from
    ? `${location.state.from.pathname || ""}${
        location.state.from.search || ""
      }${location.state.from.hash || ""}`
    : "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  function onSubmit(data) {
    signupUser(data, {
      onSuccess: ({ session }) => {
        if (!session) return;

        navigate(redirectTo, {
          replace: true,
        });
      },
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-3.5">
      {SIGNUP_FIELDS.map(
        ({
          name,
          label,
          placeholder,
          type = "text",
          isPassword,
          icon: Icon,
          ltr,
          mono,
          rules,
        }) => {
          const hasError = !!errors[name];

          return (
            <div key={name} className="space-y-1.5">
              <label className="text-xs font-PeydaMedium text-muted block">
                {label}
              </label>

              <div className="relative flex items-center">
                <Icon
                  className={`absolute right-4 text-lg pointer-events-none ${
                    hasError ? "text-rose-400" : "text-primary"
                  }`}
                />

                <input
                  type={isPassword ? (showPass ? "text" : "password") : type}
                  placeholder={placeholder}
                  {...register(name, rules)}
                  className={`w-full bg-base border rounded-2xl pr-11 ${
                    isPassword ? "pl-10" : "pl-4"
                  } py-3 text-xs text-main outline-none transition-all ${
                    hasError
                      ? "border-rose-500/80 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
                      : "border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
                  } ${ltr ? "dir-ltr text-right" : ""} ${
                    mono ? "font-mono" : ""
                  }`}
                />

                {isPassword && (
                  <button
                    type="button"
                    onClick={() => setShowPass((prev) => !prev)}
                    className="absolute left-3.5 text-muted hover:text-main cursor-pointer"
                    aria-label={
                      showPass ? "مخفی کردن رمز عبور" : "نمایش رمز عبور"
                    }
                  >
                    {showPass ? (
                      <HiOutlineEyeOff className="text-primary" />
                    ) : (
                      <HiOutlineEye className="text-primary" />
                    )}
                  </button>
                )}
              </div>

              {hasError && (
                <span className="text-[11px] text-rose-400 block pr-1">
                  {errors[name].message}
                </span>
              )}
            </div>
          );
        },
      )}

      {error && (
        <p role="alert" className="text-[11px] text-rose-400 text-center">
          {error.message || "ثبت‌نام انجام نشد. لطفاً دوباره تلاش کنید."}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-primary hover:bg-primary-hover text-white text-xs font-PeydaBold py-3.5 rounded-2xl shadow-lg shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-x-2 cursor-pointer disabled:opacity-50 mt-2"
      >
        <span>{isPending ? "در حال ساخت حساب..." : "ساخت حساب کاربری"}</span>

        <HiArrowLeft className="text-sm" />
      </button>

      <p className="text-center text-xs text-muted pt-3 border-t border-border/60">
        قبلاً ثبت‌نام کرده‌اید؟{" "}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-primary font-PeydaBold hover:underline cursor-pointer"
        >
          وارد شوید
        </button>
      </p>
    </form>
  );
}
