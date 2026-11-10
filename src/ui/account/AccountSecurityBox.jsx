import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  HiOutlineLockClosed,
  HiCheck,
  HiX,
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";

import useChangePassword from "./useChangePassword";
import notify from "@/utils/toast";
import useAuth from "@/hooks/auth/useAuth";

export default function AccountSecurityBox() {
  const { user } = useAuth();

  const [visiblePasswords, setVisiblePasswords] = useState({
    current: false,
    newPass: false,
    confirm: false,
  });

  const {
    changePassword,
    isPending,
    reset: resetMutation,
  } = useChangePassword();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    clearErrors,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      current: "",
      newPass: "",
      confirm: "",
    },
  });

  const newPassword = watch("newPass", "");

  const passwordRules = {
    minLength: newPassword.length >= 8,
    maxLength: newPassword.length <= 16,
    hasLetter: /[a-zA-Z]/.test(newPassword),
    hasNumber: /[0-9]/.test(newPassword),
    noSpaces: !/\s/.test(newPassword),
  };

  const isPasswordValid = Object.values(passwordRules).every(Boolean);

  function togglePasswordVisibility(field) {
    setVisiblePasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  }

  async function onSubmit(data) {
    clearErrors("current");

    try {
      await changePassword({
        email: user.email,
        currentPassword: data.current,
        newPassword: data.newPass,
      });

      reset();
      resetMutation();

      setVisiblePasswords({
        current: false,
        newPass: false,
        confirm: false,
      });

      notify.success("رمز عبور با موفقیت تغییر کرد.");
    } catch (error) {
      if (error.message === "CURRENT_PASSWORD_INVALID") {
        setError("current", {
          type: "server",
          message: "رمز عبور فعلی صحیح نیست.",
        });

        return;
      }

      // خطاهای عمومی قبلاً توسط هوک Toast شده‌اند.
    }
  }

  const fields = [
    {
      name: "current",
      label: "رمز عبور فعلی",
      placeholder: "رمز فعلی را وارد کنید",
      rules: {
        required: "رمز عبور فعلی الزامی است.",
      },
    },
    {
      name: "newPass",
      label: "رمز عبور جدید",
      placeholder: "رمز جدید را وارد کنید",
      rules: {
        required: "رمز عبور جدید الزامی است.",
        validate: {
          minLength: (value) =>
            value.length >= 8 || "حداقل ۸ کاراکتر وارد کنید.",

          maxLength: (value) =>
            value.length <= 16 || "حداکثر ۱۶ کاراکتر مجاز است.",

          hasLetter: (value) =>
            /[a-zA-Z]/.test(value) || "رمز باید شامل حروف انگلیسی باشد.",

          hasNumber: (value) =>
            /[0-9]/.test(value) || "رمز باید شامل حداقل یک عدد باشد.",

          noSpaces: (value) =>
            !/\s/.test(value) || "رمز نباید شامل فاصله باشد.",
        },
      },
    },
    {
      name: "confirm",
      label: "تکرار رمز جدید",
      placeholder: "رمز جدید را دوباره وارد کنید",
      rules: {
        required: "تکرار رمز عبور الزامی است.",
        validate: (value) =>
          value === newPassword || "رمز عبور با تکرار آن مطابقت ندارد.",
      },
    },
  ];

  function PasswordRequirement({ valid, children }) {
    return (
      <div
        className={`flex items-center gap-1.5 text-[10px] transition-colors ${
          valid ? "text-emerald-500" : "text-muted"
        }`}
      >
        {valid ? <HiCheck className="text-xs" /> : <HiX className="text-xs" />}
        <span>{children}</span>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="bg-base border border-border rounded-[28px] p-6 space-y-5 shadow-xl"
    >
      <div className="flex items-center justify-between border-b border-border/60 pb-4">
        <h3 className="text-sm font-PeydaBold text-main flex items-center gap-x-2.5">
          <span className="w-9 h-9 rounded-xl bg-primary/15 text-primary flex items-center justify-center">
            <HiOutlineLockClosed className="text-lg" />
          </span>

          <span>امنیت و تغییر رمز عبور</span>
        </h3>

        <span className="text-[11px] text-muted">مدیریت گذرواژه</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {fields.map(({ name, label, placeholder, rules }) => (
          <div key={name} className="space-y-2">
            <label
              htmlFor={name}
              className="text-xs font-PeydaMedium text-muted block"
            >
              {label}
            </label>

            <div
              className={`relative rounded-2xl border transition-all ${
                errors[name]
                  ? "border-rose-500 focus-within:ring-2 focus-within:ring-rose-500/10"
                  : "border-border focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20"
              }`}
            >
              <input
                id={name}
                type={visiblePasswords[name] ? "text" : "password"}
                placeholder={placeholder}
                autoComplete={
                  name === "current" ? "current-password" : "new-password"
                }
                {...register(name, rules)}
                className="w-full bg-card rounded-2xl px-4 py-3 pl-11 text-xs text-main outline-none dir-ltr text-left placeholder:text-muted/50"
              />

              <button
                type="button"
                onClick={() => togglePasswordVisibility(name)}
                aria-label={
                  visiblePasswords[name] ? "مخفی کردن رمز" : "نمایش رمز"
                }
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition-colors cursor-pointer"
              >
                {visiblePasswords[name] ? (
                  <HiOutlineEyeOff className="text-lg" />
                ) : (
                  <HiOutlineEye className="text-lg" />
                )}
              </button>
            </div>

            {errors[name] && (
              <p className="text-[10px] text-rose-500 flex items-center gap-1">
                <HiX className="shrink-0" />
                {errors[name].message}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-PeydaBold text-main">
            شرایط رمز عبور جدید
          </span>

          <span
            className={`text-[10px] ${
              isPasswordValid ? "text-emerald-500" : "text-muted"
            }`}
          >
            {isPasswordValid ? "رمز معتبر است" : "شرایط رمز"}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <PasswordRequirement valid={passwordRules.minLength}>
            حداقل ۸ کاراکتر
          </PasswordRequirement>

          <PasswordRequirement valid={passwordRules.maxLength}>
            حداکثر ۱۶ کاراکتر
          </PasswordRequirement>

          <PasswordRequirement valid={passwordRules.hasLetter}>
            دارای حروف انگلیسی
          </PasswordRequirement>

          <PasswordRequirement valid={passwordRules.hasNumber}>
            دارای عدد
          </PasswordRequirement>

          <PasswordRequirement valid={passwordRules.noSpaces}>
            بدون فاصله
          </PasswordRequirement>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/60">
        <button
          type="button"
          disabled={!isDirty || isPending || isSubmitting}
          onClick={() => {
            reset();
            resetMutation();
            setVisiblePasswords({
              current: false,
              newPass: false,
              confirm: false,
            });
          }}
          className="bg-card hover:bg-rose-500/10 text-muted hover:text-rose-400 border border-border text-xs font-PeydaBold px-4 py-2.5 rounded-xl transition-all cursor-pointer disabled:opacity-40 flex items-center gap-x-1"
        >
          <HiX className="text-sm" />
          <span>پاک کردن</span>
        </button>

        <button
          type="submit"
          disabled={isPending || isSubmitting || !isDirty}
          className="bg-card hover:border-primary/50 text-main border border-border text-xs font-PeydaBold px-5 py-2.5 rounded-xl transition-all cursor-pointer disabled:opacity-50 flex items-center gap-x-1.5"
        >
          {isPending ? (
            <span>در حال ثبت...</span>
          ) : (
            <>
              <HiCheck className="text-emerald-400 text-base" />
              <span>بروزرسانی رمز عبور</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
