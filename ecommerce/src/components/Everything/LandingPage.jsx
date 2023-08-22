import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Showall from "./Showall";
import Sidebar from "./Sidebar";
import { AiOutlineSearch } from "react-icons/ai";
import Header from "../../Layout/Header";
import Footer from "../../Layout/Footer";


const LandingPage = () => {
  const clickref = useRef(null);

  const dispatch = useDispatch();
  const { searchValue } = useSelector((state) => state.custom.products);

  useEffect(() => {
    const getItem = localStorage.getItem("count");

    dispatch({ type: "setGetItem", payload: getItem });
  });

  const filterValuefunction = () => {
    dispatch({ type: "setFilterValue", payload: searchValue });

    clickref.current.value = "";
  };

  return (
    <>
      <Header />
      <div className="bg-purple-100 w-[100%] h-[100%] ">
        <div className="max-w-[90%] mx-auto ">
          <div className="h-[10vh] w-[100%]  flex items-center justify-center lg:hidden">
            <input
              type="text"
              ref={clickref}
              onChange={(e) =>
                dispatch({
                  type: "setSearchvalue",
                  payload: e.target.value,
                })
              }
              placeholder="Search Products...."
              className=" text-center py-6 w-[100%] h-10 block lg:w-[75%] rounded-l-md outline-none text-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
            />
            <button
              className="px-4 py-3 text-white bg-purple-500 rounded-r-md"
              onClick={filterValuefunction}
            >
              <AiOutlineSearch size={28} />
            </button>
          </div>
          <div className="flex ">
            <div className="w-0  lg:w-[25%] ">
              <Sidebar />
            </div>
            <div className="w-[100%] lg:w-[75%] bg-purple-200 lg:my-[5rem]">
              <Showall />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;
