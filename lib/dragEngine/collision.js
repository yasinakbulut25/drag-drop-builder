export function isColliding(moving, other) {
  return !(
    moving.x + moving.width < other.x ||
    moving.x > other.x + other.width ||
    moving.y + moving.height < other.y ||
    moving.y > other.y + other.height
  );
}
