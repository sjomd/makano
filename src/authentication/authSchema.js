import { z } from "zod";

// Shared validation
const emailSchema = z
  .string()
  .trim()
  .min(1, "وارد کردن ایمیل الزامی است")
  .email("فرمت ایمیل معتبر نیست");

const passwordSchema = z.string().min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد");

// Signup Schema
export const signupSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(1, "نام و نام خانوادگی را وارد کنید")
      .min(3, "نام باید حداقل ۳ کاراکتر باشد")
      .max(100, "نام نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد"),

    email: emailSchema,

    password: passwordSchema,

    confirmPassword: z.string().min(1, "تکرار رمز عبور الزامی است"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "رمزهای عبور مطابقت ندارند",
    path: ["confirmPassword"],
  });

// Login Schema
export const loginSchema = z.object({
  email: emailSchema,

  password: z.string().min(1, "وارد کردن رمز عبور الزامی است"),
});
