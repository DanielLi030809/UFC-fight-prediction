"use client";

import React, { FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  /**
   * Handle form submission:
   * 1. Read any existing "query" from URL.
   * 2. Get the user's new input.
   * 3. Append new input to existing comma-separated values (if not already present).
   * 4. Navigate to updated URL.
   */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Grab the form data
    const formData = new FormData(e.currentTarget);
    const newQueryValue = formData.get("query")?.toString().trim();

    // If no new value entered, do nothing
    if (!newQueryValue) return;

    // Get the current "query" from the URL (e.g. "1,2,3")
    const existingQuery = searchParams.get("query") || "";

    // Split into array, filter out empty strings
    const queryArray = existingQuery.split(",").filter(Boolean);

    // Check if the new value is already in the array
    if (!queryArray.includes(newQueryValue) && queryArray.length < 2) {
      queryArray.push(newQueryValue);
    } else {
      alert("You can only have two fighters max");
    }

    // Rebuild the comma-separated string
    const updatedQuery = queryArray.join(",");

    // Navigate to the new URL with updated "query" param
    router.push(`/?query=${updatedQuery}`, { scroll: false });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center space-x-4 max-w-md w-full mt-8"
    >
      <input
        type="text"
        name="query"
        placeholder="Add a fighter number (e.g. 1, 2, 3)..."
        className="flex-1 text-black bg-white border-2 border-ufcRed rounded-lg px-4 py-2.5 
          placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-ufcRed focus:border-transparent
          transition-all duration-200 hover:border-red-600"
      />
      <button
        type="submit"
        className="bg-ufcRed text-white font-semibold rounded-lg px-6 py-2.5 
          transition-all duration-200 hover:bg-red-700 active:bg-red-800
          border-2 border-ufcRed hover:border-red-700"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
