"use client";

import { useEffect } from "react";
import { SquareDashedMousePointerIcon } from "lucide-react";
import { useBuilderStore } from "@/store/useBuilderStore";
import { calculateDropPosition } from "@/lib/dragEngine/dropCalculator";
import { allowDrop } from "@/lib/dragEngine/dragHandlers";
import ElementRenderer from "./ElementRenderer";
import { isColliding } from "@/lib/dragEngine/collision";
import { checkCollision } from "@/lib/dragEngine/collisionCheck";

export default function Canvas() {
  const {
    canvas,
    elements,
    addElement,
    draggingId,
    dragOffsetX,
    dragOffsetY,
    moveElement,
    resizeId,
    resizeStartWidth,
    resizeStartHeight,
    resizeStartX,
    resizeStartY,
    resizeElement,
    setCollision,
    clearCollision,
  } = useBuilderStore();

  const handleDrop = (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("element-type");
    const pos = calculateDropPosition(e);
    addElement(type, pos);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (resizeId) {
        const deltaX = e.clientX - resizeStartX;
        const deltaY = e.clientY - resizeStartY;

        let newWidth = resizeStartWidth + deltaX;
        let newHeight = resizeStartHeight + deltaY;

        if (canvas.grid.enabled && canvas.grid.snap) {
          const size = canvas.grid.size;
          newWidth = Math.round(newWidth / size) * size;
          newHeight = Math.round(newHeight / size) * size;
        }

        newWidth = Math.max(50, newWidth);
        newHeight = Math.max(30, newHeight);

        resizeElement(resizeId, newWidth, newHeight);

        const resizingElement = elements.find((el) => el.id === resizeId);

        const resizingBox = {
          x: resizingElement.position.x,
          y: resizingElement.position.y,
          width: newWidth,
          height: newHeight,
        };

        const collidedId = checkCollision(resizingBox, elements, resizeId);

        if (collidedId) setCollision(collidedId);
        else clearCollision();

        return;
      }

      if (draggingId) {
        const canvasRoot = document.getElementById("canvas-root");
        const rect = canvasRoot.getBoundingClientRect();

        let x = e.clientX - rect.left - dragOffsetX;
        let y = e.clientY - rect.top - dragOffsetY;

        x = Math.max(0, x);
        y = Math.max(0, y);

        if (canvas.grid.enabled && canvas.grid.snap) {
          const size = canvas.grid.size;
          x = Math.round(x / size) * size;
          y = Math.round(y / size) * size;
        }

        moveElement(draggingId, x, y);

        const moving = elements.find((el) => el.id === draggingId);

        const movingBox = {
          x,
          y,
          width:
            typeof moving.position.width === "number"
              ? moving.position.width
              : 200,
          height:
            typeof moving.position.height === "number"
              ? moving.position.height
              : 50,
        };

        const collidedId = checkCollision(movingBox, elements, draggingId);

        if (collidedId) setCollision(collidedId);
        else clearCollision();
      }
    };

    const handleMouseUp = () => {
      useBuilderStore.setState({ draggingId: null });
      useBuilderStore.getState().stopResize();
      clearCollision();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    draggingId,
    dragOffsetX,
    dragOffsetY,
    moveElement,
    canvas,
    resizeId,
    resizeStartX,
    resizeStartY,
    resizeStartWidth,
    resizeStartHeight,
    resizeElement,
    elements,
    setCollision,
    clearCollision,
  ]);

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
