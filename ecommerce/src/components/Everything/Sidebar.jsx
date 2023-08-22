import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";


const Sidebar = () => {
  const dispatch = useDispatch();
  const { searchValue, products } = useSelector(state => state.custom);
  const [categories, setCategories] = useState([]);

  // Function to filter products based on search value
  const filterProducts = () => {
    const filteredProducts = products.filter(product =>
      product.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    // Update the filtered products in the Redux store
    dispatch({ type: "setFilterarray", payload: filteredProducts });
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("api/Category/GetAllCategories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const clickref = useRef(null)

  return (
    <>
      <div className="hidden lg:mt-20 lg:visible lg:py-[5rem] lg:flex  lg:flex-col">
        <div className="w-[100%] lg:flex lg:pr-10 ">
          <input
            type="text"
            ref={clickref}
            onChange={e => dispatch({ type: "setSearchvalue", payload: e.target.value })}
            placeholder="Search Products...."
            className="w-[100%] text-center py-3 px-4 block lg:w-[75%] rounded-l-md outline-none text-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
          />
          <button className="px-2 py-2 search-icon text-white bg-purple-500 rounded" onClick={filterProducts}><AiOutlineSearch size={28} /></button>
        </div>
        <div className="hidden lg:mt-10 lg:block">
          <h1 className="font-semibold text-[2rem] text-left ">Categories</h1>
          <div className="hover:cursor-pointer text-[1rem]">
            {categories.map((category) => (
              <Link
                to={`/landing/category/${category.name}`}
                key={category.id}
                className="flex py-2 rounded-md hover:text-white-500 no-underline w-[100%]"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
