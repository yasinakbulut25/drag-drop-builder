export const generateId = () =>
  "elem_" + Math.random().toString(36).substring(2, 10);

export const getElementWrapperClassAndStyle = (
  element,
  selectedId,
  isCollision
) => {
  const isSticky = element.positionBehavior === "sticky-top";
  const isBottom = element.positionBehavior === "bottom";

  let wrapperClass = `
    ${
      selectedId === element.id
        ? "outline-2 outline-offset-2 outline-indigo-600 rounded"
        : ""
    }
    ${
      isCollision ? "outline-2 outline-offset-2 outline-red-600 rounded" : ""
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

  return { wrapperClass, wrapperStyle };
};
