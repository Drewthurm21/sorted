"use client";

import { motion, LayoutGroup } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SingleArrayColumn } from "./SingleArrayColumn";
import { GlowingButton } from "../GlowingButton";
import {
  generateNewListData,
  generateBubbleSortSteps,
  sortingAlgos,
} from "@/utilities";

const ANIMATION_SPEED = 0.5;
const LIST_LENGTH = 10;

export const UpdatedVisualizer = () => {
  const [arrayValues, setArrayValues] = useState(
    generateNewListData(LIST_LENGTH)
  );
  const [columns, setColumns] = useState(createColumns(arrayValues));
  const [sortingInProgress, setSortingInProgress] = useState(false);

  const timeoutRef = useRef<any>(null);
  const animationFrames = useRef<any>([]);

  useEffect(() => {
    if (!sortingInProgress) return;
    if (!animationFrames.current.length)
      animationFrames.current = sortingAlgos["bubbleSort"](arrayValues);
    animateFrames();
    return () => clearTimeout(timeoutRef.current);
  }, [arrayValues, columns, sortingInProgress]);

  const animateFrames = () => {
    timeoutRef.current = setTimeout(() => {
      if (animationFrames.current.length)
        swapColumns(...animationFrames.current.pop());
    }, ANIMATION_SPEED * 1000);
  };

  const swapColumns = (...pos: number[]) => {
    [arrayValues[pos[0]], arrayValues[pos[1]]] = [
      arrayValues[pos[1]],
      arrayValues[pos[0]],
    ];
    setColumns(createColumns(arrayValues));
  };

  const generateNewColumns = () => {
    let newListValues = generateNewListData(LIST_LENGTH);
    animationFrames.current = generateBubbleSortSteps(newListValues);
    setSortingInProgress(false);
    setArrayValues(newListValues);
    setColumns(createColumns(newListValues));
  };

  return (
    <div className="flex flex-col h-1/2 w-full justify-evenly items-center gap-8">
      <div className="flex flex-row h-full w-full items-end justify-evenly px-4">
        <LayoutGroup>{columns}</LayoutGroup>
      </div>

      <motion.div className="flex w-1/2 h-full justify-evenly pt-12">
        <GlowingButton
          buttonText="Sort!"
          handleClick={() => setSortingInProgress(true)}
        />
        <GlowingButton
          buttonText="Reset"
          handleClick={() => generateNewColumns()}
        />
      </motion.div>
    </div>
  );
};

const createColumns = (array: { id: number; value: number }[]) => {
  return array.map((col) => (
    <SingleArrayColumn key={col.id} value={col.value} speed={ANIMATION_SPEED} />
  ));
};
