"use client";
import { motion } from "framer-motion";
import React from "react";
import { ImagesSlider } from "@/components/ui/images-slider";

export function ImagesSliderBackground() {
  const images = ["/tragic.jpg", "/max.jpg", "/jon.jpg", "/jorge.jpg"];
  return (
    <ImagesSlider className="h-[750px]" images={images}>
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="absolute inset-0 flex items-center justify-center z-50"
      >
        <h1
          className="text-4xl md:text-6xl lg:text-8xl text-white roboto 
          px-8 py-4 bg-ufcRed border-2 border-white
          text-center
          transform hover:scale-105 transition-transform duration-300 rounded-xl"
        >
          Never Lose a Sports Bet{" "}
          <span className="inline-block animate-pulse font-bold italic underline decoration-2">
            Again
          </span>
        </h1>
      </motion.div>
    </ImagesSlider>
  );
}
