import { isColliding } from "./collision";

export const checkCollision = (movingBox, elements, movingId) => {
  let collidedId = null;

  elements.forEach((el) => {
    if (el.id === movingId) return;

    const box = {
      x: el.position.x,
      y: el.position.y,
      width: typeof el.position.width === "number" ? el.position.width : 200,
      height: typeof el.position.height === "number" ? el.position.height : 50,
    };

    if (isColliding(movingBox, box)) {
      collidedId = el.id;
    }
  });

  return collidedId;
};
