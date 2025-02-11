import React from "react";

const Header = () => {
  return (
    <header className="bg-[#2d2d2d] w-full py-6 px-8 shadow-md fixed top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col md:flex-row items-center md:items-center gap-2 md:gap-6">
          <h1 className="roboto text-3xl font-bold text-white tracking-tight">
            Combat<span className="text-ufcRed font-extrabold">AI</span>
          </h1>
          <p className="roboto text-xl md:text-2xl text-white text-center md:text-left font-medium">
            A Predictive Model For UFC Fight Match Outcomes
          </p>
        </div>
        <div className="text-white roboto text-lg md:text-xl font-medium hover:text-gray-900 transition-colors">
          Created by Daniel Leting Li
        </div>
      </div>
    </header>
  );
};

export default Header;
