import { create } from "zustand";
import { generateId } from "@/lib/utils";
import { ELEMENT_DEFAULTS } from "@/components/elements/registry";

export const useBuilderStore = create((set) => ({
  project: {
    name: "Test Builder Layout",
    version: "1.0",
    created: new Date().toISOString(),
    lastModified: new Date().toISOString(),
  },

  canvas: {
    width: 1200,
    height: 800,
    grid: {
      enabled: true,
      size: 10,
      snap: true,
    },
  },

  elements: [],
  selectedId: null,
  draggingId: null,
  dragOffsetX: 0,
  dragOffsetY: 0,
  resizeId: null,
  resizeStartWidth: 0,
  resizeStartHeight: 0,
  resizeStartX: 0,
  resizeStartY: 0,

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
        elements: [...state.elements, newElement],
        project: {
          ...state.project,
          lastModified: new Date().toISOString(),
        },
      };
    }),

  selectElement: (id) => set({ selectedId: id }),

  moveElement: (id, x, y) =>
    set((state) => ({
      elements: state.elements.map((el) =>
        el.id === id
          ? {
              ...el,
              position: {
                ...el.position,
                x,
                y,
              },
            }
          : el
      ),
    })),

  startResize: (element) =>
    set(() => ({
      resizeId: element.id,
      resizeStartWidth: element.position.width,
      resizeStartHeight: element.position.height,
    })),

  stopResize: () =>
    set(() => ({
      resizeId: null,
    })),

  resizeElement: (id, width, height) =>
    set((state) => ({
      elements: state.elements.map((el) =>
        el.id === id
          ? {
              ...el,
              position: {
                ...el.position,
                width,
                height,
              },
            }
          : el
      ),
    })),

  toggleGrid: () =>
    set((state) => ({
      canvas: {
        ...state.canvas,
        grid: {
          ...state.canvas.grid,
          enabled: !state.canvas.grid.enabled,
        },
      },
    })),
}));
