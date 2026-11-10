import { supabase } from "../services/supabase";
const RELATION_MAP = {
  city: "cities.slug",
  property_type: "property_types.slug",
  region_type: "region_types.slug",
  amenities: "property_amenity.amenities.slug",
  rules: "property_rule.rules.slug",
};

export async function getStays({ filters = [], sortBy = {} }) {
  const activeFilterFields = new Set(filters.map((f) => f.field));
  const inner = (fieldKey) =>
    activeFilterFields.has(fieldKey) ? "!inner" : "";

  const selectQuery = `
    *,
    cities:city_id${inner("city")}(id, name, slug),
    property_types${inner("property_type")}(id, name, slug),
    region_types${inner("region_type")}(id, name, slug),
    property_amenity${inner("amenities")}(amenities${inner("amenities")}(id, name, slug)),
    property_rule${inner("rules")}(rules${inner("rules")}(id, name, slug))
  `;

  let query = supabase.from("stays").select(selectQuery);

  filters.forEach(({ field, operator, value }) => {
    const targetColumn = RELATION_MAP[field] || field;

    if (operator === "in" || Array.isArray(value)) {
      const arrayVal = Array.isArray(value) ? value : [value];
      query = query.in(targetColumn, arrayVal);
    } else if (typeof query[operator] === "function") {
      query = query[operator](targetColumn, value);
    } else {
      query = query.eq(targetColumn, value);
    }
  });

  if (sortBy?.field && sortBy?.direction && sortBy.direction !== "undefined") {
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });
  }

  const { data, error } = await query;

  if (error) {
    console.error("SUPABASE ERROR:", error);
    throw new Error("Stays could be not loaded : " + error.message);
  }

  return data;
}
export async function getRandomFeaturedStay() {
  const { count, error: countError } = await supabase
    .from("stays")
    .select("*", { count: "exact", head: true });

  if (countError) {
    throw new Error("خطا در ارتباط با دیتابیس برای شمارش");
  }

  if (!count || count === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * count);

  const selectQuery = `
    *,
    cities:city_id(id, name, slug),
    property_types(id, name, slug),
    region_types(id, name, slug),
    property_amenity(amenities(id, name, slug)),
    property_rule(rules(id, name, slug))
  `;

  const { data, error } = await supabase
    .from("stays")
    .select(selectQuery)
    .range(randomIndex, randomIndex)
    .single();

  if (error) {
    console.error("SUPABASE ERROR:", error);
    throw new Error("خطا در دریافت اقامتگاه تصادفی: " + error.message);
  }

  return data;
}
export async function getAmenities() {
  const { data, error } = await supabase.from("amenities").select("*");
  if (error) throw new Error("Amenities could not be loaded");
  return data;
}
export async function getPropertyTypes() {
  const { data, error } = await supabase.from("property_types").select("*");
  if (error) throw new Error("Property-types could not be loaded");
  return data;
}
export async function getRegionTypes() {
  const { data, error } = await supabase.from("region_types").select("*");
  if (error) throw new Error("Region-types could not be loaded");
  return data;
}
export async function getRules() {
  const { data, error } = await supabase.from("rules").select("*");
  if (error) throw new Error("Rules could not be loaded");
  return data;
}

export async function getStay(id) {
  const selectQuery = `
    *,
    cities:city_id(id, name, slug),
    property_types(id, name, slug),
    region_types(id, name, slug),
    property_amenity(amenities(id, name, slug)),
    property_rule(rules(id, name, slug)),
    stay_images(id, image_url, display_order)
  `;

  const { data, error } = await supabase
    .from("stays")
    .select(selectQuery)
    .eq("id", id)
    .single();

  if (error) {
    console.error("SUPABASE ERROR:", error);
    throw new Error("اطلاعات اقامتگاه بارگذاری نشد: " + error.message);
  }

  // مرتب‌سازی عکس‌ها بر اساس display_order
  if (data && data.stay_images) {
    data.stay_images.sort((a, b) => a.display_order - b.display_order);
  }

  return data;
}
export async function getRelatedStays(currentStay) {
  const selectQuery = `
    *,
    cities(id, name, slug),
    property_types(id, name, slug),
    region_types(id, name, slug),
    property_amenity(amenities(id, name, slug)),
    property_rule(rules(id, name, slug))

  `;
  const { data, error } = await supabase
    .from("stays")
    .select(selectQuery)
    .eq("property_type_id", currentStay.property_type_id)
    .eq("city_id", currentStay.city_id)
    .eq("is_active", true)
    .neq("id", currentStay.id)
    .limit(6);
  if (error) {
    console.error("SUPABASE ERROR:", error);
    throw new Error("اطلاعات اقامتگاهای مشابه بارگذاری نشد: " + error.message);
  }
  return data;
}
