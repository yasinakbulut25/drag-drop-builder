"use client";

import {
  BaselineIcon,
  GalleryThumbnailsIcon,
  LayoutListIcon,
  MousePointerClickIcon,
  TypeIcon,
  PanelBottomIcon,
  EyeIcon,
  EyeOffIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "lucide-react";
import ElementItem from "./ElementItem";
import { useBuilderStore } from "@/store/useBuilderStore";

const Elements = [
  {
    type: "header",
    label: "Header",
    icon: BaselineIcon,
  },
  {
    type: "card",
    label: "Card",
    icon: LayoutListIcon,
  },
  {
    type: "text-content",
    label: "Text Content",
    icon: TypeIcon,
  },
  {
    type: "slider",
    label: "Slider",
    icon: GalleryThumbnailsIcon,
  },
  {
    type: "footer",
    label: "Footer",
    icon: PanelBottomIcon,
  },
];

export default function Sidebar() {
  const {
    canvas,
    elements,
    toggleGrid,
    selectedId,
    increaseZIndex,
    decreaseZIndex,
  } = useBuilderStore();

  const selectedElement = elements.find((el) => el.id === selectedId);

  return (
    <aside className="w-72 bg-zinc-50 border-l border-zinc-200 px-4 py-6 z-50">
      <div className="flex items-center gap-2 mb-6">
        <MousePointerClickIcon width={20} height={20} className="text-black" />
        <h2 className="text-base font-bold">Elements</h2>
      </div>

      <div className="space-y-3">
        {Elements.map((item) => (
          <ElementItem
            key={item.type}
            type={item.type}
            label={item.label}
            icon={item.icon}
          />
        ))}
        {selectedElement && (
          <div className="p-3 border border-zinc-200 rounded-lg bg-white">
            <h3 className="text-xs font-semibold mb-2 text-black">
              Layer Controls
            </h3>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => increaseZIndex(selectedId)}
                className="flex items-center gap-1 px-2 py-2 bg-indigo-600 text-white text-xs rounded hover:bg-indigo-500 transition cursor-pointer"
              >
                <ChevronUpIcon className="w-4 h-4" />
                Bring to front
              </button>

              <button
                onClick={() => decreaseZIndex(selectedId)}
                className="flex items-center gap-1 px-2 py-2 bg-zinc-300 text-black text-xs rounded hover:bg-zinc-200 transition cursor-pointer"
              >
                <ChevronDownIcon className="w-4 h-4" />
                Bring to back
              </button>
            </div>

            <p className="text-[10px] text-gray-500 mt-2">
              z-index: {selectedElement.position.zIndex}
            </p>
          </div>
        )}

        <button
          onClick={toggleGrid}
          className="cursor-pointer w-full flex items-center gap-2 p-3  text-white text-sm bg-indigo-500 rounded-lg"
        >
          {canvas.grid.enabled ? (
            <>
              <EyeOffIcon className="text-white min-w-5 w-5" />
              Grid Snap Gizle
            </>
          ) : (
            <>
              <EyeIcon className="text-white min-w-5 w-5" />
              Grid Snap Göster
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
