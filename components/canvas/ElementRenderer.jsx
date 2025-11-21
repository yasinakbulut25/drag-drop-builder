"use client";

import { useBuilderStore } from "@/store/useBuilderStore";
import HeaderElement from "../elements/header/HeaderElement";
import CardElement from "../elements/card/CardElement";
import TextContentElement from "../elements/text/TextContentElement";
import SliderElement from "../elements/slider/SliderElement";
import FooterElement from "../elements/footer/FooterElement";

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

  const isSticky = element.positionBehavior === "sticky-top";
  const isBottom = element.positionBehavior === "bottom";

  let wrapperClass = `
    ${
      selectedId === element.id
        ? "outline-2 outline-offset-2 outline-indigo-600 rounded"
        : ""
    }
    ${isSticky ? "sticky top-0 z-50" : ""}
    ${isBottom ? "absolute bottom-0 z-50" : ""}
    ${!isSticky && !isBottom ? "absolute" : ""}
  `;

  if (element.fixed) {
    wrapperClass = `${wrapperClass} fixed fixed-width`;
  }

  const wrapperStyle =
    !isSticky && !isBottom
      ? {
          top: element.position.y,
          left: element.position.x,
          width: element.width,
          height: element.height === "auto" ? "auto" : element.height,
          zIndex: element.zIndex,
        }
      : {
          width: element.width,
          height: element.height,
        };

  return (
    <div
      className={wrapperClass}
      style={wrapperStyle}
      onClick={(e) => {
        e.stopPropagation();
        selectElement(element.id);
      }}
    >
      {renderByType()}
    </div>
  );
}
