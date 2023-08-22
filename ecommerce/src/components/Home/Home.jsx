import { useState, useEffect } from 'react'
import axios from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Cartitem from '../Everything/Cartitem';
import HeroSection from './HeroSection';
import Feature from './Feature';
import Home_card from './Home_card';
import Header from '../../Layout/Header';
import Footer from '../../Layout/Footer';

const Home = () => {
  const [currentPageData, setCurrentPageData] = useState([]);

  useEffect(() => {
    const fetchCurrentPageData = async () => {
      try {
        const response = await axios.get('https://localhost:7033/api/Product/FeaturedProducts');
        setCurrentPageData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCurrentPageData();
  }, []);

  return (
    <>
      <div>
        <Header />
        <HeroSection paragraph_size={2} block="block" hidden="hidden" image={1} width={100} height={100} heading="Raining offers for hot summer" paragraph="25% off on All products" />
      </div>
      <div className='lg:flex flex flex-col justify-center items-center gap-10 lg:flex-row lg:items-center lg:justify-center lg:gap-10 lg:w-[80%] my-16 lg:mx-auto'>
        <Home_card card_styling="tank-top" />
        <Home_card card_styling="men-wear" />
        <Home_card card_styling="foot-wear" />
      </div>
      <div className='py-10 bg-purple-100'>
        <div>
          <div className='text-center'>
            <p className='border-b-2 text-[2rem] font-semibold w-[20rem] mx-auto'>Featured Products</p>
          </div>
          <div className='w-[70%] md:w-[90%] mx-auto'>
            <Cartitem grid_col_numbers={4} image_width={15} productData={currentPageData} />
          </div>
        </div>
        <div>
          <HeroSection heading_2_size={2} heading_2="Buy This T-shirt at 20% Discount Use Code OFF20" paragraph_size={1.2} block="block" hidden="hidden" image={2} margin={5} width={80} height={60} heading="Special Edition" paragraph="Get one Buy one free" />
        </div>
        <div className='w-[100%]  flex justify-center items-center flex-col px-2 py-[5rem] gap-10  lg:flex-row lg:w-[90%] lg:gap-5 lg:mx-auto lg:mt-[9rem] lg:flex lg:justify-center lg:items-center'>
          <Feature imag=".\src\assets\globe-free-img.png" />
          <Feature imag=".\src\assets\quality-free-img.png" />
          <Feature imag=".\src\assets\tag-free-img.png" />
          <Feature imag=".\src\assets\lock-free-img.png" />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home;