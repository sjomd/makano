import { create } from "zustand";
import { calcMaxPricePerNight } from "../utils/helpers";
import { calcNights, formatJalaliRange, toEnDigits } from "@/utils/dateUtils";
const initialState = {
  city: "",
  checkIn: "",
  checkOut: "",
  nights: 0,
  guests: 1,
  rating: "",
  rooms: 0,
  totalBudget: "",
  minPrice: 500000,
  maxPrice: 10000000,
  propertyTypes: [],
  regionTypes: [],
  amenities: [],
  rules: [],
};

export const usePropertyStore = create((set, get) => ({
  ...initialState,

  setCity: (city) => set({ city }),

  setDates: (checkIn, checkOut) => {
    const { totalBudget } = get();
    const cleanCheckIn = toEnDigits(checkIn || "");
    const cleanCheckOut = toEnDigits(checkOut || "");

    const nights = calcNights(cleanCheckIn, cleanCheckOut);
    const formattedDate = formatJalaliRange(cleanCheckIn, cleanCheckOut);
    const maxPrice = calcMaxPricePerNight(totalBudget, nights);

    set({
      checkIn: cleanCheckIn,
      checkOut: cleanCheckOut,
      nights,
      formattedDate,
      maxPrice,
    });
  },

  setGuests: (guests) => set({ guests: Math.max(1, Number(guests)) }),
  setRooms: (rooms) => set({ rooms: Math.max(0, Number(rooms)) }),
  setRating: (rating) => set({ rating: rating }),
  setTotalBudget: (val) => {
    const { nights } = get();
    const cleanBudget = toEnDigits(val).replace(/[^0-9]/g, "");
    const maxPrice = calcMaxPricePerNight(cleanBudget, nights);
    set({
      totalBudget: cleanBudget,
      maxPrice,
    });
  },
  setMaxPrice: (price) =>
    set({ maxPrice: toEnDigits(price).replace(/[^0-9]/g, "") }),
  setMinPrice: (price) =>
    set({ minPrice: toEnDigits(price).replace(/[^0-9]/g, "") }),

  initFromUrl: (searchParams) => {
    const city = searchParams.get("city-ilike") || "";
    const checkIn = searchParams.get("check-in") || "";
    const checkOut = searchParams.get("check_out") || "";
    const maxPrice = searchParams.get("price_per_night-lte") || 10000000;
    const minPrice = searchParams.get("price_per_night-gte") || 500000;
    const guests = Number(searchParams.get("capacity-gte")) || 1;
    const rating = searchParams.get("rating-gte") || "";
    const rooms = searchParams.get("rooms_count-gte") || 0;
    const nights = calcNights(checkIn, checkOut);
    const formattedDate = formatJalaliRange(checkIn, checkOut);
    const propertyTypes = searchParams.get("property_type-in")
      ? searchParams.get("property_type-in").split(",")
      : [];
    const regionTypes = searchParams.get("region_type-in")
      ? searchParams.get("region_type-in").split(",")
      : [];
    const amenities = searchParams.get("amenities-in")
      ? searchParams.get("amenities-in").split(",")
      : [];
    const rules = searchParams.get("rules-in")
      ? searchParams.get("rules-in").split(",")
      : [];

    set({
      city,
      checkIn,
      checkOut,
      nights,
      formattedDate,
      guests,
      rating,
      rooms,
      maxPrice,
      minPrice,
      propertyTypes,
      regionTypes,
      amenities,
      rules,
    });
  },
  toggleArrayFilter: (filterKey, value) => {
    const currentList = get()[filterKey] || [];
    if (currentList.includes(value)) {
      set({ [filterKey]: currentList.filter((item) => item !== value) });
    } else {
      set({ [filterKey]: [...currentList, value] });
    }
  },
  getUrlParams: () => {
    const {
      city,
      checkIn,
      checkOut,
      guests,
      rating,
      rooms,
      maxPrice,
      minPrice,
      propertyTypes,
      regionTypes,
      amenities,
      rules,
    } = get();

    const params = {};
    if (city) params["city-ilike"] = city;
    if (checkIn) params["check_in"] = checkIn;
    if (checkOut) params["check_out"] = checkOut;
    if (guests > 1) params["capacity-gte"] = guests;
    if (rating) params["rating-gte"] = rating;
    if (rooms) params["rooms_count-gte"] = rooms;
    if (minPrice > 500000) params["price_per_night-gte"] = String(minPrice);
    if (maxPrice < 10000000) params["price_per_night-lte"] = String(maxPrice);
    if (propertyTypes.length > 0)
      params["property_type-in"] = propertyTypes.join(",");
    if (regionTypes.length > 0)
      params["region_type-in"] = regionTypes.join(",");
    if (amenities.length > 0) params["amenities-in"] = amenities.join(",");
    if (rules.length > 0) params["rules-in"] = rules.join(",");
    return params;
  },
  resetSearch: () => set(initialState),
}));
