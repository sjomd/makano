import ResetPasswordForm from "./ResetPasswordForm";

export default function ResetPassword() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10"
      dir="rtl"
    >
      <div className="relative w-full max-w-md bg-card border border-border rounded-[32px] p-6 sm:p-8 shadow-2xl overflow-hidden">
        <div className="absolute -top-24 -right-20 w-56 h-56 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative text-center mb-8">
          <h1 className="text-base sm:text-lg font-PeydaBlack text-main">
            تعیین رمز عبور جدید 🔐
          </h1>

          <p className="text-xs text-muted font-PeydaLight mt-2 leading-6">
            رمز عبور جدید خود را وارد کنید تا بتوانید دوباره به حساب مکانو
            دسترسی داشته باشید.
          </p>
        </div>

        <ResetPasswordForm />
      </div>
    </div>
  );
}
