import SearchBar from "@/components/SearchBar";
import Header from "@/components/Header";
import FighterCard from "@/components/FighterCard";
import PredictionButton from "@/components/PredictionButton";
import { ImagesSliderBackground } from "@/components/ImageSlider";
import { BoxReveal } from "@/components/ui/box-reveal";
import React from "react";
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { Fighter } from "@prisma/client";

async function getFighters(query: string) {
  if (!query) return [];

  const fighterNames = query
    .split(",")
    .map((name) => name.trim())
    .filter(Boolean);

  const fighters = await Promise.all(
    fighterNames.map(async (name) => {
      return prisma.fighter.findFirst({
        where: {
          name: {
            contains: name,
            mode: "insensitive", // Case-insensitive search
          },
        },
      });
    })
  );

  // Filter out any null results and return the fighters
  return fighters.filter((fighter): fighter is Fighter => fighter !== null);
}

async function PageContent({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
  const rawQuery = searchParams.query || "";
  const fighters = await getFighters(rawQuery);

  // Get all fighter names
  const fighterNames = await prisma.fighter.findMany({
    select: {
      name: true,
    },
  });

  // If you just want an array of names
  const names = fighterNames
    .map((fighter) => fighter.name)
    .filter((name): name is string => name !== null);

  return (
    <>
      <Header />
      <ImagesSliderBackground />
      <div className="bg-white h-screen flex flex-col items-center">
        <div className="flex justify-center">
          <SearchBar data={names} />
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
            <PredictionButton rawQuery={rawQuery} />
          </div>
        )}
      </div>
    </>
  );
}

export default function Page({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent searchParams={searchParams} />
    </Suspense>
  );
}
