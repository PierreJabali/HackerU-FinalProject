import React from 'react'

const Feature = ({ imag }) => {
  return (
    <>
      <div className='w-[100%] h-[20vh] pb-5  lg:w-[22%] lg:h-[30vh] text-center '>
        <div className='w-[5rem] h-[5rem] mx-auto mb-4'>
          <img className='w-[3rem] h-[3rem]' src={`${imag}`} alt="" />
        </div>
        <h1 className='mb-4 font-semibold text-[1rem]'>WorldWide Shipping</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, unde?</p>
      </div>
    </>
  )
}

export default Feature