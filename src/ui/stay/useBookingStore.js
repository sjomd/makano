import { create } from "zustand";

const initialState = {
  checkIn: "",
  checkOut: "",
  guests: 1,
};
export const useBookingStore = create((set) => ({
  ...initialState,
  setDates: (checkIn, checkOut) => set({ checkIn, checkOut }),
  setGuests: (guests) => set({ guests }),
  resetBooking: () => set(initialState),
}));
