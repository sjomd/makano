import { HiCheckCircle, HiOutlineExclamationCircle } from "react-icons/hi";

export default function ProfileField({
  name,
  label,
  register,
  rules,
  error,
  placeholder,
  dir = "rtl",
  maxLength,
  inputMode = "text",
  required = false,
  valueLength,
  success = false,
}) {
  const hasError = Boolean(error);

  return (
    <div className="min-w-0 space-y-2">
      <div className="flex items-center justify-between gap-2">
        <label
          htmlFor={name}
          className="flex items-center gap-1 text-xs font-PeydaMedium text-main"
        >
          {label}

          {required && <span className="text-rose-500">*</span>}
        </label>

        {typeof valueLength === "number" && (
          <span
            dir="ltr"
            className={`text-[10px] ${
              hasError ? "text-rose-500" : "text-muted"
            }`}
          >
            {valueLength} / {maxLength}
          </span>
        )}
      </div>

      <div className="relative">
        <input
          id={name}
          type="text"
          dir={dir}
          maxLength={maxLength}
          inputMode={inputMode}
          placeholder={placeholder}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${name}-error` : undefined}
          {...register(name, rules)}
          className={`
            w-full rounded-2xl border px-4 py-3.5
            text-sm outline-none transition-all
            placeholder:text-muted/40
            ${
              hasError
                ? "border-rose-500 bg-rose-500/[0.03] focus:ring-2 focus:ring-rose-500/10"
                : success
                  ? "border-emerald-500/50 bg-emerald-500/[0.02] focus:ring-2 focus:ring-emerald-500/10"
                  : "border-border bg-card text-main focus:border-primary focus:ring-2 focus:ring-primary/10"
            }
          `}
        />

        {success && !hasError && (
          <HiCheckCircle
            className={`absolute top-1/2 -translate-y-1/2 text-emerald-500 text-lg ${
              dir === "ltr" ? "left-4" : "right-4"
            }`}
          />
        )}
      </div>

      {hasError && (
        <p
          id={`${name}-error`}
          className="flex items-center gap-1.5 text-[11px] text-rose-500"
        >
          <HiOutlineExclamationCircle className="shrink-0 text-sm" />
          {error.message}
        </p>
      )}
    </div>
  );
}
