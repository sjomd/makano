const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const MAX_INPUT_SIZE = 15 * 1024 * 1024; // 15MB

export function validateImage(file) {
  if (!file) {
    throw new Error("لطفاً یک تصویر انتخاب کنید.");
  }

  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error("فرمت تصویر باید JPG، PNG یا WebP باشد.");
  }

  if (file.size > MAX_INPUT_SIZE) {
    throw new Error("حجم تصویر نباید بیشتر از ۱۵ مگابایت باشد.");
  }

  return true;
}
