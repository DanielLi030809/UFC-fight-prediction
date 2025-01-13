import React from 'react'

const Header = () => {
  return (
    <>
        <div className='bg-white w-full h-[100px] flex items-center justify-between'>
            <div className='roboto text-3xl text-black flex'>
                <div>Combat<span className='text-ufcRed '>AI</span></div>
                <div>: A Predictive Model For UFC Fight Match Outcomes</div>
            </div>
            <div className='text-black roboto text-3xl'>
                Creator: Daniel Leting Li
            </div>
        </div>
    </>
  )
}

export default Header