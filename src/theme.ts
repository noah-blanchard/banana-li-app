import { createTheme } from "@mantine/core";

export const theme = createTheme({
  primaryColor: "grape", // Couleur principale (boutons, switch, etc.)

  colors: {
    pastelRed: [
      "#fff1f2", "#ffe4e6", "#fecdd3", "#fda4af", "#fb7185",
      "#f43f5e", "#e11d48", "#be123c", "#9f1239", "#881337",
    ],
    pastelGreen: [
      "#f0fdf4", "#dcfce7", "#bbf7d0", "#86efac", "#4ade80",
      "#22c55e", "#16a34a", "#15803d", "#166534", "#14532d",
    ],
    grape: [
      "#fdf4ff",
      "#fce7fe",
      "#fbcfe8",
      "#f9a8d4",
      "#f472b6",
      "#ec4899",
      "#db2777",
      "#be185d",
      "#9d174d",
      "#831843",
    ],
    yellow: [
      "#fefce8",
      "#fef9c3",
      "#fef08a",
      "#fde047",
      "#facc15",
      "#eab308",
      "#ca8a04",
      "#a16207",
      "#854d0e",
      "#713f12",
    ],
    lavender: [
      "#f5f3ff",
      "#ede9fe",
      "#ddd6fe",
      "#c4b5fd",
      "#a78bfa",
      "#8b5cf6",
      "#7c3aed",
      "#6d28d9",
      "#5b21b6",
      "#4c1d95",
    ],
  },

  fontFamily: "Comic Sans MS, cursive, sans-serif",

  defaultRadius: "md",

  headings: {
    fontFamily: "Comic Sans MS, cursive, sans-serif",
    fontWeight: "600",
  },
});
