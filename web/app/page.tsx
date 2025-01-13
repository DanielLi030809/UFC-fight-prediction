import SearchBar from "@/components/SearchBar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FighterCard from "@/components/FighterCard";

export default async function Home({
  searchParams,
}: {
  searchParams: { query?: number };
}) {
    const fighters = []
    const id = await searchParams.query;
    const response = await fetch(`http://127.0.0.1:8000/fighter/${id}`);
    const data = await response.json();
    fighters.push(data)
    return (
      <>
        <Header></Header>
        <Hero></Hero>
        <div className="bg-white h-screen">
          <SearchBar></SearchBar>
          <div>
            {fighters.map((fighter) => (
              <FighterCard key={fighter.id} data={fighter}></FighterCard>
            ))}
          </div>
        </div>
      </>
    );
  };
