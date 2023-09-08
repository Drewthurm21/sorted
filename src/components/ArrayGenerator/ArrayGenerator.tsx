"use client";

import { useEffect, useState } from "react";

function generateRandomNumber(max: number) {
  return Math.floor(Math.random() * max) + 1;
}

function generateNewRandomArray(length: number) {
  let newArr = new Array(length).fill(0);
  return newArr.map((el) => generateRandomNumber(500));
}

export default function ArrayGeneratorWrapper() {
  const newRandomArray = generateNewRandomArray(20);
  const [sortingArray, setSortingArray] = useState<number[]>(newRandomArray);

  return (
    <div className="flex gap-4 h-1/2 w-full justify-center items-end">
      {sortingArray.map((el: number, idx: number, arr: number[]) => (
        <div style={{ height: el, display: "flex", flexDirection: "column" }}>
          <ArrayElementNode key={idx} label={arr.length < 30 ? `${el}` : ""} />
        </div>
      ))}
    </div>
  );
}

function ArrayElementNode({ label }: { label: string }) {
  return (
    <div
      className={`flex h-full w-6 justify-center items-end text-xs bg-blue-500`}
    >
      <div className="translate-y-6 -rotate-45">{label}</div>
    </div>
  );
}
