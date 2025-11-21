export default function HeaderElement({ data }) {
  const style = {
    width: data.position.width,
    height:
      typeof data.position.height === "number"
        ? `${data.position.height}px`
        : data.position.height,
  };

  return (
    <h1
      style={style}
      className="bg-zinc-100 
        border-b 
        border-zinc-200 
        text-black 
        px-4 
        text-xl 
        flex 
        items-center 
        font-bold
        header-element
      "
    >
      {data.content.text}
    </h1>
  );
}
