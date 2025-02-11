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
        `http://127.0.0.1:8000/predict/${encodeURIComponent(rawQuery)}`,
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
      }, 10000);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center pb-40">
      <button
        onClick={handlePrediction}
        className="px-6 py-2.5 rounded-md text-white bg-ufcRed hover:bg-red-700 transition-colors duration-200 font-semibold text-sm shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 mb-6"
      >
        Predict
      </button>

      <MultiStepLoader
        loadingStates={loadingStates}
        loading={loading}
        duration={2000}
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
