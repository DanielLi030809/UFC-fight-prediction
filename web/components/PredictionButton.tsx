import React from "react";


const PredictionButton = async ({ id }: { id: string }) => {
    const rawQuery = searchParams.query || ""
    const data = await fetch(`http://127.0.0.1:8000/predict`);

  return (
    <>
      <button className="rounded-sm text-white bg-ufcRed w-[100px] ml-10 mt-10">Predict</button>
    </>
  );
};

export default PredictionButton;
