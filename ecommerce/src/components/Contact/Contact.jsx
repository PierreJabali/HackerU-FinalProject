import HeroSection from '../Home/HeroSection';
import ContactCard from "./ContactCard";
import ContactForm from './ContactForm';
import Header from "../../Layout/Header";
import Footer from "../../Layout/Footer";

const Contact = () => {
  return (
    <>
      <Header />
      <div className='position-relative'>
        <HeroSection className="bg-violet-400" block="block" hidden="hidden" image={5} width={100} height={70} />
      </div>
      <div className='bg-purple-300 pb-20'>
        <div className='w-[100%] h-[20vh] pt-52 flex justify-center items-center flex-col leading-[3rem]'>
          <p className='text-[1.5rem]'>Have Any Queries?</p>
          <p className='font-bold text-[2rem] mb-5'> We Are Here To Help.</p>
          <div className='w-[5rem] h-[0.2rem] bg-blue-500'></div>
        </div>
        <div className='w-[80%] h-[40vh] mx-auto mb-10 md:grid md:gap-5 md:grid-cols-2 lg:mt-10 lg:grid lg:grid-cols-4 lg:items-center lg:place-items-center'>
          <ContactCard heading="Sales" paragraph="Of course, I'm here to help with any questions you have about sales! Whether you're looking for advice on selling products, services, or anything else related to the sales process, feel free to ask. Just let me know what specific information or guidance you're seeking, and I'll do my best to provide you with relevant insights and tips.." phone_number="03404404452" />
          <ContactCard heading="Complaints" paragraph="Lorem ipsum dolor sit amet consectetur adipisicing elit." phone_number="03206981814" />
          <ContactCard heading="Returns" paragraph="Lorem ipsum dolor sit amet consectetur adipisicing elit." phone_number="03466607075" />
          <ContactCard heading="Marketing" paragraph="Lorem ipsum dolor sit amet consectetur adipisicing elit." phone_number="03003208506" />
        </div>
        <div className='w-[80%] h-[70vh]  rounded-md mx-auto flex justify-between items-center'>
          <div className='w-[40%] h-[70vh] flex justify-center  flex-col '>
            <p className='mb-3 text-sm'> Don't be a stranger</p>
            <p className='text-[2rem] font-bold mb-5' >You Tell Us We Listen</p>
            <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem laudantium rerum eos, magni dicta reiciendis sint perferendis omnis tempore pariatur!</p>
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Contact