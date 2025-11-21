"use client";

import { useEffect } from "react";
import { SquareDashedMousePointerIcon } from "lucide-react";
import { useBuilderStore } from "@/store/useBuilderStore";
import { calculateDropPosition } from "@/lib/dragEngine/dropCalculator";
import { allowDrop } from "@/lib/dragEngine/dragHandlers";
import ElementRenderer from "./ElementRenderer";

export default function Canvas() {
  const {
    elements,
    addElement,
    draggingId,
    dragOffsetX,
    dragOffsetY,
    moveElement,
    canvas,
  } = useBuilderStore();

  const handleDrop = (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("element-type");
    const pos = calculateDropPosition(e);
    addElement(type, pos);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!draggingId) return;

      const canvasRoot = document.getElementById("canvas-root");
      const rect = canvasRoot.getBoundingClientRect();

      let x = e.clientX - rect.left - dragOffsetX;
      let y = e.clientY - rect.top - dragOffsetY;

      x = Math.max(0, x);
      y = Math.max(0, y);

      const grid = canvas.grid;
      if (grid.enabled && grid.snap) {
        x = Math.round(x / grid.size) * grid.size;
        y = Math.round(y / grid.size) * grid.size;
      }

      moveElement(draggingId, x, y);
    };

    const handleMouseUp = () => {
      useBuilderStore.setState({ draggingId: null });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [draggingId, dragOffsetX, dragOffsetY, moveElement, canvas]);

  const canvasStyle = {
    backgroundImage: canvas.grid.enabled
      ? `linear-gradient(#e5e7eb 1px, transparent 1px),
       linear-gradient(90deg, #e5e7eb 1px, transparent 1px)`
      : "none",
    backgroundSize: `${canvas.grid.size}px ${canvas.grid.size}px`,
  };

  return (
    <div
      id="canvas-root"
      onDrop={handleDrop}
      onDragOver={allowDrop}
      style={canvasStyle}
      className="relative w-full h-full overflow-auto bg-white"
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
