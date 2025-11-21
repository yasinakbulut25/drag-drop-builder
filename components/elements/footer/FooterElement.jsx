export default function FooterElement({ data }) {
  const style = {
    width: data.position.width || "100%",
    height:
      typeof data.position.height === "number"
        ? `${data.position.height}px`
        : data.position.height,
    zIndex: data.position.zIndex || 1,
  };

  return (
    <footer
      style={style}
      className="
        bg-gray-900 
        text-gray-300 
        flex 
        items-center 
        justify-center 
        text-sm
        footer-element
      "
    >
      {data.content?.copyright || "© 2024 Test Builder"}
    </footer>
  );
}
