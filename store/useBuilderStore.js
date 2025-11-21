import { create } from "zustand";
import { generateId } from "@/lib/utils";

export const useBuilderStore = create((set) => ({
  elements: [],

  addElement: (type, position) =>
    set((state) => ({
      elements: [
        ...state.elements,
        {
          id: generateId(),
          type,
          position,
        },
      ],
    })),
}));
