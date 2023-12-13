"use client";

import React from "react";
import { UpdatedVisualizer } from "@/components/UpdatedVisualizer/UpdatedVisualizer";
import { NextPage } from "next";
import { NextSeo } from "next-seo";
import SidebarWrapper from "@/components/Sidebar/Sidebar";

const Visualizer: NextPage = () => {
  return (
    <>
      <NextSeo
        title="Visualizer"
        description="Visualize sorting algorithms in real time."
      />
      <div className="flex items-center justify-center min-h-screen w-full">
        <div className="flex md:flex-row items-center justify-center w-full">
          <div className="flex items-center justify-center w-full md:w-75%">
            <SidebarWrapper />
            <UpdatedVisualizer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Visualizer;
