"use client";

import React from "react";
import { UpdatedVisualizer } from "@/components/UpdatedVisualizer/UpdatedVisualizer";
import { motion } from "framer-motion";
import { NextPage } from "next";
import { NextSeo } from "next-seo";
const Visualizer: NextPage = () => {
  return (
    <>
      <NextSeo
        title="Visualizer"
        description="Visualize sorting algorithms in real time."
      />
      <div className="flex flex-col items-center justify-center min-h-screen w-full">
        <div className="flex flex-col items-center justify-center w-full">
          <motion.h1
            className="text-7xl font-bold text-center text-slate-100"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Visualizer
          </motion.h1>
          <motion.h2
            className="text-3xl font-medium text-center text-slate-100"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Visualize sorting algorithms in real time.
          </motion.h2>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center w-full">
          <div className="flex flex-col items-center justify-center w-full md:w-75%">
            <UpdatedVisualizer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Visualizer;
