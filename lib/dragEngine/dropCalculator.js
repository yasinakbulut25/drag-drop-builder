export const calculateDropPosition = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();

  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  };
};
