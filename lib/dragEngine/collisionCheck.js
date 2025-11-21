import { isColliding } from "./collision";

export const checkCollision = (movingBox, elements, movingId) => {
  let collidedId = null;

  const canvasWidth =
    document.getElementById("canvas-root")?.scrollWidth || 1200;

  elements.forEach((el) => {
    if (el.id === movingId) return;

    if (el.type === "header") {
      const headerHeight = el.position.height || 80;
      if (movingBox.y < headerHeight) {
        collidedId = el.id;
      }
      return;
    }

    if (el.type === "footer") {
      const footerTop = el.position.y;
      if (movingBox.y + movingBox.height > footerTop) {
        collidedId = el.id;
      }
      return;
    }

    const width =
      el.position.width === "100%"
        ? canvasWidth
        : typeof el.position.width === "number"
        ? el.position.width
        : 200;

    const height =
      typeof el.position.height === "number" ? el.position.height : 50;

    const box = {
      x: el.position.x,
      y: el.position.y,
      width,
      height,
    };

    if (isColliding(movingBox, box)) {
      collidedId = el.id;
    }
  });

  return collidedId;
};
