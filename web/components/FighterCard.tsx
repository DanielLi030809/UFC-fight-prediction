import React from "react";
import {Card, CardTitle, CardContent, CardFooter} from "./ui/card";
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
const FighterCard = ({ data }: { data: FighterData}) => {
    const {id, name, height, weight, reach, stance, dob, slpm, stracc, sapm, strdef, tdavg, tdacc, tddef, subavg, record} = data;
  return (
    <>
      <Card className="w-[750px] ml-10 mt-10 flex h-[600px]">
        <div className="bg-ufcRed flex flex-col items-center gap-8 h-full">
            <CardTitle className="flex justify-center roboto text-white text-3xl mt-5">{name}</CardTitle>
            <CardContent className="w-4/5 p-0">
                <Image width={500} height={500} src="/JDM.jpg" alt="Jack Della Maddalena" />
            </CardContent>
        </div>
        <CardFooter className="flex flex-col items-start roboto bg-gray-700 text-white">
            <p className="bg-yellow-600 self-center text-3xl mb-5 mt-5">Tale of the Tape</p>
            <div>
                <p>Height: <span className="font-normal">{height}</span></p>
                <p>Weight: <span className="font-normal">{weight}</span></p>
                <p>Reach: <span className="font-normal">{reach}</span></p>
                <p>Stance: <span className="font-normal">{stance}</span></p>
                <p>Date of Birth: <span className="font-normal">{dob}</span></p>
                <p>Significant Strikes Landed Per Minute: <span className="font-normal">{slpm}</span></p>
                <p>Significant Striking Accuracy: <span className="font-normal">{stracc}</span></p>
                <p>Significant Strikes Absorbed Per Minute: <span className="font-normal">{sapm}</span></p>
                <p>Significant Striking Defense: <span className="font-normal">{strdef}</span></p>
                <p>Average Take Downs Landed Per 15 Minutes: <span className="font-normal">{tdavg}</span></p>
                <p>Take Down Accuracy: <span className="font-normal">{tdacc}</span></p>
                <p>Take Down Defense: <span className="font-normal">{tddef}</span></p>
                <p>Average Submission Attempted Every 15 Minutes: <span className="font-normal">{subavg}</span></p>
                <p>{record}</p>
            </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default FighterCard;
