import HeroSection from '../Home/HeroSection';
import AboutCard from './AboutCard';
import Feature from '../Home/Feature';
import { FaFacebookF } from 'react-icons/fa';
import { GrTwitter } from 'react-icons/gr';
import { AiFillInstagram } from 'react-icons/ai';
import { BiLogoGooglePlus } from 'react-icons/bi';
import Header from "../../Layout/Header";
import Footer from "../../Layout/Footer";

const About = () => {
  return (
    <>
      <Header />
      <div>
        <HeroSection paragraph_size={2} hidden="hidden" image={3} width={100} height={90} heading="Raining offers for hot summer" paragraph="25% off on All products" />
      </div>
      <div className='w-[100%] bg-purple-300 h-[100vh] flex flex-col justify-center items-center pt-25'>
        <div className="w-[6rem] h-[0.3rem] mb-5 mx-auto bg-purple-900"></div>
        <div className='w-[90%] mx-auto h-[70vh] bg-white flex gap-10 py-10 justify-center items-center'>
          <div className='w-[60%] px-5'>
            <img className='object-fit object-cover w-full h-full' src=".\src\assets\about-us.jpg" alt="" />
          </div>
          <div className='w-[60%] text-center px-10'>
            <p className='font-semibold text-[3rem]'>Who We Are</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo delectus culpa, harum provident porro tenetur inventore, ad omnis praesentium similique ratione soluta quo cum nostrum, error repudiandae! Omnis, non possimus.</p>
          </div>
        </div>
      </div>
      <div className='py-10'>
        <div className='w-[6rem] h-[0.3rem] mx-auto bg-purple-900'></div>
        <div className='w-[50%] mx-auto text-center mt-10'>
          <p className='text-[1.2rem] mb-4'>A Few Words About </p>
          <p className='font-bold text-[2rem] mb-5'>Our Team</p>
          <p className='text-sm'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt impedit ut expedita magni eos quo error consequuntur fugiat debitis maxime!</p>
        </div>
        <div className='w-[60%] h-[60vh] gap-5 mt-10 mx-auto grid grid-cols-3'>
          <AboutCard img=".\src\assets\team2-free-img.png" name="Harvey Spectre" designation="Founder-CEO" />
          <AboutCard img=".\src\assets\team1-free-img.png" name="Jessica Pearson" designation="COO" />
          <AboutCard img=".\src\assets\team3-free-img.png" name="Rachel Zayn" designation="Marketimng Head" />
          <AboutCard img=".\src\assets\team4free-img.png" name="Luise Litt" designation="Lead Developer" />
          <AboutCard img=".\src\assets\team5-free-img.png" name="Katrina Bennet" designation="Intern Designer" />
          <AboutCard img=".\src\assets\team6-free-img.png" name="Mike Ross " designation="Intern Designer" />
        </div>
      </div>
      <div className='mt-16 relative'>
        <HeroSection paragraph_size={2} hidden="hidden" image={4} width={100} height={60} heading="Raining offers for hot summer" paragraph="25% off on All products" />
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[35%] h-[60vh] flex justify-center items-center flex-col leading-[7rem] bg-purple-300' >
          <div className='w-[9rem] h-[0.4rem] bg-purple-800'></div>
          <div>
            <p className="text-white text-[2rem] font-semibold">Follow Us</p>
          </div>
          <div className='flex gap-10'>
            <FaFacebookF color='white' size={30} />
            <GrTwitter color='white' size={30} />
            <AiFillInstagram color='white' size={30} />
            <BiLogoGooglePlus color='white' size={30} />
          </div>
        </div>
      </div>
      <div className='w-[100%] flex justify-center items-center flex-col px-10 mt-32  lg:flex-row lg:w-[80%] lg:gap-10 lg:mx-auto lg:mb-20 lg:flex lg:justify-center lg:items-center'>
        <Feature imag=".\src\assets\globe-free-img.png" />
        <Feature imag=".\src\assets\quality-free-img.png" />
        <Feature imag=".\src\assets\tag-free-img.png" />
        <Feature imag=".\src\assets\lock-free-img.png" />
      </div>
      <Footer />
    </>
  )
}

export default About
