"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimationProps,
  DynamicAnimationOptions,
  motion,
  useAnimate,
} from "framer-motion";

type ShuffleWordProps = {
  word: string;
  size: number;
};

type BlockObj = {
  id: number;
  letter: string;
};

export default function ShuffleWord({ word, size }: ShuffleWordProps) {
  const TITLE = Array.from(word);
  const NUM_BLOCKS = TITLE.length;
  const BLOCK_SIZE = size;
  const DURATION_IN_MS = 100;
  const DURATION_IN_SEC = DURATION_IN_MS * 0.001;
  const TRANSITION: DynamicAnimationOptions = {
    ease: "easeInOut",
    duration: DURATION_IN_SEC,
  };

  const [scope, animate] = useAnimate();
  const [blocks, setBlocks] = useState(
    Array.from(word)
      .map((c, i) => ({ id: i, letter: c }))
      .sort(() => Math.random() - 0.5)
  );

  const timeoutRef = useRef<any>();
  useEffect(() => {
    if (wordSorted()) return;
    timeoutRef.current = setTimeout(swapTwoLetters, 400);
    return () => clearTimeout(timeoutRef.current);
  }, [blocks]);

  const swapTwoLetters = async () => {
    const [first, second] = pickTwoBlocks();
    animate(`[data-block-id="${first.id}"]`, { y: -BLOCK_SIZE }, TRANSITION);
    await animate(
      `[data-block-id="${second.id}"]`,
      { y: BLOCK_SIZE },
      TRANSITION
    );
    await delay(DURATION_IN_MS);

    setBlocks((pv) => {
      const copy = [...pv];
      if (wordSorted()) return copy;
      const indexOfFirst = copy.indexOf(first);
      const indexOfSecond = copy.indexOf(second);

      copy[indexOfFirst] = second;
      copy[indexOfSecond] = first;

      return copy;
    });
    await delay(DURATION_IN_MS * 2);

    animate(`[data-block-id="${first.id}"]`, { y: 0 }, TRANSITION);
    await animate(`[data-block-id="${second.id}"]`, { y: 0 }, TRANSITION);
    await delay(DURATION_IN_MS);
  };

  const wordSorted = () => {
    for (let i = 0; i < NUM_BLOCKS - 1; i++) {
      if (blocks[i].letter !== TITLE[i]) return false;
    }
    return true;
  };

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
  const blockInPlace = (n: number) => blocks[n].letter === TITLE[n];
  const randomBlockIndex = () => Math.floor(Math.random() * blocks.length);

  const pickTwoBlocks = () => {
    let first = randomBlockIndex();
    let second = randomBlockIndex();

    while (blockInPlace(first))
      first = Math.floor(Math.random() * blocks.length);
    while (second === first || blockInPlace(second))
      second = Math.floor(Math.random() * blocks.length);

    return [blocks[first], blocks[second]];
  };

  return (
    <div ref={scope} className="flex flex-row">
      {blocks.map((block: BlockObj) => (
        <motion.div
          layout
          key={block.id}
          data-block-id={block.id}
          transition={TRANSITION as AnimationProps["transition"]}
          className="font-bold text-white text-center align-middle"
          style={{ fontSize: size, height: BLOCK_SIZE, width: BLOCK_SIZE }}
        >
          {block.letter}
        </motion.div>
      ))}
    </div>
  );
}
