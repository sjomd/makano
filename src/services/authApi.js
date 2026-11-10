import { processImage } from "@/utils/image/proccessImage";
import { supabase, supabaseUrl } from "./supabase";
import { createClient } from "@supabase/supabase-js";

// SIGN UP
export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
      },
    },
  });

  if (error) throw error;

  return data;
}

// LOGIN
export async function login({ email, password }) {
  const cleanEmail = email.trim();

  console.log("Login attempt:", {
    email: cleanEmail,
    passwordLength: password.length,
  });

  const { data, error } = await supabase.auth.signInWithPassword({
    email: cleanEmail,
    password,
  });

  console.log("Login response:", {
    user: data.user?.id,
    email: data.user?.email,
    session: !!data.session,
    error: error?.message,
    status: error?.status,
  });

  if (error) throw error;

  return data;
}

// LOGOUT
export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw error;
}

// GET CURRENT USER
export async function getCurrentUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw error;

  return user;
}
export async function getUserProfile(userId) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw error;

  return data;
}
function getAvatarFilePath(publicUrl) {
  if (!publicUrl) return null;

  const marker = "/storage/v1/object/public/avatars/";

  const markerIndex = publicUrl.indexOf(marker);

  if (markerIndex === -1) return null;

  const encodedPath = publicUrl.slice(markerIndex + marker.length);

  return decodeURIComponent(encodedPath.split("?")[0]);
}

export async function uploadAvatar({ file, userId }) {
  if (!userId) {
    throw new Error("کاربر شناسایی نشد.");
  }

  // دریافت آدرس آواتار قبلی
  const { data: currentProfile, error: profileError } = await supabase
    .from("profiles")
    .select("avatar_url")
    .eq("id", userId)
    .single();

  if (profileError) throw profileError;

  const oldAvatarUrl = currentProfile.avatar_url;

  // پردازش تصویر جدید
  const processedFile = await processImage(file, "avatar");

  // مسیر اختصاصی و نام یکتا
  const newFilePath = `${userId}/avatar-${crypto.randomUUID()}.webp`;

  // آپلود تصویر جدید
  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(newFilePath, processedFile, {
      contentType: "image/webp",
      cacheControl: "31536000",
      upsert: false,
    });

  if (uploadError) throw uploadError;

  // دریافت آدرس تصویر جدید
  const {
    data: { publicUrl },
  } = supabase.storage.from("avatars").getPublicUrl(newFilePath);

  // ثبت آدرس جدید در پروفایل
  const { data: updatedProfile, error: updateError } = await supabase
    .from("profiles")
    .update({ avatar_url: publicUrl })
    .eq("id", userId)
    .select()
    .single();

  // اگر ثبت در دیتابیس شکست خورد، تصویر جدید را حذف کن
  if (updateError) {
    await supabase.storage.from("avatars").remove([newFilePath]);
    throw updateError;
  }

  // فقط پس از موفقیت کامل، تصویر قبلی حذف می‌شود
  const oldFilePath = getAvatarFilePath(oldAvatarUrl);

  if (oldFilePath && oldFilePath !== newFilePath) {
    const { error: deleteError } = await supabase.storage
      .from("avatars")
      .remove([oldFilePath]);

    if (deleteError) {
      console.error("Old avatar deletion failed:", deleteError);
    }
  }

  return updatedProfile;
}
export async function deleteAvatar(userId) {
  if (!userId) {
    throw new Error("کاربر شناسایی نشد.");
  }

  // دریافت آدرس آواتار فعلی
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("avatar_url")
    .eq("id", userId)
    .single();

  if (profileError) throw profileError;

  const oldAvatarUrl = profile.avatar_url;

  // اگر آواتاری وجود ندارد
  if (!oldAvatarUrl) {
    return profile;
  }

  // خالی کردن آدرس آواتار در دیتابیس
  const { data: updatedProfile, error: updateError } = await supabase
    .from("profiles")
    .update({ avatar_url: null })
    .eq("id", userId)
    .select()
    .single();

  if (updateError) throw updateError;

  // استخراج مسیر فایل از URL
  const oldFilePath = getAvatarFilePath(oldAvatarUrl);

  // حذف فایل قبلی از Storage
  if (oldFilePath) {
    const { error: deleteError } = await supabase.storage
      .from("avatars")
      .remove([oldFilePath]);

    if (deleteError) {
      console.error("Avatar deletion from storage failed:", deleteError);
    }
  }

  return updatedProfile;
}
const verificationClient = createClient(
  supabaseUrl,
  import.meta.env.VITE_SUPABASE_KEY,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  },
);
export async function changePassword({ email, currentPassword, newPassword }) {
  if (!email || !currentPassword || !newPassword) {
    throw new Error("لطفاً تمام فیلدها را تکمیل کنید.");
  }

  // بررسی رمز فعلی با Client مستقل
  const { error: verificationError } =
    await verificationClient.auth.signInWithPassword({
      email,
      password: currentPassword,
    });

  if (verificationError) {
    throw new Error("CURRENT_PASSWORD_INVALID");
  }

  // دریافت Session اصلی
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session) {
    throw new Error("نشست کاربری معتبر نیست. دوباره وارد شوید.");
  }

  // تغییر رمز با Session اصلی
  const { error: updateError } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (updateError) {
    throw updateError;
  }

  return true;
}
// UPDATE USER PROFILE
export async function updateUserProfile({
  userId,
  fullName,
  phone,
  nationalCode,
  shabaNumber,
}) {
  if (!userId) {
    throw new Error("کاربر شناسایی نشد.");
  }

  const profileData = {
    full_name: fullName.trim(),
    phone,
    national_code: nationalCode,
    iban: shabaNumber,
  };

  const { data, error } = await supabase
    .from("profiles")
    .update(profileData)
    .eq("id", userId)
    .select()
    .single();

  if (error) throw error;

  return data;
}
export async function resetPassword(email) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(
    email.trim(),
    {
      redirectTo: `${window.location.origin}/reset-password`,
    },
  );

  if (error) throw error;

  return data;
}
export async function updatePassword(newPassword) {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) throw error;

  return data;
}
