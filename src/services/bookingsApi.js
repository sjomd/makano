import { supabase } from "./supabase";

export async function createBooking({ stayId, checkIn, checkOut, guestCount }) {
  const params = {
    p_stay_id: stayId,
    p_check_in: checkIn,
    p_check_out: checkOut,
    p_guest_count: guestCount,
  };

  console.log("Booking params:", params);

  const { data, error } = await supabase.rpc("create_booking", params);

  if (error) {
    console.error("Booking error:", error);
    throw error;
  }

  return data;
}
export async function getUserBookings() {
  const { data, error } = await supabase.from("bookings").select("*");
  if (error) {
    console.error("SUPABASE ERROR:", error);
    throw new Error("اطلاعات سفرهای شما بارگذاری نشد: " + error.message);
  }
  return data;
}
