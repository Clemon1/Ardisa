import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
export const useAuthStore = create(
  devtools(
    persist(
      (set, get) => ({
        Users: null,
        isAuthenticated: false,

        onSuccess: (user) =>
          set((state) => ({
            Users: (state.Users = user),
            isAuthenticated: (state.isAuthenticated = true),
          })),

        onLogOut: () =>
          set((state) => ({
            user: (state.Users = null),
            isAuthenticated: (state.isAuthenticated = false),
          })),
      }),
      {
        name: "zustUsers",
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
);
