import SearchBar from "@/components/SearchBar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FighterCard from "@/components/FighterCard";
import PredictionButton from "@/components/PredictionButton";

export default async function Home({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
    const id = await searchParams.query;
    const response = await fetch(`http://127.0.0.1:8000/fighter/${id}`);
    const data = await response.json();

    const rawQuery = searchParams.query || ""

    const queryArray = rawQuery
    .split(",")           // ["1","2","3"]
    .map((id) => id.trim()) // Trim spaces if needed
    .filter(Boolean)

    const fighters = await Promise.all(
      queryArray.map(async (id) => {
        const response = await fetch(`http://127.0.0.1:8000/fighter/${id}`)
        return await response.json()
      })
    )

    return (
      <>
        <Header></Header>
        <Hero></Hero>
        <div className="bg-white h-screen">
          <SearchBar></SearchBar>
          <div className="flex">
            {fighters.map((fighter) => (
              <FighterCard key={fighter.id} data={fighter}></FighterCard>
            ))}
          </div>
          <PredictionButton id={id}></PredictionButton>
        </div>
      </>
    );
  };
