"use client";

import { useEffect, useState } from "react";

function generateRandomNumber(max: number): number {
  return Math.floor(Math.random() * max) + 1;
}

function generateNewRandomArray(length: number): number[] {
  return Array.from({ length }, () => generateRandomNumber(700));
}

function bubbleSort(arr: number[]): number[] {
  const arrayCopy = [...arr];
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < arrayCopy.length - 1; i++) {
      if (arrayCopy[i] > arrayCopy[i + 1]) {
        const temp = arrayCopy[i];
        arrayCopy[i] = arrayCopy[i + 1];
        arrayCopy[i + 1] = temp;
        swapped = true;
      }
    }
  } while (swapped);
  return arrayCopy;
}

export default function ArrayGeneratorWrapper() {
  const initialArray = generateNewRandomArray(20);
  const [sortingArray, setSortingArray] = useState<number[]>(initialArray);

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
