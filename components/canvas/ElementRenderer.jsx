"use client";

import { useBuilderStore } from "@/store/useBuilderStore";
import HeaderElement from "../elements/header/HeaderElement";
import CardElement from "../elements/card/CardElement";
import TextContentElement from "../elements/text/TextContentElement";
import SliderElement from "../elements/slider/SliderElement";
import FooterElement from "../elements/footer/FooterElement";
import { getElementWrapperClassAndStyle } from "@/lib/utils";

export default function ElementRenderer({ element }) {
  const { selectedId, selectElement } = useBuilderStore();

  const renderByType = () => {
    switch (element.type) {
      case "header":
        return <HeaderElement data={element} />;
      case "card":
        return <CardElement data={element} />;
      case "text-content":
        return <TextContentElement data={element} />;
      case "slider":
        return <SliderElement data={element} />;
      case "footer":
        return <FooterElement data={element} />;
      default:
        return null;
    }
  };

  const { wrapperClass, wrapperStyle } = getElementWrapperClassAndStyle(
    element,
    selectedId
  );

  const handleMouseDown = (e) => {
    if (
      element.positionBehavior === "sticky-top" ||
      element.positionBehavior === "bottom" ||
      element.fixed
    )
      return;

    e.stopPropagation();

    useBuilderStore.setState({
      draggingId: element.id,
      dragOffsetX: e.clientX - element.position.x,
      dragOffsetY: e.clientY - element.position.y,
    });
  };

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
      {renderByType()}
    </div>
  );
}
