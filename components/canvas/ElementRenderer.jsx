"use client";

import { useBuilderStore } from "@/store/useBuilderStore";
import HeaderElement from "../elements/header/HeaderElement";
import CardElement from "../elements/card/CardElement";
import TextContentElement from "../elements/text/TextContentElement";
import SliderElement from "../elements/slider/SliderElement";
import FooterElement from "../elements/footer/FooterElement";
import { getElementWrapperClassAndStyle } from "@/lib/utils";
import { MoveDiagonal2Icon, Trash2Icon } from "lucide-react";

export default function ElementRenderer({ element }) {
  const {
    selectedId,
    selectElement,
    collisionId,
    clearCollision,
    removeElement,
  } = useBuilderStore();
  const isCollision = collisionId === element.id;

  const renderByType = () => {
    switch (element.type) {
      case "header":
        return <HeaderElement data={element} collisionId={collisionId} />;
      case "card":
        return <CardElement data={element} collisionId={collisionId} />;
      case "text-content":
        return <TextContentElement data={element} collisionId={collisionId} />;
      case "slider":
        return <SliderElement data={element} collisionId={collisionId} />;
      case "footer":
        return <FooterElement data={element} collisionId={collisionId} />;
      default:
        return null;
    }
  };

  const { wrapperClass, wrapperStyle } = getElementWrapperClassAndStyle(
    element,
    selectedId,
    isCollision
  );

  const isSticky = element.positionBehavior === "sticky-top";
  const isBottom = element.positionBehavior === "bottom";
  const isFixed = element.fixed;

  const handleMouseDown = (e) => {
    if (isSticky || isBottom || isFixed) return;

    e.stopPropagation();

    useBuilderStore.setState({
      draggingId: element.id,
      dragOffsetX: e.clientX - element.position.x,
      dragOffsetY: e.clientY - element.position.y,
    });
  };

  const handleResizeStart = (e, element) => {
    e.stopPropagation();
    useBuilderStore.getState().startResize(element);

    useBuilderStore.setState({
      resizeStartX: e.clientX,
      resizeStartY: e.clientY,
    });
  };

  const canResize =
    !isSticky && !isBottom && !isFixed && selectedId === element.id;

  const isDeletable = selectedId === element.id;

  return (
    <div
      className={wrapperClass}
      style={wrapperStyle}
      onMouseDown={handleMouseDown}
      onClick={(e) => {
        e.stopPropagation();
        selectElement(element.id);
      }}
    >
      {canResize && (
        <MoveDiagonal2Icon
          className="absolute -bottom-1 -right-1 w-4 h-4 bg-indigo-500 text-white p-0.5 rounded-sm cursor-se-resize"
          onMouseDown={(e) => handleResizeStart(e, element)}
        />
      )}

      {isDeletable && (
        <Trash2Icon
          className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white p-0.5 rounded-sm cursor-pointer"
          onMouseDown={(e) => {
            removeElement(selectedId);
            clearCollision();
          }}
        />
      )}
      {renderByType()}
    </div>
  );
}
