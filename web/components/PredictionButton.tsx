'use client'

import React from "react";
import { useState } from "react";

const PredictionButton = ({ rawQuery }: { rawQuery: string }) => {
    const [response, setResponse] = useState(null)
    const handlePrediction = async () => {
        try {
            const data = await fetch(`http://127.0.0.1:8000/predict/${encodeURIComponent(rawQuery)}`, {
                method: 'POST',
            });
            const response = await data.json();
            setResponse(response)
        } catch (error) {
            console.log(error)
        }
        
    }
  return (
    <>
      <button onClick={handlePrediction} className="rounded-sm text-white bg-ufcRed w-[100px] ml-10 mt-10">Predict</button>
      <div>{JSON.stringify(response)}</div>
    </>
  );
};

export default PredictionButton;