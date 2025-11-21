export const allowDrop = (e) => {
  e.preventDefault();
  e.dataTransfer.dropEffect = "copy";
};
