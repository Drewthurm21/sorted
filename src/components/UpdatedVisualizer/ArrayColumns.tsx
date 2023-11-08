"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { generateNewListData } from "@/utilities";

export const ArrayColumns = () => {
  const [columns, setColumns] = useState(createColumns(generateNewListData(5)));
  // const [animationFrames, setAnimationFrames] = useState<number[][]>([]);

  useEffect(() => {
    // handleFrame();
  }, [columns]);

  const swapColumns = (p1: number, p2: number) => {
    [columns[p1], columns[p2]] = [columns[p2], columns[p1]];
    return [...columns];
  };

  const handleFrame = () => {
    if (typeof window === undefined) return;
  };

  return (
    <div className="flex h-1/2 w-full items-end justify-evenly gap-6 px-4">
      {columns.map((col) => col)}
      <button onClick={() => setColumns(swapColumns(0, 1))}>swap</button>
      <button onClick={() => handleFrame()}>check</button>
      <button onClick={() => setColumns(createColumns(generateNewListData(5)))}>
        reset
      </button>
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
      className={`w-[30px] text-center`}
      transition={{ duration: 1.5, type: "spring", layout: { duration: 0.5 } }}
    >
      <motion.div style={{ y: -20 }}>{value}</motion.div>
      <motion.div
        className=""
        style={{
          color: "black",
          backgroundColor: "blue",
          height: `${value}px`,
        }}
      ></motion.div>
    </motion.div>
  );
};

const createColumns = (array: {}[]) => {
  return array.map((col) => <SingleColumn key={col.id} value={col.value} />);
};
