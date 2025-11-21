export default function TextContentElement({ data }) {
  const style = {
    width:
      typeof data.position.width === "number"
        ? `${data.position.width}px`
        : data.position.width,
    height:
      data.position.height === "auto" ? "auto" : `${data.position.height}px`,
  };

  return (
    <div style={style} className="text-content-element min-h-max min-w-min">
      <p className="text-black">{data.content.plainText}</p>
    </div>
  );
}
