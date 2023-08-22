const Home_card = ({ card_styling }) => {
  return (
    <>
      <div className={`lg:flex flex flex-col justify-center items-center  text-center lg:items-center lg:justify-center lg:flex-col w-[100%] lg:mt-52 lg:w-[30%] lg:h-[60vh] text-white ${card_styling}`}>

        <p className='font-semibold text-[1.3rem] pt-52 '>20% Off On the Tank Tops</p>
        <p className='font-normal text-[1rem]  pt-3'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas, facere?</p>
      </div>
    </>
  )
}

export default Home_card