import Canvas from "@/components/canvas/Canvas";
import Sidebar from "@/components/sidebar/Sidebar";

export default function Home() {
  return (
    <div className="w-full h-dvh flex bg-white overflow-hidden">
      <Canvas />
      <Sidebar />
    </div>
  );
}
