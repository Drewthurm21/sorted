export default function SidebarWrapper() {
  return (
    <div className="flex flex-col gap-12 h-screen w-44 items-center bg-slate-700">
      <div className="flex w-full h-40 justify-center items-center">logo</div>
      <div className="flex w-full mt-5 justify-center items-center">size</div>
      <div className="flex w-full justify-center items-center">speed</div>
      <div className="flex w-full justify-center items-center">colors</div>
    </div>
  );
}
