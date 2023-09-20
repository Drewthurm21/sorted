"use client";

import { useEffect, useState } from "react";
import { generateBubbleSortAnimations } from "./SortingAlgorithms";

function generateRandomNumber(max: number): number {
  return Math.floor(Math.random() * max) + 1;
}

function generateNewRandomArray(length: number): number[] {
  return Array.from({ length }, () => generateRandomNumber(500));
}

const handleFrame = (frameNumber: number, col1: any, col2: any) => {
  let c1h = col1.style.height;
  let c2h = col2.style.height;
  let el1 = col1.firstChild;
  let el2 = col2.firstChild;
  let text = el1.firstChild.innerText;

  if (frameNumber % 3 === 1) {
    el1.style.backgroundColor = "red";
    el2.style.backgroundColor = "purple";
  } else if (frameNumber % 3 === 2) {
    el1.style.backgroundColor = "green";
    el2.style.backgroundColor = "green";
    el1.firstChild.innerText = el2.firstChild.innerText;
    el2.firstChild.innerText = text;
    col1.style.height = c2h;
    col2.style.height = c1h;
  } else {
    el1.style.backgroundColor = "blue";
    el2.style.backgroundColor = "blue";
  }
};

export default function SortingVisualizer() {
  const [sortingInProgress, setSortingInProgress] = useState<boolean>(false);
  const [sortingArray, setSortingArray] = useState<number[]>(
    generateNewRandomArray(20)
  );

  useEffect(() => {
    if (!sortingInProgress) return;
    const animationFrames = generateBubbleSortAnimations(sortingArray);
    for (let i = 0; i < animationFrames.length; i++) {
      setTimeout(() => {
        const arrayElements = document.querySelectorAll(".array-element-node");
        const [pos1, pos2] = animationFrames[i];
        const col1 = arrayElements[pos1];
        const col2 = arrayElements[pos2];
        for (let idx = 1; idx <= 3; idx++) {
          setTimeout(() => {
            handleFrame(idx, col1, col2);
          }, idx * 15);
        }
      }, i * 45);
    }
  }, [sortingInProgress]);

  return (
    <>
      <div className="flex gap-4 h-1/2 w-full justify-center items-end">
        {sortingArray.map((value: number, idx: number, arr: number[]) => {
          return (
            <div
              className="array-element-node"
              style={{
                height: value,
              }}
            >
              <ArrayElementNode
                key={idx}
                label={arr.length < 30 ? `${value}` : ""}
                color={"bg-blue-500"}
              />
            </div>
          );
        })}
      </div>
      <button
        className="mt-10"
        onClick={() => {
          const newArray = generateNewRandomArray(20);
          setSortingArray(newArray);
          setSortingInProgress((prev) => false);
        }}
      >
        Reset Array
      </button>
      <button
        onClick={() => {
          setSortingInProgress((prev) => true);
        }}
      >
        Sort
      </button>
    </>
  );
}

function ArrayElementNode({ color, label }: { color: string; label: string }) {
  return (
    <div
      className={`flex h-full w-3 justify-center items-end text-xs ${color}`}
    >
      <div className="translate-y-6 -rotate-45">{label}</div>
    </div>
  );
}
