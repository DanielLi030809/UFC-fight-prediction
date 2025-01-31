import React from "react";
import { Card, CardTitle, CardContent, CardFooter } from "./ui/card";
import Image from "next/image";

interface FighterData {
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

const StatItem = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className="py-3 border-b border-gray-600 hover:bg-gray-600/30 transition-colors duration-200">
    <p className="font-bold">
      {label}: <span className="font-normal text-gray-300">{value}</span>
    </p>
  </div>
);

const FighterCard = ({ data }: { data: FighterData }) => {
  const {
    id,
    name,
    height,
    weight,
    reach,
    stance,
    dob,
    slpm,
    stracc,
    sapm,
    strdef,
    tdavg,
    tdacc,
    tddef,
    subavg,
    record,
  } = data;
  return (
    <>
      <Card className="w-[1000px] ml-10 mt-10 flex h-[700px] shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-xl overflow-hidden">
        <div className="bg-ufcRed flex flex-col items-center gap-8 h-full w-1/3">
          <CardTitle className="flex justify-center items-center roboto text-white text-3xl mt-5 font-bold tracking-wider w-full text-center px-4">
            {name}
          </CardTitle>
          <CardContent className="w-4/5 p-0">
            <Image
              width={500}
              height={500}
              src="/JDM.jpg"
              alt="Jack Della Maddalena"
              className="rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
            />
          </CardContent>
        </div>
        <CardFooter className="flex flex-col items-start roboto bg-gray-700 text-white w-2/3 p-8 overflow-y-auto">
          <p className="bg-yellow-600 self-center text-3xl mb-8 mt-2 px-4 py-2 rounded-md font-bold shadow-md sticky top-0 z-10">
            Tale of the Tape
          </p>
          <div className="grid grid-cols-1 gap-0 w-full">
            <StatItem label="Height" value={height} />
            <StatItem label="Weight" value={weight} />
            <StatItem label="Reach" value={reach} />
            <StatItem label="Stance" value={stance} />
            <StatItem label="Date of Birth" value={dob} />
            <StatItem
              label="Significant Strikes Landed Per Minute"
              value={slpm}
            />
            <StatItem label="Significant Striking Accuracy" value={stracc} />
            <StatItem
              label="Significant Strikes Absorbed Per Minute"
              value={sapm}
            />
            <StatItem label="Significant Striking Defense" value={strdef} />
            <StatItem
              label="Average Take Downs Landed Per 15 Minutes"
              value={tdavg}
            />
            <StatItem label="Take Down Accuracy" value={tdacc} />
            <StatItem label="Take Down Defense" value={tddef} />
            <StatItem
              label="Average Submission Attempted Every 15 Minutes"
              value={subavg}
            />
            <div className="py-4 font-bold text-lg">{record}</div>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default FighterCard;
