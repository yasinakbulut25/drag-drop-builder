import Canvas from "@/components/canvas/Canvas";
import Sidebar from "@/components/sidebar/Sidebar";

export default function Home() {
  return (
    <div className="w-full h-dvh flex bg-white">
      <main className="flex-1 w-full h-full">
        <Canvas />
      </main>
      <Sidebar />
    </div>
  );
}
