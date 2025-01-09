'use client'
import SearchBar from "@/components/SearchBar";
import { useState } from "react";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const [data, setData] = useState<any>("")
  const searchParams = useSearchParams(); // Hook to access the query parameters
  const query = searchParams.get('query');

  useEffect(() => {
  const fetch_fighter = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/fighter/${query}`);
      console.log(response)
      const data = await response.json()
      console.log(data)
      setData(data)
    } catch (error) {
      console.log("error fetching fighter information")
    }
//  loading page and rendering page
  }
  fetch_fighter()
}, [query])

  return (
    <>
      <div className="bg-red-400 h-screen">
        <SearchBar></SearchBar>
        <div>{JSON.stringify(data)}</div>
      </div>
    </>
  );
}
