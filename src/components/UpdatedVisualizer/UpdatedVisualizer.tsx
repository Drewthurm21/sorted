"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useVisualizerContext } from "@/app/contexts/visualizerContext";
import { motion, LayoutGroup } from "framer-motion";
import { SingleArrayColumn } from "./SingleArrayColumn";
import { GlowingButton } from "../GlowingButton";
import { generateNewListData, sortingAlgos } from "@/utilities";

const MIN_TIMEOUT_DELAY = 50; // Minimum timeout delay in milliseconds
const MAX_TIMEOUT_DELAY = 1500; // Maximum timeout delay in milliseconds
const MIN_ANIMATION_DURATION = 0.1; // Minimum animation duration in seconds
const MAX_ANIMATION_DURATION = 0.75; // Maximum animation duration in seconds

const scaleSpeedValue = (
  value: number,
  sliderMin: number,
  sliderMax: number,
  targetMin: number,
  targetMax: number
): number => {
  // Convert & scale the animation speed slider value to values within our target ranges
  return (
    ((sliderMax - value) * (targetMax - targetMin)) / (sliderMax - sliderMin) +
    targetMin
  );
};

const createColumns = (
  array: { id: number; value: number }[],
  animationSpeed: number
) => {
  return array.map((col) => (
    <SingleArrayColumn key={col.id} value={col.value} speed={animationSpeed} />
  ));
};

export const UpdatedVisualizer = () => {
  const { animationSpeed, listSize } = useVisualizerContext();
  const scaledTimeoutDelay = scaleSpeedValue(
    animationSpeed,
    10,
    100,
    MIN_TIMEOUT_DELAY,
    MAX_TIMEOUT_DELAY
  );
  const scaledAnimationSpeed = scaleSpeedValue(
    animationSpeed,
    10,
    100,
    MIN_ANIMATION_DURATION,
    MAX_ANIMATION_DURATION
  );

  const [initialValues, setInitialValues] = useState(
    generateNewListData(listSize)
  );
  const [arrayValues, setArrayValues] = useState([...initialValues]);
  const [columns, setColumns] = useState(
    createColumns(arrayValues, scaledAnimationSpeed)
  );
  const [sortingInProgress, setSortingInProgress] = useState(false);
  const timeoutRef = useRef<any>(null);
  const animationFramesRef = useRef<any>([]);

  const beginSorting = () => {
    if (sortingInProgress) return;
    animationFramesRef.current = sortingAlgos["bubblesort"]([...arrayValues]);
    setSortingInProgress(true);
  };

  const animateFrames = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      if (animationFramesRef.current.length)
        swapColumns(...animationFramesRef.current.pop());
    }, scaledTimeoutDelay);
  }, [animationFramesRef.current]);

  const swapColumns = (...pos: number[]) => {
    let [a, b] = pos;
    [arrayValues[a], arrayValues[b]] = [arrayValues[b], arrayValues[a]];
    setColumns(createColumns(arrayValues, scaledAnimationSpeed));
  };

  const generateNewColumns = () => {
    let newListValues = generateNewListData(listSize);
    animationFramesRef.current = [];
    setSortingInProgress(false);
    setInitialValues(newListValues);
    setArrayValues([...newListValues]);
    setColumns(createColumns(newListValues, scaledAnimationSpeed));
  };

  const handleReset = () => {
    clearTimeout(timeoutRef.current);
    animationFramesRef.current = [];
    setSortingInProgress(false);
    setArrayValues([...initialValues]);
    setColumns(createColumns(initialValues, scaledAnimationSpeed));
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
      </motion.div>
    </div>
  );
};
