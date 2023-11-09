"use client";

import { motion, LayoutGroup } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  generateNewListData,
  generateBubbleSortSteps,
  sortingAlgos,
} from "@/utilities";

const ANIMATION_SPEED = 0.5;

export const UpdatedVisualizer = () => {
  const [arrayValues, setArrayValues] = useState(generateNewListData(30));
  const [columns, setColumns] = useState(createColumns(arrayValues));
  const [sortingInProgress, setSortingInProgress] = useState(false);

  const timeoutRef = useRef<any>(null);
  const animationFrames = useRef<number[][]>([]);

  useEffect(() => {
    if (!sortingInProgress) return;
    if (!animationFrames.current.length)
      animationFrames.current = generateBubbleSortSteps(arrayValues);
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
    let newListValues = generateNewListData(10);
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
        <button onClick={() => setSortingInProgress(true)}>Sort</button>
        <button onClick={generateNewColumns}>New List</button>
      </motion.div>
    </div>
  );
};

type SingleColumnProps = {
  key: number;
  value: number;
};

const SingleColumn = ({ key, value }: SingleColumnProps) => {
  return (
    <motion.div
      key={key}
      layout
      className={`text-center min-w-[30px]`}
      transition={{ duration: ANIMATION_SPEED, type: "spring" }}
    >
      <motion.div layout style={{ y: -20 }}>
        {value}
      </motion.div>
      <motion.div
        layout
        style={{
          backgroundColor: "blue",
          height: `${value}px`,
        }}
      />
    </motion.div>
  );
};

const createColumns = (array: { id: number; value: number }[]) => {
  return array.map((col) => <SingleColumn key={col.id} value={col.value} />);
};
