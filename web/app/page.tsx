"use client";

import SearchBar from "@/components/SearchBar";
import Header from "@/components/Header";
import FighterCard from "@/components/FighterCard";
import PredictionButton from "@/components/PredictionButton";
import { ImagesSliderBackground } from "@/components/ImageSlider";
import { BoxReveal } from "@/components/ui/box-reveal";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface Fighter {
  id: number;
  name: string;
  height: string;
  weight: number;
  reach: number;
  stance: string;
  dob: string;
  slpm: number;
  stracc: string;
  sapm: number;
  strdef: string;
  tdavg: number;
  tdacc: string;
  tddef: string;
  subavg: number;
  record: string;
}

export default function Page() {
  const searchParams = useSearchParams();
  const [fighters, setFighters] = useState<Fighter[]>([]);

  const rawQuery = searchParams.get("query") || "";

  useEffect(() => {
    const fetchFighters = async () => {
      const queryArray = rawQuery
        .split(",")
        .map((id) => id.trim())
        .filter(Boolean);

      const fighterData = await Promise.all(
        queryArray.map(async (id) => {
          const response = await fetch(`http://127.0.0.1:8000/fighter/${id}`);
          return await response.json();
        })
      );

      setFighters(fighterData);
    };

    if (rawQuery) {
      fetchFighters();
    }
  }, [rawQuery]);

  return (
    <>
      <Header></Header>
      <ImagesSliderBackground></ImagesSliderBackground>
      <div className="bg-white h-screen">
        <div className="flex justify-center">
          <SearchBar></SearchBar>
        </div>
        <div className="flex items-center">
          {fighters.map((fighter, index) => (
            <React.Fragment key={fighter.id}>
              <FighterCard key={fighter.id} data={fighter} />
              {index === 0 && fighters.length > 1 && (
                <div className="flex items-center justify-center w-32 h-32 mx-4">
                  <div className="relative">
                    <span className="absolute -inset-2 rounded-lg bg-red-600/20 blur-lg"></span>
                    <BoxReveal>
                      <span className="relative block text-7xl font-extrabold text-ufcRed roboto animate-pulse">
                        VS
                      </span>
                    </BoxReveal>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        {fighters.length === 2 && (
          <div className="flex justify-center">
            <PredictionButton rawQuery={rawQuery}></PredictionButton>
          </div>
        )}
      </div>
    </>
  );
}
