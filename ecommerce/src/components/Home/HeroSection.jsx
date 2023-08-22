import { FaFacebookF } from 'react-icons/fa'
import { GrTwitter } from 'react-icons/gr'
import { AiFillInstagram } from 'react-icons/ai'
import { BiLogoGooglePlus } from 'react-icons/bi'
const HeroSection = ({ image, margin, width, height, heading, paragraph, paragraph_size, hidden, block, heading_2, heading_2_size }) => {
    return (
        <>
            <div className={` lg:w-[${width}%] lg:h-[${height}vh] mx-auto background-image-${image} mt-[${margin}rem]`}>
                <div className=' w-[85%] h-[80vh] mx-auto text-white'>
                    <div className={image == 5 ? block : hidden}>
                        <div className='flex items-center justify-center w-[100%] h-[70vh]' >

                            <p className='lg:text-[3rem] font-semibold'>Contact Us</p>
                        </div>
                    </div>
                    <div className={`${image === 5 || image === 3 || image === 4 || image === 2 || image === 1 ? 'hidden' : block} w-[100%] h-[70vh] flex justify-center items-center `}>
                        <div className='bg-white w-[40%] h-[60vh] flex justify-center items-center flex-col leading-[7rem]' >
                            <div className='w-[10rem] h-[0.4rem] bg-red-300'></div>
                            <div>
                                <p className="text-black text-[2rem] font-semibold">Follow Us</p>
                            </div>
                            <div className='flex gap-10'>
                                <FaFacebookF color='black' size={30} />
                                <GrTwitter color='black' size={30} />
                                <AiFillInstagram color='black' size={30} />
                                <BiLogoGooglePlus color='black' size={30} />
                            </div>
                        </div>
                    </div>
                    <div className={(image == 1 || image == 2 || image == 4 || image == 5) ? hidden : block}>
                        <div className='flex justify-center items-center w-[100%] h-[70vh] '>
                            <p className='text-[3rem] font-semibold'>About Us</p>
                        </div>
                    </div>
                    <div className={(image == 1 || image == 2) ? block : hidden}>
                        <div className=' flex justify-center lg:pt-52 flex-col w-[100%] h-[60vh] md:h-[70vh] lg:h-[70vh]  '>
                            <p className={`${image == 2 ? block : hidden} text-[2rem] font-semibold leading-[3rem]`}>Limited time Offer</p>
                            <p className='text-[2.5rem] leading-[4rem] md:text-[4rem] lg:text-[4.5rem] font-semibold -ml-2 md:leading-[6rem] '>{heading}</p>
                            <p className={` lg:text-[${paragraph_size}rem] font-normal `}>{paragraph}</p>
                            <p className={`text-[${heading_2_size}rem] font-normal `}>{heading_2}</p>
                            <div className='mt-5'>
                                <button className='px-5 py-2 text-black bg-white me-5 mb-5'>Shop Now</button>
                                <button className={`find-more px-5 py-2 bg-transparent`}>Find More</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default HeroSection;