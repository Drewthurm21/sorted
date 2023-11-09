import SortingVisualizer from "@/components/SortingVisualizer/SortingVisualizer";
import { UpdatedVisualizer } from "@/components/UpdatedVisualizer/UpdatedVisualizer";

export default function Home() {
  return (
    <main className="flex w-full min-h-screen flex-col items-center justify-center">
      {/* <SortingVisualizer /> */}
      <UpdatedVisualizer />
    </main>
  );
}
