import React from 'react'
import Form from 'next/form'

const SearchBar = () => {
  return (
    <Form action="/" scroll={false}>
        <input type="text" name="query" placeholder="Search for a fighter..." className='text-black mr-5 border-2 border-ufcRed rounded-md'/>
        <button type="submit" className='bg-white text-black rounded-md w-20 border-2 border-ufcRed'>Search</button>
    </Form>
  )
}

export default SearchBar