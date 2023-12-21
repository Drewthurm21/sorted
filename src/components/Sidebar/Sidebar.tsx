"use client";

import { useState } from "react";
import { VscGraph } from "react-icons/vsc";
import { CgSize } from "react-icons/cg";
import { RiSpeedLine } from "react-icons/ri";

export default function SidebarWrapper() {
  const [listSize, setListSize] = useState<number>(15);
  const [animationSpeed, setAnimationSpeed] = useState<number>(50);

  return (
    <div className="flex flex-col gap-12 h-screen w-44 items-center bg-slate-700">
      <div className="flex flex-col w-full h-40 justify-center items-center">
        <VscGraph className="w-full h-[48px]" />
        <div className="flex w-full justify-center">List Options</div>
      </div>
      <div className="flex flex-col justify-evenly items-center">
        <CgSize className="w-full h-[36px]" />
        <div className="flex w-full justify-center">Size</div>
        <span>{listSize}</span>
        <input
          type="range"
          min="5"
          max="30"
          step="1"
          value={listSize}
          onChange={(e) => setListSize(+e.target.value)}
        />
      </div>
      <div className="flex flex-col justify-evenly items-center">
        <RiSpeedLine className="w-full h-[30px]" />
        <div className="flex w-full justify-center">Speed</div>
        <span>{animationSpeed}</span>
        <input
          type="range"
          min="10"
          max="100"
          step="10"
          value={animationSpeed}
          onChange={(e) => setAnimationSpeed(+e.target.value)}
        />
      </div>
      <div className="flex w-full justify-center items-center">Update List</div>
    </div>
  );
}
