import Image from "next/image";

export default function SliderElement({ data, collisionId }) {
  const style = {
    width: data.position.width || "100%",
    height:
      typeof data.position.height === "number"
        ? `${data.position.height}px`
        : data.position.height,
  };

  return (
    <div
      style={style}
      className={`
        bg-zinc-100 
        border
        border-zinc-200
        rounded 
        flex 
        items-center 
        justify-center 
        text-zinc-500 
        text-xl 
        font-semibold
        overflow-hidden
        ${collisionId ? "cursor-no-drop" : "cursor-grab active:cursor-grabbing"}
        slider-element
      `}
    >
      {data.content.images?.length > 0 ? (
        <div className="flex w-full h-full">
          {data.content.images.map((img, idx) => (
            <Image
              key={idx}
              width={800}
              height={400}
              src={img.url}
              alt={`slider-image-${idx}`}
              className="w-full h-full object-cover"
            />
          ))}
        </div>
      ) : (
        <span>Slider Element</span>
      )}
    </div>
  );
}
