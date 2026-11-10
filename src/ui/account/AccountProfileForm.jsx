import { useEffect } from "react";
import { useForm } from "react-hook-form";

import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlineCreditCard,
  HiOutlineExclamationCircle,
  HiCheckCircle,
} from "react-icons/hi";

import ProfileField from "./ProfileField";
import ProfileFormActions from "./ProfileFormActions";

import {
  normalizeDigits,
  normalizeSheba,
  validateFullName,
  validateIranianMobile,
  validateNationalCode,
  validateIranianSheba,
} from "@/utils/profileValidation";
import useAuth from "@/hooks/auth/useAuth";
import useUserProfile from "@/authentication/useUserProfile";
import useUpdateProfile from "./useUpdateProfiles";

const EMPTY_FORM = {
  fullName: "",
  phone: "",
  nationalCode: "",
  shabaNumber: "",
};

export default function AccountProfileForm() {
  const { user } = useAuth();

  const { profile, isLoading, isError } = useUserProfile(user?.id);

  const { updateProfile, isPending } = useUpdateProfile();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty, isSubmitting, isSubmitted, touchedFields },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: EMPTY_FORM,
  });

  const values = watch();

  // مقداردهی اولیه و هماهنگی با Cache
  useEffect(() => {
    if (!profile) return;

    reset({
      fullName: profile.full_name || "",
      phone: profile.phone || "",
      nationalCode: profile.national_code || "",
      shabaNumber: profile.iban || "",
    });
  }, [profile, reset]);

  // جلوگیری از خروج با تغییرات ذخیره‌نشده
  useEffect(() => {
    if (!isDirty || isPending) return;

    function handleBeforeUnload(event) {
      event.preventDefault();
      event.returnValue = "";
    }

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty, isPending]);

  async function onSubmit(data) {
    const updatedProfile = await updateProfile({
      userId: user.id,
      fullName: data.fullName.trim(),
      phone: normalizeDigits(data.phone),
      nationalCode: normalizeDigits(data.nationalCode),
      shabaNumber: normalizeSheba(data.shabaNumber),
    });

    reset({
      fullName: updatedProfile.full_name || "",
      phone: updatedProfile.phone || "",
      nationalCode: updatedProfile.national_code || "",
      shabaNumber: updatedProfile.iban || "",
    });
  }

  function handleReset() {
    if (!profile) return;

    reset({
      fullName: profile.full_name || "",
      phone: profile.phone || "",
      nationalCode: profile.national_code || "",
      shabaNumber: profile.iban || "",
    });
  }

  function isFieldValid(fieldName, validator) {
    const value = values[fieldName];

    if (!touchedFields[fieldName] && !isSubmitted) {
      return false;
    }

    return Boolean(value) && validator(value) === true;
  }

  const phoneLength = normalizeDigits(values.phone).length;
  const nationalCodeLength = normalizeDigits(values.nationalCode).length;
  const shebaLength = normalizeSheba(values.shabaNumber).length;

  if (isLoading) {
    return (
      <div className="bg-base border border-border rounded-[28px] p-6 sm:p-8">
        <div className="animate-pulse space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-card" />
            <div className="space-y-2">
              <div className="h-4 w-40 rounded bg-card" />
              <div className="h-3 w-28 rounded bg-card" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="space-y-3">
                <div className="h-3 w-24 rounded bg-card" />
                <div className="h-12 rounded-2xl bg-card" />
              </div>
            ))}
          </div>

          <div className="h-12 rounded-2xl bg-card" />
        </div>
      </div>
    );
  }

  if (isError || !profile) {
    return (
      <div className="bg-base border border-border rounded-[28px] p-6">
        <div className="flex items-center gap-2 text-rose-500">
          <HiOutlineExclamationCircle className="text-lg" />

          <p className="text-sm">دریافت اطلاعات حساب با مشکل مواجه شد.</p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="bg-base border border-border rounded-[28px] p-5 sm:p-7 space-y-7 shadow-xl"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-primary">
            <HiOutlineUser className="text-xl" />
          </span>

          <div>
            <h3 className="text-sm font-PeydaBold text-main">
              اطلاعات حساب کاربری
            </h3>

            <p className="mt-1 text-[11px] text-muted">
              مدیریت مشخصات هویتی و بانکی
            </p>
          </div>
        </div>

        <div
          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] ${
            isPending || isSubmitting
              ? "bg-blue-500/10 text-blue-500"
              : isDirty
                ? "bg-amber-500/10 text-amber-500"
                : "bg-emerald-500/10 text-emerald-500"
          }`}
        >
          {isPending || isSubmitting ? (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              در حال ذخیره
            </>
          ) : isDirty ? (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              تغییرات ذخیره‌نشده
            </>
          ) : (
            <>
              <HiCheckCircle className="text-sm" />
              اطلاعات ذخیره شده
            </>
          )}
        </div>
      </div>

      {/* Personal Information */}
      <section className="space-y-5">
        <div className="flex items-center gap-2">
          <HiOutlineUser className="text-primary text-base" />

          <h4 className="text-xs font-PeydaBold text-main">مشخصات شخصی</h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-6">
          <ProfileField
            name="fullName"
            label="نام و نام خانوادگی"
            placeholder="مثلاً علی محمدی"
            register={register}
            error={errors.fullName}
            required
            rules={{
              validate: validateFullName,
            }}
            success={isFieldValid("fullName", validateFullName)}
          />

          {/* Email - Read Only */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="flex items-center gap-1.5 text-xs font-PeydaMedium text-main"
            >
              پست الکترونیک
              <span className="text-[10px] text-muted">(غیرقابل تغییر)</span>
            </label>

            <div className="relative">
              <input
                id="email"
                type="email"
                value={user?.email || ""}
                readOnly
                dir="ltr"
                className="w-full rounded-2xl border border-border/60 bg-card/50 px-4 py-3.5 pl-11 text-left text-sm text-muted outline-none cursor-not-allowed"
              />

              <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted text-lg" />
            </div>
          </div>

          <ProfileField
            name="phone"
            label="شماره تماس"
            placeholder="09123456789"
            register={register}
            error={errors.phone}
            dir="ltr"
            inputMode="numeric"
            maxLength={11}
            valueLength={phoneLength}
            required
            rules={{
              setValueAs: normalizeDigits,
              validate: validateIranianMobile,
            }}
            success={isFieldValid("phone", validateIranianMobile)}
          />

          <ProfileField
            name="nationalCode"
            label="کد ملی"
            placeholder="۱۰ رقم کد ملی"
            register={register}
            error={errors.nationalCode}
            dir="ltr"
            inputMode="numeric"
            maxLength={10}
            valueLength={nationalCodeLength}
            required
            rules={{
              setValueAs: normalizeDigits,
              validate: validateNationalCode,
            }}
            success={isFieldValid("nationalCode", validateNationalCode)}
          />
        </div>
      </section>

      {/* Banking Information */}
      <section className="space-y-5 border-t border-border/60 pt-6">
        <div className="flex items-center gap-2">
          <HiOutlineCreditCard className="text-primary text-base" />

          <h4 className="text-xs font-PeydaBold text-main">اطلاعات بانکی</h4>
        </div>

        <div className="grid grid-cols-1 gap-5">
          <ProfileField
            name="shabaNumber"
            label="شماره شبا"
            placeholder="۲۴ رقم شماره شبا بدون IR"
            register={register}
            error={errors.shabaNumber}
            dir="ltr"
            inputMode="numeric"
            maxLength={26}
            valueLength={shebaLength}
            required
            rules={{
              setValueAs: normalizeSheba,
              validate: validateIranianSheba,
            }}
            success={isFieldValid("shabaNumber", validateIranianSheba)}
          />
        </div>

        <p className="text-[11px] leading-6 text-muted">
          شماره شبا را می‌توانید با یا بدون پیشوند IR وارد کنید. فاصله‌ها و
          پیشوند IR هنگام ذخیره حذف می‌شوند.
        </p>
      </section>

      {/* Actions */}
      <ProfileFormActions
        isDirty={isDirty}
        isPending={isPending || isSubmitting}
        onReset={handleReset}
      />
    </form>
  );
}
