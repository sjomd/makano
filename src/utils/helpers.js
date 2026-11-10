export const formatToman = (price) => {
  if (price === undefined || price === null || isNaN(price)) return ".";

  return new Intl.NumberFormat("fa-IR").format(price);
};
export function calculateDiscountPrice(price, discount) {
  if (!discount || discount < 0) return price;
  const finalPrice = price * (1 - (discount || 0) / 100);
  return finalPrice;
}
export const calcMaxPricePerNight = (totalBudget, nights) => {
  const budget = Number(totalBudget);
  if (!budget || budget <= 0) return 0;
  const validNights = nights > 0 ? nights : 1;
  return Math.floor(budget / validNights);
};
export const calculateSurcharge = (price, surcharge, nights = 1) => {
  if (!surcharge || surcharge < 0) return price;
  const finalPrice = price * (1 + (surcharge || 0) / 100);
  return finalPrice * nights;
};
export const calculateExtraGuests = (extraGuest, surcharge, nights) => {
  if (!extraGuest || extraGuest < 0) return null;
  const finalPrice = extraGuest * surcharge * nights;
  return finalPrice;
};
