
const ContactCard = ({ heading, paragraph, phone_number }) => {
  return (
    <>
      <div className='contact-card lg:w-[95%] lg:h-[30vh] rounded-md mx-auto bg-white'>
        <div className='flex flex-col items-center justify-center gap-2 px-4 py-6 text-center'>
          <p className='text-[1.3rem] font-semibold'>{heading}</p>
          <p>{paragraph}</p>
          <p className="text-blue-700">{phone_number}</p>
        </div>
      </div>
    </>
  )
}

export default ContactCard