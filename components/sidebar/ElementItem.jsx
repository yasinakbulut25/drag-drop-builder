"use client";

export default function ElementItem({ type, label, icon: Icon }) {
  const onDragStart = (e) => {
    e.dataTransfer.setData("element-type", type);
    e.dataTransfer.effectAllowed = "copy";
    e.target.classList.add("opacity-50", "cursor-grabbing");
  };

  const onDragEnd = (e) => {
    e.target.classList.remove("opacity-50", "cursor-grabbing");
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className="flex items-center gap-2 p-3 font-medium bg-white border border-zinc-200 rounded-md cursor-grab hover:border-indigo-500 hover:border-dashed"
    >
      <Icon className="text-indigo-500 min-w-5 w-5" />
      {label}
    </div>
  );
}
