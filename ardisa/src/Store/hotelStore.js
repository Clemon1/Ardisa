import { create } from "zustand";

export const useHotelStore = create((set) => ({
  hotel: [],

  bookHotel: (newHotel) =>
    set((state) => ({ hotel: [state.hotel, ...newHotel] })),
}));
