import { HiOutlineCamera } from "react-icons/hi";
import AccountSecurityBox from "./AccountSecurityBox";
import AccountProfileForm from "./AccountProfileForm";
import useUserProfile from "@/authentication/useUserProfile";
import useUploadAvatar from "./useUploadAvatar";
import useDeleteAvatar from "./useDeleteAvatar";

export default function MyAccountPage({ user }) {
  const { profile } = useUserProfile(user?.id);
  const defaultValues = {
    fullName: profile?.full_name || "امید رضایی",
    phone: profile?.phone || "شماره تلفن خود را وارد کنید",
    email: profile?.email || "ایمیل خود را وارد کنید",
    avatar: profile?.avatar_url,
    nationalCode: profile?.national_code || "کد ملی خود را وارد کنید",
    shabaNumber: profile?.iban || "شماره شبا خود را وارد کنید",
  };
  const { uploadAvatarImage, isPending: isUploading } = useUploadAvatar();
  const { deleteAvatarImage, isPending: isDeleting } = useDeleteAvatar();
  const isDisabled = isDeleting || isUploading;
  function handleAvatarChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    uploadAvatarImage({ file, userId: user?.id });
    e.target.value = "";
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-10" dir="rtl">
      <div className="pb-4 border-b border-border">
        <h1 className="text-lg font-PeydaBold text-main">
          اطلاعات حساب کاربری
        </h1>
        <p className="text-xs text-muted font-PeydaLight mt-1">
          مدیریت اطلاعات شخصی، امنیت و حساب بانکی
        </p>
      </div>

      {/* ۱. کارت آواتار و آپلود عکس */}
      <div className="bg-base border border-border rounded-3xl p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          {/* User Information */}
          <div className="flex items-center gap-4 min-w-0">
            <div className="relative shrink-0">
              <div className="size-[76px] rounded-2xl overflow-hidden bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-PeydaBold text-2xl">
                {defaultValues?.avatar ? (
                  <img
                    src={defaultValues.avatar}
                    alt={defaultValues?.fullName || "تصویر پروفایل"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>{defaultValues?.fullName?.charAt(0) || "م"}</span>
                )}
              </div>

              <span className="absolute -bottom-1.5 -right-1.5 size-5 rounded-full bg-emerald-500 border-[3px] border-base" />
            </div>

            <div className="min-w-0">
              <h3 className="text-base font-PeydaBold text-main truncate">
                {defaultValues?.fullName}
              </h3>

              <span className="text-xs text-muted font-PeydaLight block mt-1.5">
                مسافر تایید شده مکانو
              </span>

              <span className="text-[11px] text-muted mt-2 block">
                تصویر پروفایل شما
              </span>
            </div>
          </div>

          {/* Avatar Actions */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <label
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-PeydaBold border border-primary bg-primary text-white transition-all ${
                isDisabled
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer hover:opacity-90"
              }`}
            >
              <HiOutlineCamera className="text-lg" />

              <span>تغییر تصویر</span>

              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleAvatarChange}
                disabled={isDisabled}
                className="sr-only"
              />
            </label>

            <button
              type="button"
              disabled={isDisabled || !defaultValues?.avatar}
              onClick={() => deleteAvatarImage(user?.id)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-PeydaBold text-red-500 bg-red-500/5 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              حذف تصویر
            </button>
          </div>
        </div>
      </div>

      {/* ۲. سکشن امنیت */}
      <AccountSecurityBox
        onUpdatePassword={(data) => console.log("Pass:", data)}
      />

      {/* ۳. سکشن پروفایل */}
      <AccountProfileForm
        defaultValues={defaultValues}
        onSaveProfile={(data) => console.log("Profile:", data)}
      />
    </div>
  );
}
