"use client"

import React, { FormEvent } from "react"
import { useRouter, useSearchParams } from "next/navigation"

const SearchBar = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  /**
   * Handle form submission:
   * 1. Read any existing "query" from URL.
   * 2. Get the user’s new input.
   * 3. Append new input to existing comma-separated values (if not already present).
   * 4. Navigate to updated URL.
   */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Grab the form data
    const formData = new FormData(e.currentTarget)
    const newQueryValue = formData.get("query")?.toString().trim()

    // If no new value entered, do nothing
    if (!newQueryValue) return

    // Get the current "query" from the URL (e.g. "1,2,3")
    const existingQuery = searchParams.get("query") || ""

    // Split into array, filter out empty strings
    const queryArray = existingQuery.split(",").filter(Boolean)

    // Check if the new value is already in the array
    if (!queryArray.includes(newQueryValue) && queryArray.length < 2) {
      queryArray.push(newQueryValue)
    } else {
      alert("You can only have two fighters max")
    }

    // Rebuild the comma-separated string
    const updatedQuery = queryArray.join(",")

    // Navigate to the new URL with updated "query" param
    router.push(`/?query=${updatedQuery}`, { scroll: false })
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-3">
      <input
        type="text"
        name="query"
        placeholder="Add a number (e.g. 1, 2, 3)..."
        className="text-black border-2 border-ufcRed rounded-md px-2 py-1"
      />
      <button
        type="submit"
        className="bg-white text-black rounded-md w-20 border-2 border-ufcRed"
      >
        Search
      </button>
    </form>
  )
}

export default SearchBar
