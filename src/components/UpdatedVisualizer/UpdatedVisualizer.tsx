"use client";

import { motion, LayoutGroup } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SingleArrayColumn } from "./SingleArrayColumn";
import { GlowingButton } from "../GlowingButton";
import { generateNewListData, sortingAlgos } from "@/utilities";

const ANIMATION_SPEED = 0.5;
const LIST_LENGTH = 10;

export const UpdatedVisualizer = () => {
  const [initialValues, setInitialValues] = useState(
    generateNewListData(LIST_LENGTH)
  );
  const [arrayValues, setArrayValues] = useState([...initialValues]);
  const [columns, setColumns] = useState(createColumns(arrayValues));
  const [sortingInProgress, setSortingInProgress] = useState(false);

  const timeoutRef = useRef<any>(null);
  const animationFramesRef = useRef<any>([]);

  useEffect(() => {
    if (!sortingInProgress) return;
    if (!animationFramesRef.current.length)
      animationFramesRef.current = sortingAlgos["bubbleSort"](arrayValues);
    animateFrames();
    return () => clearTimeout(timeoutRef.current);
  }, [arrayValues, columns, sortingInProgress]);

  const animateFrames = () => {
    timeoutRef.current = setTimeout(() => {
      if (animationFramesRef.current.length)
        swapColumns(...animationFramesRef.current.pop());
    }, ANIMATION_SPEED * 1000);
  };

  const swapColumns = (...pos: number[]) => {
    let [a, b] = pos;
    [arrayValues[a], arrayValues[b]] = [arrayValues[b], arrayValues[a]];
    setColumns(createColumns(arrayValues));
  };

  const generateNewColumns = () => {
    let newListValues = generateNewListData(LIST_LENGTH);
    animationFramesRef.current = [];
    setSortingInProgress(false);
    setInitialValues(newListValues);
    setArrayValues([...newListValues]);
    setColumns(createColumns(newListValues));
  };

  const handleReset = () => {
    clearTimeout(timeoutRef.current);
    animationFramesRef.current = [];
    setSortingInProgress(false);
    setArrayValues([...initialValues]);
    setColumns(createColumns(initialValues));
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
          buttonText="Pause"
          handleClick={() => setSortingInProgress(false)}
        />
        <GlowingButton
          buttonText="Reset List"
          handleClick={() => handleReset()}
        />
        <GlowingButton
          buttonText="New List"
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
