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
