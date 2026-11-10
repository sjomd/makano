import { supabase } from "./supabase";

// Get user favorites
export async function getFavorites() {
  const { data, error } = await supabase.from("favorites").select("stay_id");

  if (error) throw error;

  return data;
}
export async function getFavoriteStays() {
  const { data, error } = await supabase
    .from("favorites")
    .select("stay:stays(*)");

  if (error) throw error;

  return data.map((favorite) => favorite.stay).filter(Boolean);
}

// Add favorite
export async function addFavorite({ stayId, userId }) {
  const { data, error } = await supabase
    .from("favorites")
    .insert({
      stay_id: stayId,
      user_id: userId,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

// Remove favorite
export async function removeFavorite({ stayId, userId }) {
  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("stay_id", stayId)
    .eq("user_id", userId);

  if (error) throw error;
}
