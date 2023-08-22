import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PiAddressBookFill, PiNotebookFill, PiShoppingCartSimple } from "react-icons/pi";
import { FaUserAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { PiChartPieFill } from "react-icons/pi";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { sum, getItem, cart, checkoutTotal } = useSelector((state) => state.custom);

  // State to hold the item count from localStorage
  const [localStorageItemCount, setLocalStorageItemCount] = useState(0);

  useEffect(() => {
    const result = cart.reduce((acc, curr) => {
      acc = acc + parseInt(curr.subtotal);
      return acc;
    }, 0);

    dispatch({ type: "setCheckoutsubtotal", payload: result });

    const result1 = cart.reduce((acc, curr) => {
      acc = acc + parseInt(curr.quantity);
      return acc;
    }, 0);
    dispatch({ type: "setSum", payload: result1 });

    localStorage.setItem("count", result1);
    setLocalStorageItemCount(result1); // Update the state with the item count
  }, [cart, checkoutTotal, sum]);

  const removefiltervalue = () => {
    dispatch({ type: "setFilterValue", payload: "" });
    navigate("/landing");
  };

  return (
    <>
      <div className="block shadow-md lg:hidden">
        <div className="flex items-center justify-between px-10">
          <div>
            <Link to="/">
              <img
                className="w-[5rem] h-[5rem]  "
                src="../assets/cart.png"
                alt=""
              />
            </Link>
          </div>
          <div
            className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-black transition-all border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            data-hs-overlay="#hs-overlay-example">
            <div>
              <div className="relative mr-5">
                <PiShoppingCartSimple size={30} />
                <p className="absolute bg-gray-500 text-white px-2 -top-[1rem] left-[1rem] rounded-3xl">
                  {getItem}
                </p>
              </div>
            </div>
            <button type="button" className="text-gray-500 hover:text-gray-600" data-hs-overlay="#docs-sidebar" aria-controls="docs-sidebar" aria-label="Toggle navigation">
              <span className="sr-only">Toggle Navigation</span>
              <svg className="w-7 h-7" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
              </svg>
            </button>
          </div>
        </div>

        <div id="docs-sidebar" className="hs-overlay hs-overlay-open:translate-x-0 translate-x-full transition-all duration-300 transform hidden fixed top-0 right-0 bottom-0 z-[60] w-64 bg-white border-r border-gray-200 pt-7 pb-10
 overflow-y-auto scrollbar-y lg:block lg:translate-x-0 lg:right-auto lg:bottom-0 dark:scrollbar-y dark:bg-gray-800 dark:border-gray-700">
          <div className="px-6">
            <a className="flex-none text-xl font-semibold dark:text-white" href="javascript:;" aria-label="Brand">Ecommerce Store</a>
          </div>
          <nav className="flex flex-col flex-wrap w-full p-6 hs-accordion-group" data-hs-accordion-always-open>
            <ul className="space-y-1.5" style={{ paddingLeft: '0px !important' }}>
              <li className="hs-accordion" id="users-accordion">
                <a className="hs-accordion-toggle flex items-center gap-x-3.5 py-2 px-2.5 hs-accordion-active:text-purple-600 hs-accordion-active:hover:bg-transparent text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900
         dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white" href="javascript:;">
                  <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"></path>
                  </svg>
                  Users

                  <svg className="hidden w-3 h-3 ml-auto text-gray-600 hs-accordion-active:block group-hover:text-gray-500 dark:text-gray-400" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" ></path>
                  </svg>

                  <svg className="block w-3 h-3 ml-auto text-gray-600 hs-accordion-active:hidden group-hover:text-gray-500 dark:text-gray-400" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
                  </svg>
                </a>

                <div id="users-accordion" className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden">
                  <ul className="pt-2 pl-3 hs-accordion-group" data-hs-accordion-always-open>
                    <li className="hs-accordion" id="users-accordion-sub-1">
                      <a className="hs-accordion-toggle flex items-center gap-x-3.5 py-2 px-2.5 hs-accordion-active:text-purple-600 hs-accordion-active:hover:bg-transparent text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white" href="javascript:;">
                        Sub Menu 1

                        <svg className="hidden w-3 h-3 ml-auto text-gray-600 hs-accordion-active:block group-hover:text-gray-500 dark:text-gray-400" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
                        </svg>

                        <svg className="block w-3 h-3 ml-auto text-gray-600 hs-accordion-active:hidden group-hover:text-gray-500 dark:text-gray-400" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
                        </svg>
                      </a>

                      <div id="users-accordion-sub-1" className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden">
                        <ul className="pt-2 pl-2">
                          <li>
                            <a className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300" href="javascript:;">
                              Link 1
                            </a>
                          </li>
                          <li>
                            <a className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300" href="javascript:;">
                              Link 2
                            </a>
                          </li>
                          <li>
                            <a className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300" href="javascript:;">
                              Link 3
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="hs-accordion" id="users-accordion-sub-2">
                      <a className="hs-accordion-toggle flex items-center gap-x-3.5 py-2 px-2.5 hs-accordion-active:text-purple-600 hs-accordion-active:hover:bg-transparent text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white" href="javascript:;">
                        Sub Menu 2

                        <svg className="hidden w-3 h-3 ml-auto text-gray-600 hs-accordion-active:block group-hover:text-gray-500 dark:text-gray-400" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
                        </svg>

                        <svg className="block w-3 h-3 ml-auto text-gray-600 hs-accordion-active:hidden group-hover:text-gray-500 dark:text-gray-400" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
                        </svg>
                      </a>

                      <div id="users-accordion-sub-2" className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden pl-2">
                        <ul className="pt-2 pl-2">
                          <li>
                            <a className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300" href="javascript:;">
                              Link 1
                            </a>
                          </li>
                          <li>
                            <a className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300" href="javascript:;">
                              Link 2
                            </a>
                          </li>
                          <li>
                            <a className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300" href="javascript:;">
                              Link 3
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="hs-accordion" id="account-accordion">
                <a className="hs-accordion-toggle flex items-center gap-x-3.5 py-2 px-2.5 hs-accordion-active:text-purple-600 hs-accordion-active:hover:bg-transparent text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white" href="javascript:;">
                  <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                  </svg>
                  Account
                  <svg className="hidden w-3 h-3 ml-auto text-gray-600 hs-accordion-active:block group-hover:text-gray-500 dark:text-gray-400" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
                  </svg>

                  <svg className="block w-3 h-3 ml-auto text-gray-600 hs-accordion-active:hidden group-hover:text-gray-500 dark:text-gray-400" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
                  </svg>
                </a>

                <div id="account-accordion" className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden">
                  <ul className="pt-2 pl-2">
                    <li>
                      <a className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300" href="javascript:;">
                        Link 1
                      </a>
                    </li>
                    <li>
                      <a className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300" href="javascript:;">
                        Link 2
                      </a>
                    </li>
                    <li>
                      <a className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300" href="javascript:;">
                        Link 3
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <div className="flex items-center gap-x-3.5 py-2 px-2.5 hs-accordion-active:text-purple-600 hs-accordion-active:hover:bg-transparent text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white">
                <img
                  className="w-3.5 h-3.5 "
                  src=".\src\assets\menu-cart.avif"
                  alt=""
                />

                <Link to="/landing" className="hover:cursor-pointer">Shop All</Link>

              </div>

              <li className="hs-accordion" id="projects-accordion">
                <a className="hs-accordion-toggle flex items-center gap-x-3.5 py-2 px-2.5 hs-accordion-active:text-purple-600 hs-accordion-active:hover:bg-transparent text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white" href="javascript:;">
                  <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M1.5 0A1.5 1.5 0 0 0 0 1.5V13a1 1 0 0 0 1 1V1.5a.5.5 0 0 1 .5-.5H14a1 1 0 0 0-1-1H1.5z"></path>
                    <path d="M3.5 2A1.5 1.5 0 0 0 2 3.5v11A1.5 1.5 0 0 0 3.5 16h6.086a1.5 1.5 0 0 0 1.06-.44l4.915-4.914A1.5 1.5 0 0 0 16 9.586V3.5A1.5 1.5 0 0 0 14.5 2h-11zM3 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 .5.5V9h-4.5A1.5 1.5 0 0 0 9 10.5V15H3.5a.5.5 0 0 1-.5-.5v-11zm7 11.293V10.5a.5.5 0 0 1 .5-.5h4.293L10 14.793z"></path>
                  </svg>
                  Categories

                  <svg className="hidden w-3 h-3 ml-auto text-gray-600 hs-accordion-active:block group-hover:text-gray-500 dark:text-gray-400" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
                  </svg>

                  <svg className="block w-3 h-3 ml-auto text-gray-600 hs-accordion-active:hidden group-hover:text-gray-500 dark:text-gray-400" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
                  </svg>
                </a>

                <div id="projects-accordion" className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden">

                  <div className="text-sm hover:cursor-pointer">
                    <Link to="/landing/category/smartphones" name="smartphones" className="block px-4 py-2 rounded-md hover:text-purple-800 w-[100%] ">smartphones</Link>
                    <Link to="/landing/category/laptops" name="laptops" className="block px-4 py-2 rounded-md hover:text-purple-800  w-[100%] ">laptops</Link>
                    <Link to="/landing/category/fragrances" name="fragrances" className="block px-4 py-2 rounded-md hover:text-purple-800  w-[100%] ">fragrances</Link>
                    <Link to="/landing/category/skincare" name="skincare" className="block px-4 py-2 rounded-md hover:text-purple-800  w-[100%] ">skincare</Link>
                    <Link to="/landing/category/groceries" name="groceries" className="block px-4 py-2 rounded-md hover:text-purple-800  w-[100%] ">groceries</Link>
                    <Link to="/landing/category/home-decoration" name="home-decoration" className="block px-4 py-2 rounded-md hover:text-purple-800  w-[100%] ">home-decoration</Link>
                    <Link to="/landing/category/furniture" name="furniture" className="block px-4 py-2 rounded-md hover:text-purple-800  w-[100%] ">furniture</Link>
                    <Link to="/landing/category/womens-dresses" name="womens-dresses" className="block px-4 py-2 rounded-md hover:text-purple-800 w-[100%] ">womens-dresses</Link>
                    <Link to="/landing/category/womens-shoes" name="womens-shoes" className="block px-4 py-2 rounded-md hover:text-purple-800 w-[100%] ">womens-shoes</Link>
                    <Link to="/landing/category/mens-shirts" name="mens-shirts" className="block px-4 py-2 rounded-md hover:text-purple-800 w-[100%] ">mens-shirts</Link>
                    <Link to="/landing/category/mens-shoes" name="mens-shoes" className="block px-4 py-2 rounded-md hover:text-purple-800 w-[100%] ">mens-shoes</Link>
                    <Link to="/landing/category/mens-watches" name="mens-watches" className="block px-4 py-2 rounded-md hover:text-purple-800 w-[100%] ">mens-watches</Link>
                    <Link to="/landing/category/womens-watches" name="womens-watches" className="block px-4 py-2 rounded-md hover:text-purple-800 w-[100%] ">womens-watches</Link>
                    <Link to="/landing/category/womens-bags" name="womens-bags" className="block px-4 py-2 rounded-md hover:text-purple-800 w-[100%] ">womens-bags</Link>
                    <Link to="/landing/category/womens-jewellery" name="womens-jewellery" className="block px-4 py-2 rounded-md hover:text-purple-800 w-[100%] ">womens-jewellery</Link>
                    <Link to="/landing/category/sunglasses" name="sunglasses" className="block px-4 py-2 rounded-md hover:text-purple-800 w-[100%] ">sunglasses</Link>
                    <Link to="/landing/category/automotive" name="automotive" className="block px-4 py-2 rounded-md hover:text-purple-800 w-[100%] ">automotive</Link>
                    <Link to="/landing/category/motorcycle" name="motorcycle" className="block px-4 py-2 rounded-md hover:text-purple-800 w-[100%] ">motorcycle</Link>
                    <Link to="/landing/category/lighting" name="lighting" className="block px-4 py-2 rounded-md hover:text-purple-800 w-[100%] ">lighting</Link>
                  </div>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="">
        <div className={`head-main absolute z-10 hidden landing-color w-[100%] text-white lg:block`}>
          <div className="flex justify-between items-center w-[100%] h-[5rem] py-5 px-16 shadow-md">
            <div className="flex items-center gap-5 h-[5rem]">

              <div className="text-[1.2rem] h-[5rem] flex items-center">
                <Link to="/" className="text-white no-underline">
                  <img className="w-[8rem] h-[8rem] " src=".\src\assets\cart.png" alt="" />
                </Link>
              </div>
              <div className="flex flex-row items-center text-[1.2rem] hover:cursor-pointer h-[5rem]">
                <p className="flex mb-0" onClick={removefiltervalue}><PiChartPieFill size={25} />&nbsp;Shop</p>
              </div>
              <div className="flex items-center gap-5 h-[5rem]">
                <div className="flex items-center text-[1.1rem] hover:cursor-pointer h-[5rem]">
                  <Link to="/about" className="flex text-white no-underline"><PiAddressBookFill size={25} /> &nbsp; About Us</Link>
                </div>
                <div className="flex items-center text-[1.1rem] hover:cursor-pointer h-[5rem]">
                  <Link to="/contact" className="flex text-white no-underline"><PiNotebookFill size={25} /> Contact Us</Link>
                </div>
              </div>
            </div>
            <div className="flex gap-10">
              <div>
                <Link to="/landing/cart">
                  <div className="relative text-white">
                    <PiShoppingCartSimple size={22} />
                    <p className="absolute bg-purple-800 text-white px-2 -top-[0.8rem] left-[1rem]  rounded-2xl">
                      {localStorageItemCount}
                    </p>
                  </div>
                </Link>
              </div>
              <div>
                <Link to="/dashboard" className="text-white">
                  {" "}
                  <FaUserAlt size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
