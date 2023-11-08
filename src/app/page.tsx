import SortingVisualizer from "@/components/SortingVisualizer/SortingVisualizer";
import { ArrayColumns } from "@/components/UpdatedVisualizer/ArrayColumns";

export default function Home() {
  return (
    <main className="flex w-full min-h-screen flex-col items-center justify-center">
      {/* <SortingVisualizer /> */}
      <ArrayColumns />
    </main>
  );
}
