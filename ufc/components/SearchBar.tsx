"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const SearchBar = ({ data }: { data: string[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Add debounce timeout ref
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // Clear any existing timeout
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Debounce the filtering operation
    debounceTimeout.current = setTimeout(() => {
      const filtered = data.filter((fighter) =>
        fighter.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowDropdown(true);
    }, 300); // 300ms delay
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  const handleSuggestionClick = (value: string) => {
    setInputValue(value);
    setShowDropdown(false);

    // Get the current "query" from the URL
    const existingQuery = searchParams.get("query") || "";
    const queryArray = existingQuery.split(",").filter(Boolean);

    if (!queryArray.includes(value) && queryArray.length < 2) {
      queryArray.push(value);
      const updatedQuery = queryArray.join(",");
      router.push(`/?query=${updatedQuery}`, { scroll: false });
    } else if (queryArray.length >= 2) {
      alert("You can only have two fighters max");
    } else {
      alert("Fighter already in the search");
    }
  };

  const handleClear = () => {
    setInputValue("");
    setSuggestions([]);
    setShowDropdown(false);
    // Get the current "query" from the URL
    const currentQuery = searchParams.get("query") || "";
    if (currentQuery) {
      router.push("/", { scroll: false }); // Reset to base URL
    }
  };

  return (
    <div className="relative flex-1" ref={searchContainerRef}>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex items-center space-x-4 max-w-3xl w-full mt-8 p-6 
          bg-gray-900/90 backdrop-blur-sm rounded-2xl shadow-2xl 
          border-2 border-ufcRed/50"
      >
        <div className="relative flex-1">
          <input
            type="text"
            name="query"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Search for a fighter..."
            className="w-full text-black bg-white/95 border-3 border-ufcRed rounded-xl px-6 py-4 
              placeholder:text-gray-500 placeholder:font-medium text-lg
              focus:outline-none focus:ring-4 focus:ring-red-500/50 focus:border-red-600
              transition-all duration-300 hover:border-red-600 hover:shadow-lg
              shadow-md"
          />

          {showDropdown && suggestions.length > 0 && (
            <ul
              className="absolute z-10 w-full mt-2 bg-white/95 border-2 border-gray-200 
              rounded-xl shadow-xl max-h-60 overflow-auto backdrop-blur-sm"
            >
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-6 py-3 hover:bg-red-50 cursor-pointer text-black
                    transition-colors duration-200 text-lg font-medium"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="button"
          onClick={() => handleSuggestionClick(inputValue)}
          className="bg-ufcRed text-white font-bold rounded-xl px-8 py-4 
            transition-all duration-300 hover:bg-red-700 active:bg-red-800
            border-3 border-ufcRed hover:border-red-700 text-lg
            shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0
            whitespace-nowrap"
        >
          Search
        </button>

        <button
          type="button"
          onClick={handleClear}
          className="bg-gray-700 text-white font-bold rounded-xl px-8 py-4 
            transition-all duration-300 hover:bg-gray-800 active:bg-gray-900
            border-3 border-gray-700 hover:border-gray-800 text-lg
            shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0
            whitespace-nowrap"
        >
          Clear
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
