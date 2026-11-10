import { HiCheck, HiX } from "react-icons/hi";

export default function ProfileFormActions({ isDirty, isPending, onReset }) {
  return (
    <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-border/60 pt-5">
      <p className="text-[11px] text-muted leading-6">
        اطلاعات شما به‌صورت امن در حساب کاربری ذخیره می‌شود.
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onReset}
          disabled={!isDirty || isPending}
          className="flex flex-1 sm:flex-none items-center justify-center gap-1.5 rounded-xl border border-border bg-card px-4 py-3 text-xs font-PeydaBold text-muted transition-all hover:bg-rose-500/10 hover:text-rose-400 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <HiX className="text-sm" />
          انصراف
        </button>

        <button
          type="submit"
          disabled={!isDirty || isPending}
          className="flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-xs font-PeydaBold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          <HiCheck className="text-base" />

          {isPending ? "در حال ذخیره..." : "ذخیره تغییرات"}
        </button>
      </div>
    </div>
  );
}
