import Image from "next/image";

export default function CardElement({ data, collisionId }) {
  const style = {
    minWidth: data.position.width || 300,
    minHeight:
      typeof data.position.height === "number"
        ? `${data.position.height}px`
        : data.position.height,
  };

  return (
    <div
      style={style}
      className={`
        bg-white
        border 
        border-slate-300
        rounded-lg
        p-4 
        flex 
        flex-col 
        gap-2 
        justify-between
        overflow-hidden
        ${collisionId ? "cursor-no-drop" : "cursor-grab active:cursor-grabbing"}
        card-element
      `}
    >
      <h3 className="text-lg font-semibold text-gray-800">
        {data.content.title}
      </h3>

      {data.content.image && (
        <Image
          className="w-full aspect-video object-cover rounded-md"
          src={data.content.image.url || "/image.png"}
          alt={data.content.title}
          width={300}
          height={200}
        />
      )}

      <p className="text-slate-500 text-sm">{data.content.description}</p>
    </div>
  );
}
