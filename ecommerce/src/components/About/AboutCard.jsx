
const AboutCard = ({ img, name, designation }) => {
  return (
    <>
      <div className='w-[100%] rounded-md h-[30vh] bg-purple-100 flex justify-center items-center flex-col '>
        <div className='mb-4'>
          <img className='w-[5rem] h-[5rem]' src={img} alt="" />
        </div>
        <p className='font-semibold'>{name}</p>
        <p>{designation}</p>
      </div>
    </>
  )
}

export default AboutCard