"use client";

import React from "react";
import { useState } from "react";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";

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
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

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
      }, 10000); // Adjust timing based on your loader duration * number of steps
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handlePrediction}
        className="px-6 py-2.5 rounded-md text-white bg-ufcRed hover:bg-red-700 transition-colors duration-200 font-semibold text-sm shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 ml-10 mt-10"
      >
        Predict
      </button>

      <MultiStepLoader
        loadingStates={loadingStates}
        loading={loading}
        duration={2000}
      />

      {!loading && response && (
        <div className="flex justify-center mt-4">
          <div className="px-6 py-3 rounded-md bg-ufcRed roboto text-white text-center shadow-md">
            {JSON.stringify(response)}
          </div>
        </div>
      )}
    </>
  );
};

export default PredictionButton;
