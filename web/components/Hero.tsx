import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="relative h-[750px] w-full">
      {/* Use Next.js Image component for better performance */}
      <Image
        src="/tragic.jpg"
        alt="Sports betting background"
        fill
        priority
        className="object-cover brightness-50"
      />

      <div className="absolute inset-0 flex items-center justify-center">
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
      </div>
    </div>
  );
};

export default Hero;
