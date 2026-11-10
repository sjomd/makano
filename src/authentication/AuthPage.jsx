import { useState } from "react";

import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ForgotPasswordForm from "./forget-password/ForgetPasswordForm";

export default function AuthPage() {
  const [mode, setMode] = useState("login");

  const isLogin = mode === "login";
  const isSignup = mode === "signup";
  const isForgot = mode === "forgot";

  return (
    <div
      className="min-h-[80vh] flex items-center justify-center px-4 py-10"
      dir="rtl"
    >
      <div className="relative w-full max-w-md bg-card border border-border rounded-[32px] p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Background Neon Light */}
        <div
          className={`absolute -top-24 w-56 h-56 bg-primary/20 rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
            isLogin || isForgot ? "-right-20" : "-left-20 bg-indigo-500/20"
          }`}
        />

        {/* Login / Signup Tabs */}
        {!isForgot && (
          <div className="relative bg-base border border-border p-1.5 rounded-2xl grid grid-cols-2 mb-6">
            <span
              className={`absolute inset-y-1.5 w-[calc(50%-6px)] bg-primary rounded-xl shadow-lg shadow-primary/30 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isLogin
                  ? "right-1.5 translate-x-0"
                  : "right-1.5 -translate-x-full"
              }`}
            />

            <button
              type="button"
              onClick={() => setMode("login")}
              className={`relative z-10 py-2.5 text-xs font-PeydaBold transition-colors duration-300 cursor-pointer ${
                isLogin ? "text-white" : "text-muted hover:text-main"
              }`}
            >
              ورود به حساب
            </button>

            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`relative z-10 py-2.5 text-xs font-PeydaBold transition-colors duration-300 cursor-pointer ${
                isSignup ? "text-white" : "text-muted hover:text-main"
              }`}
            >
              ثبت‌نام سریع
            </button>
          </div>
        )}

        {/* Dynamic Title */}
        <div className="text-center mb-6">
          <h1 className="text-base sm:text-lg font-PeydaBlack text-main transition-all duration-300">
            {isLogin && "خوش برگشتی به مکانو! 👋"}
            {isSignup && "سفر بعدیت از اینجا شروع میشه ✨"}
            {isForgot && "بازیابی رمز عبور 🔐"}
          </h1>

          <p className="text-xs text-muted font-PeydaLight mt-1">
            {isLogin && "برای دسترسی به رزروها و علاقه‌مندی‌ها وارد شوید"}

            {isSignup && "تنها در چند ثانیه حساب کاربری خود را بسازید"}

            {isForgot &&
              "ایمیل حساب کاربری خود را وارد کنید تا لینک بازیابی برایتان ارسال شود"}
          </p>
        </div>

        {/* Forms */}
        {!isForgot ? (
          <div className="relative overflow-hidden">
            <div
              className={`flex w-[200%] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isLogin ? "translate-x-0" : "translate-x-1/2"
              }`}
            >
              {/* Login Form */}
              <div
                className={`w-1/2 pl-3 transition-all duration-500 ${
                  isLogin
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <LoginForm
                  onSwitchToSignup={() => setMode("signup")}
                  onForgetPassword={() => setMode("forgot")}
                />
              </div>

              {/* Signup Form */}
              <div
                className={`w-1/2 pr-3 transition-all duration-500 ${
                  isSignup
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <SignupForm onSwitchToLogin={() => setMode("login")} />
              </div>
            </div>
          </div>
        ) : (
          <ForgotPasswordForm onBackToLogin={() => setMode("login")} />
        )}
      </div>
    </div>
  );
}
