import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
export const useDarkMode = create(
  devtools(
    persist(
      (set) => ({
        darkMode: false,

        isDark: () =>
          set((state) => ({
            darkMode: !state.darkMode,
          })),
      }),
      {
        name: "darkmode",
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
);
