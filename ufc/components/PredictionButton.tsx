"use client";

import React, { useRef } from "react";
import { useState } from "react";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";

interface PredictionResponse {
  win: "fighter1" | "fighter2";
  fighter1_probability: number;
  fighter2_probability: number;
}

const loadingStates = [
  {
    text: "Analyzing fighter statistics...",
  },
  {
    text: "Calculating win probabilities...",
  },
  {
    text: "Running machine learning model...",
  },
  {
    text: "Comparing historical matchups...",
  },
  {
    text: "Finalizing prediction...",
  },
];

const PredictionButton = ({ rawQuery }: { rawQuery: string }) => {
  const [response, setResponse] = useState<PredictionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handlePrediction = async () => {
    setLoading(true);
    try {
      const data = await fetch(
        `https://ufc-fight-prediction.vercel.app/predict/${encodeURIComponent(rawQuery)}`,
        {
          method: "POST",
        }
      );
      const response = await data.json();

      // Wait for loader animation to complete
      setTimeout(() => {
        setResponse(response);
        setLoading(false);

        // Add a small delay to ensure the results are rendered
        setTimeout(() => {
          resultsRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }, 100);
      }, 4600);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center pb-40 pt-10">
      <button
        onClick={handlePrediction}
        className="px-8 py-4 rounded-xl text-white bg-ufcRed hover:bg-red-700 
          transition-all duration-300 font-bold text-xl shadow-lg 
          hover:shadow-2xl transform hover:-translate-y-1 active:translate-y-0 
          mb-6 border-2 border-white hover:border-red-300
          min-w-[200px] relative overflow-hidden"
      >
        <span className="relative z-10">Predict Winner</span>
        <div
          className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 opacity-0 
          hover:opacity-100 transition-opacity duration-300"
        ></div>
      </button>

      <MultiStepLoader
        loadingStates={loadingStates}
        loading={loading}
        duration={1000}
      />

      {!loading && response && (
        <div
          ref={resultsRef}
          className="w-full max-w-2xl mt-8 mb-32 p-6 bg-white rounded-lg shadow-lg border border-gray-200"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex justify-center">
            Fight Prediction Results
          </h2>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3
                className={`text-lg font-semibold ${
                  response.win === "fighter1" ? "text-green-600" : "text-ufcRed"
                }`}
              >
                Fighter 1 {response.fighter1_probability > 0.5 && "(Winner)"}
              </h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-gray-700">
                  Win Probability:{" "}
                  <span className="font-semibold">
                    {(response.fighter1_probability * 100).toFixed(1)}%
                  </span>
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3
                className={`text-lg font-semibold ${
                  response.win === "fighter2" ? "text-green-600" : "text-ufcRed"
                }`}
              >
                Fighter 2 {response.fighter2_probability > 0.5 && "(Winner)"}
              </h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-gray-700">
                  Win Probability:{" "}
                  <span className="font-semibold">
                    {(response.fighter2_probability * 100).toFixed(1)}%
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictionButton;
