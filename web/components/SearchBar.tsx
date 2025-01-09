import React from 'react'
import Form from 'next/form'

const SearchBar = () => {
  return (
    <Form action="/" scroll={false}>
        <input type="text" name="query" placeholder="Search for a fighter..." />
        <button type="submit">Search</button>
    </Form>
  )
}

export default SearchBar