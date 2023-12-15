"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, LayoutGroup } from "framer-motion";
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

  const animateFrames = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      if (animationFramesRef.current.length)
        swapColumns(...animationFramesRef.current.pop());
    }, ANIMATION_SPEED * 1000);
  }, [animationFramesRef.current]);

  const beginSorting = () => {
    if (sortingInProgress) return;
    animationFramesRef.current = sortingAlgos["bubbleSort"]([...arrayValues]);
    setSortingInProgress(true);
  };

  const swapColumns = (...pos: number[]) => {
    console.log("swap columns", pos, arrayValues);
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

  const printer = () => {
    console.log({
      animationFramesRef: animationFramesRef.current,
      initialValues,
      arrayValues,
      columns,
      sortingInProgress,
    });
  };

  useEffect(() => {
    if (!sortingInProgress) return;

    animateFrames();
    return () => clearTimeout(timeoutRef.current);
  }, [animateFrames, arrayValues, columns, sortingInProgress]);

  return (
    <div className="flex flex-col h-1/2 w-full justify-evenly items-center gap-8">
      <div className="flex flex-row h-full w-full items-end justify-evenly px-4">
        <LayoutGroup>{columns}</LayoutGroup>
      </div>
      <motion.div className="flex w-1/2 h-full justify-evenly pt-12">
        <GlowingButton buttonText="Sort!" handleClick={beginSorting} />
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
        <GlowingButton buttonText="print state" handleClick={printer} />
      </motion.div>
    </div>
  );
};

const createColumns = (array: { id: number; value: number }[]) => {
  console.log("create columns", array);
  return array.map((col) => (
    <SingleArrayColumn key={col.id} value={col.value} speed={ANIMATION_SPEED} />
  ));
};
