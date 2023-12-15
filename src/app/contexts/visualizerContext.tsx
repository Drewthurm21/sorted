"use client";

import React, { createContext, useContext, useState } from "react";

type VisualizerContextProviderProps = {
  children: React.ReactNode;
};

type VisualizerContextType = {
  listSize: number;
  setListSize: React.Dispatch<React.SetStateAction<number>>;
  animationSpeed: number;
  setAnimationSpeed: React.Dispatch<React.SetStateAction<number>>;
  columnColor: string;
  setColumnColor: React.Dispatch<React.SetStateAction<string>>;
  labelColor: string;
  setLabelColor: React.Dispatch<React.SetStateAction<string>>;
};

export const VisualizerContext = createContext<VisualizerContextType | null>(
  null
);

export default function VisualizerContextProvider({
  children,
}: VisualizerContextProviderProps) {
  const [listSize, setListSize] = useState<number>(15);
  const [animationSpeed, setAnimationSpeed] = useState<number>(0.5);
  const [columnColor, setColumnColor] = useState<string>("bg-slate-700");
  const [labelColor, setLabelColor] = useState<string>("text-emerald-500");

  return (
    <VisualizerContext.Provider
      value={{
        listSize,
        setListSize,
        animationSpeed,
        setAnimationSpeed,
        columnColor,
        setColumnColor,
        labelColor,
        setLabelColor,
      }}
    >
      {children}
    </VisualizerContext.Provider>
  );
}

export function useVisualizerContext() {
  const context = useContext(VisualizerContext);

  if (!context) {
    throw new Error(
      "useVisualizerContext must be used within a VisualizerContextProvider"
    );
  }

  return context;
}
