export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const AUTH_RULES = {
  fullName: {
    required: "وارد کردن نام و نام خانوادگی الزامی است",
    minLength: {
      value: 3,
      message: "نام باید حداقل ۳ حرف باشد",
    },
    maxLength: {
      value: 100,
      message: "نام نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد",
    },
  },

  email: {
    required: "وارد کردن ایمیل الزامی است",
    pattern: {
      value: EMAIL_REGEX,
      message: "فرمت ایمیل معتبر نیست (مثال: name@domain.com)",
    },
  },

  loginPassword: {
    required: "وارد کردن رمز عبور الزامی است",
    minLength: {
      value: 6,
      message: "رمز عبور حداقل ۶ کاراکتر است",
    },
  },

  signupPassword: {
    required: "انتخاب رمز عبور الزامی است",
    minLength: {
      value: 8,
      message: "رمز عبور باید حداقل ۸ کاراکتر باشد",
    },
    pattern: {
      value: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
      message: "رمز باید ترکیبی از حروف انگلیسی و حداقل یک عدد باشد",
    },
  },
};
