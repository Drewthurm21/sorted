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

export default function SortingVisualizer() {
  const initialArray = generateNewRandomArray(40);
  const [sortingArray, setSortingArray] = useState<number[]>(initialArray);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [sortingInProgress, setSortingInProgress] = useState<boolean>(false);

  useEffect(() => {
    if (!sortingInProgress) return;
    if (currentIndex < sortingArray.length) {
      const timer = setTimeout(() => {
        const newArray: number[] = bubbleSort(
          sortingArray.slice(0, currentIndex + 1)
        );
        setSortingArray(newArray.concat(sortingArray.slice(currentIndex + 1)));
        setCurrentIndex(currentIndex + 1);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, sortingArray, sortingInProgress]);

  return (
    <>
      <div className="flex gap-4 h-1/2 w-full justify-center items-end">
        {sortingArray.map((el: number, idx: number, arr: number[]) => {
          let color;

          return (
            <div
              style={{ height: el, display: "flex", flexDirection: "column" }}
            >
              <ArrayElementNode
                key={idx}
                label={arr.length < 30 ? `${el}` : ""}
                color={idx === currentIndex ? "bg-emerald-500" : "bg-blue-500"}
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
          setCurrentIndex(0);
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
      className={`flex h-full w-6 justify-center items-end text-xs ${color}`}
    >
      <div className="translate-y-6 -rotate-45">{label}</div>
    </div>
  );
}
