// تبدیل ارقام فارسی و عربی به انگلیسی
export function normalizeDigits(value = "") {
  return String(value)
    .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)));
}

// نرمال‌سازی شماره شبا
export function normalizeSheba(value = "") {
  return normalizeDigits(value)
    .replace(/\s/g, "")
    .toUpperCase()
    .replace(/^IR/, "");
}

// اعتبارسنجی نام کامل
export function validateFullName(value) {
  const name = value?.trim();

  if (!name) return "نام و نام خانوادگی الزامی است.";

  if (name.length < 3) {
    return "نام واردشده بیش از حد کوتاه است.";
  }

  if (!/^[\u0600-\u06FF\s‌]+$/.test(name)) {
    return "نام باید با حروف فارسی وارد شود.";
  }

  if (name.split(/\s+/).length < 2) {
    return "لطفاً نام و نام خانوادگی را وارد کنید.";
  }

  return true;
}

// اعتبارسنجی شماره موبایل ایران
export function validateIranianMobile(value) {
  const phone = normalizeDigits(value).replace(/\s/g, "");

  if (!phone) return "شماره تماس الزامی است.";

  if (!/^09\d{9}$/.test(phone)) {
    return "شماره موبایل باید با ۰۹ شروع شده و ۱۱ رقم باشد.";
  }

  return true;
}

// اعتبارسنجی کد ملی ایران
export function validateNationalCode(value) {
  const code = normalizeDigits(value).trim();

  if (!code) return "کد ملی الزامی است.";

  if (!/^\d{10}$/.test(code)) {
    return "کد ملی باید دقیقاً ۱۰ رقم باشد.";
  }

  if (/^(\d)\1{9}$/.test(code)) {
    return "کد ملی معتبر نیست.";
  }

  const checkDigit = Number(code[9]);

  const sum = code
    .slice(0, 9)
    .split("")
    .reduce((total, digit, index) => total + Number(digit) * (10 - index), 0);

  const remainder = sum % 11;

  const expectedDigit = remainder < 2 ? remainder : 11 - remainder;

  if (checkDigit !== expectedDigit) {
    return "کد ملی معتبر نیست.";
  }

  return true;
}

// اعتبارسنجی شماره شبای ایران
export function validateIranianSheba(value) {
  const sheba = normalizeSheba(value);

  if (!sheba) return "شماره شبا الزامی است.";

  if (!/^\d{24}$/.test(sheba)) {
    return "شماره شبا باید شامل ۲۴ رقم باشد.";
  }

  const iban = `IR${sheba}`;

  const rearranged = `${iban.slice(4)}${iban.slice(0, 4)}`;

  const numericIban = rearranged.replace(/[A-Z]/g, (char) =>
    String(char.charCodeAt(0) - 55),
  );

  let remainder = 0;

  for (const digit of numericIban) {
    remainder = (remainder * 10 + Number(digit)) % 97;
  }

  if (remainder !== 1) {
    return "شماره شبا معتبر نیست.";
  }

  return true;
}
