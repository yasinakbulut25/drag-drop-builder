"use client";

import { SquareDashedMousePointerIcon } from "lucide-react";
import { useBuilderStore } from "@/store/useBuilderStore";
import { calculateDropPosition } from "@/lib/dragEngine/dropCalculator";
import { allowDrop } from "@/lib/dragEngine/dragHandlers";
import ElementRenderer from "./ElementRenderer";

export default function Canvas() {
  const { addElement, elements } = useBuilderStore();

  const handleDrop = (e) => {
    e.preventDefault();

    const type = e.dataTransfer.getData("element-type");
    const pos = calculateDropPosition(e);

    addElement(type, pos);
  };

  return (
    <div
      id="canvas"
      onDrop={handleDrop}
      onDragOver={allowDrop}
      className="w-full h-full relative overflow-auto m-auto"
    >
      {elements.length === 0 ? (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <SquareDashedMousePointerIcon width={32} height={32} />
          <p className="text-center text-gray-400 pt-4 select-none">
            Canvas (Drag & Drop Elements)
          </p>
        </div>
      ) : (
        elements.map((element) => (
          <ElementRenderer key={element.id} element={element} />
        ))
      )}
    </div>
  );
}
