import SearchBar from "@/components/SearchBar";

export default async function Home({
  searchParams,
}: {
  searchParams: { query?: number };
}) {
    const response = await fetch(`http://127.0.0.1:8000/fighter/${searchParams.query}`);
    console.log(response);
    const data = await response.json();

    return (
      <>
        <div className="bg-white h-screen">
          <SearchBar></SearchBar>
          <div className="text-black mainFont">{JSON.stringify(data)}</div>
        </div>
      </>
    );
  };
