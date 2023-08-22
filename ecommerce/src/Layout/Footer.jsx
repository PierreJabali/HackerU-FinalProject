import Button from "../components/Button";
import { BiLogoFacebook } from "react-icons/bi";
import { FaTwitter } from "react-icons/fa";
import { AiOutlineInstagram } from "react-icons/ai";
import { AiOutlineGoogle } from "react-icons/ai";
import { AiOutlineYoutube } from "react-icons/ai";

const Footer = () => {
  return (
    <>
      <div>
        <div>
          <div className="w-[100%] lg:border p-5">
            <div className="marquee-container">
              <h2 className="marquee text-right lg:max-w-[95%] mx-auto text-[1.7rem] font-semibold">
                Sale upto 70% off for all clothes and fashion items, on all brands
              </h2>
            </div>
          </div>
        </div>
        <div className="text-center py-10 lg:flex lg:pt-20 lg:pb-20  lg:justify-between lg:max-w-[85%] lg:mx-auto lg:p-5">
          <div className="my-5">
            <h1 className="text-[2rem] font-semibold leading-[1.5rem] mb-5">
              <img className="footer-icon w-[8.5rem] h-[8rem] items-center" src=".\src\assets\cart.png" alt="" />
            </h1>
            <p className="text-[0.8rem] font-semibold">
              The Best Look Anywhere Anytime.
            </p>
          </div>
          <div className="my-5">
            <h3 className="font-normal text-[1.2rem] leading-[2rem] mb-5">
              For Her
            </h3>
            <p>Women Jeans</p>
            <p>Women Top and Shirt</p>
            <p>Women jackets</p>
            <p>Women Heels and flats</p>
            <p>Women Accessories</p>
          </div>
          <div className="my-5">
            <h3 className="font-normal text-[1.2rem] leading-[2rem] mb-5">
              For Her
            </h3>
            <p>Men Jeans</p>
            <p>Men Shirts</p>
            <p>Men Shoes</p>
            <p>Men Jackets</p>
            <p>Men Accessories</p>
          </div>
          <div className="my-5">
            <p className="font-normal text-[1.5rem] leading-[2rem] mb-5">
              Subscribe
            </p>
            <input
              type="email"
              name=""
              id=""
              placeholder="your email address"
              className="text-center mx-auto block lg:block lg:pr-[2rem] py-[0.5rem] mb-5 outline-none"
            />
            <Button
              value="Subscribe"
              color="purple"
              vertical={3}
              horizontol={8}
              text_color="white"
              className="subs-btn"
              size="0.9rem"
            />

          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-5 lg:flex lg:items-center lg:gap-0 lg:flex-row lg:justify-around lg:py-5 lg:border-2">
          <div className="text-[0.95rem] ">Copyright © 2023 Brandstore. Powered by Brandstore.</div>
          <div className="flex gap-10">
            <BiLogoFacebook size={25} />
            <FaTwitter size={25} />
            <AiOutlineInstagram size={25} />
            <AiOutlineGoogle size={25} />
            <AiOutlineYoutube size={28} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
