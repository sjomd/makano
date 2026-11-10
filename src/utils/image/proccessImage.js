import imageCompression from "browser-image-compression";

import imagePresets from "./imagePresets";
import { validateImage } from "./validateImage";

export async function processImage(file, presetName = "avatar") {
  validateImage(file);

  const preset = imagePresets[presetName];

  if (!preset) {
    throw new Error("تنظیمات پردازش تصویر معتبر نیست.");
  }

  const options = {
    maxSizeMB: preset.maxSizeMB,
    maxWidthOrHeight: preset.maxWidthOrHeight,
    useWebWorker: true,
    fileType: "image/webp",
    initialQuality: preset.initialQuality,
    preserveExif: false,
  };

  const compressedFile = await imageCompression(file, options);

  if (compressedFile.type !== "image/webp") {
    throw new Error("تبدیل تصویر به WebP ناموفق بود.");
  }

  return compressedFile;
}
