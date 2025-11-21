import { SquareDashedMousePointerIcon } from "lucide-react";

export default function Canvas() {
  return (
    <div
      id="canvas"
      className="w-full h-full flex-1 relative overflow-auto m-auto"
    >
      <div className="flex flex-col items-center justify-center h-full">
        <SquareDashedMousePointerIcon width={32} height={32} />
        <p className="text-center text-gray-400 pt-4 select-none">
          Canvas (Drag & Drop Elements)
        </p>
      </div>
    </div>
  );
}
