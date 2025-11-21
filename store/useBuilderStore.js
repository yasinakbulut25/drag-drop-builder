import { create } from "zustand";
import { generateId } from "@/lib/utils";
import { ELEMENT_DEFAULTS } from "@/components/elements/registry";

export const useBuilderStore = create((set) => ({
  elements: [],
  selectedId: null,

  addElement: (type, pos) =>
    set((state) => {
      const defaults = ELEMENT_DEFAULTS[type];

      const newElement = {
        id: generateId(),
        type,
        content: defaults.content,
        position: {
          x: pos.x,
          y: pos.y,
          width: defaults.width,
          height: defaults.height,
          zIndex: 1,
        },
        positionBehavior: defaults.positionBehavior,
        fixed: defaults.fixed || false,
        responsive: defaults.responsive ?? {},
      };

      return {
        ...state,
        elements: [...state.elements, newElement],
        project: {
          ...state.project,
          lastModified: new Date().toISOString(),
        },
      };
    }),

  selectElement: (id) => set({ selectedId: id }),
}));
