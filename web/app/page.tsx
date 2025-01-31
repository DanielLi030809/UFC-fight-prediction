import SearchBar from "@/components/SearchBar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FighterCard from "@/components/FighterCard";
import PredictionButton from "@/components/PredictionButton";
import { ImagesSliderBackground } from "@/components/ImageSlider";
export default async function Home({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
  const rawQuery = searchParams.query || "";

  const queryArray = rawQuery
    .split(",") // ["1","2","3"]
    .map((id) => id.trim()) // Trim spaces if needed
    .filter(Boolean);

  const fighters = await Promise.all(
    queryArray.map(async (id) => {
      const response = await fetch(`http://127.0.0.1:8000/fighter/${id}`);
      return await response.json();
    })
  );

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
            <>
              <FighterCard key={fighter.id} data={fighter} />
              {index === 0 && fighters.length > 1 && (
                <div className="flex items-center justify-center w-32 h-32 mx-4">
                  <div className="relative">
                    <span className="absolute -inset-2 rounded-lg bg-red-600/20 blur-lg"></span>
                    <span className="relative block text-7xl font-extrabold text-ufcRed roboto animate-pulse">
                      VS
                    </span>
                  </div>
                </div>
              )}
            </>
          ))}
        </div>
        <PredictionButton rawQuery={rawQuery}></PredictionButton>
      </div>
    </>
  );
}
