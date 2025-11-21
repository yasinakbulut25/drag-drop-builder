"use client";

import { useBuilderStore } from "@/store/useBuilderStore";

export default function ElementRenderer({ element }) {
  const { selectedId, selectElement } = useBuilderStore();

  const renderByType = () => {
    switch (element.type) {
      case "header":
        return element.type;
      case "card":
        return element.type;
      case "text-content":
        return element.type;
      case "slider":
        return element.type;
      case "footer":
        return element.type;
      default:
        return null;
    }
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        selectElement(element.id);
      }}
      className={`
        absolute 
        ${selectedId === element.id ? "ring-2 ring-indigo-600" : ""}
      `}
      style={{
        top: element.position.y,
        left: element.position.x,
        zIndex: element.zIndex || 1,
      }}
    >
      {renderByType()}
    </div>
  );
}
