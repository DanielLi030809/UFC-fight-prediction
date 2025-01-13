import React from 'react'
import Image from 'next/image'

const Hero = () => {
  return (
    <div className='bg-white flex justify-center relative items-center'>
        <img className='w-full h-[750px] object-cover' src="/tragic.jpg" alt="tragic" />
        <p className='absolute text-8xl text-white roboto border-2 bg-ufcRed'>Never Lose a Sports Bet Again</p>
    </div>
  )
}

export default Hero