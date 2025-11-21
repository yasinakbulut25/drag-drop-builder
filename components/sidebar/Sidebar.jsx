"use client";

import {
  BaselineIcon,
  GalleryThumbnailsIcon,
  LayoutListIcon,
  MousePointerClickIcon,
  TypeIcon,
  PanelBottomIcon,
} from "lucide-react";
import ElementItem from "./ElementItem";

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
      </div>
    </aside>
  );
}
