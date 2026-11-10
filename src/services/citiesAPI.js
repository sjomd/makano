import { supabase, supabaseUrl } from "./supabase";

export async function getAllCities() {
  let { data, error } = await supabase.from("cities").select("*");
  if (error) {
    console.error(error);
    throw new Error("Regular cities could not be loaded");
  }

  return data;
}
export async function getRegularCities() {
  let { data, error } = await supabase
    .from("cities")
    .select("*")
    .eq("is_northern", false);
  if (error) {
    console.error(error);
    throw new Error("Regular cities could not be loaded");
  }

  const northCard = {
    id: "north-region-card",
    name: "شمال ایران",
    slug: "'northern-stays",
    image_url: `${supabaseUrl}/storage/v1/object/public/cities-images/shomal.jpg`,
    is_northern: true,
  };
  const sectionRegularCities = [...data, northCard];
  return sectionRegularCities;
}
export async function getNorthernCities() {
  let { data, error } = await supabase
    .from("cities")
    .select("*")
    .eq("is_northern", true);

  if (error) {
    console.error(error);
    throw new Error("Northern cities could not be loaded");
  }

  return data;
}
