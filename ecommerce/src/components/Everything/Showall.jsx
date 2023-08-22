import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { MdOutlineArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";
import Cartitem from "./Cartitem";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Showall = () => {
  const dispatch = useDispatch();
  const { currentPage, searchValue } = useSelector((state) => state.custom);

  const [currentPageData, setCurrentPageData] = useState([]);
  const productsPerPage = 6;
  const { category } = useParams();
  const [localTotalPage, setLocalTotalPage] = useState(0);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        let startIndex = 0;
        let endIndex = productsPerPage;

        let apiUrl = `api/Product/GetAllProducts`;
        if (category) {
          apiUrl = `api/Product/GetProductByCategory?category=${category}`;
        }

        const response = await axios.get(apiUrl);
        const totalProducts = response.data;

        // Filter products based on search value
        const filteredProducts = totalProducts.filter((product) =>
          product.name.toLowerCase().includes(searchValue.toLowerCase())
        );

        if (currentPage > 0) {
          startIndex = (currentPage - 1) * productsPerPage;
          endIndex = startIndex + productsPerPage;
        }

        const currentPageProducts = filteredProducts.slice(startIndex, endIndex);

        setCurrentPageData(currentPageProducts);
        dispatch({ type: "setCurrentpage", payload: currentPage });

        const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
        setLocalTotalPage(totalPages);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchItems();
  }, [currentPage, category, dispatch, searchValue]);

  const handlePageClick = (item) => {
    const selectedPage = item.selected + 1;
    dispatch({ type: "setCurrentpage", payload: selectedPage });
  };

  return (
    <>
      <div>
        <div className="p-[5rem] ">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[1.2rem]">Products/ <strong className="text-purple-800 category "> {category} </strong></h2>
            </div>
          </div>
          <div>
            {currentPageData.length > 0 ? (
              <Cartitem
                key={currentPage}
                grid_col_numbers={3}
                image_width={12}
                productData={currentPageData}
              />
            ) : (
              <p>Loading products...</p>
            )}
          </div>
          <ReactPaginate
            breakLabel="..."
            nextLabel={
              <span>
                <MdOutlineArrowForwardIos size={18} />
              </span>
            }
            onPageChange={handlePageClick}
            pageCount={localTotalPage}
            previousLabel={
              <span>
                <MdArrowBackIosNew size={18} />
              </span>
            }
            containerClassName="flex justify-center items-center gap-3 mt-20"
            pageClassName="block border border-solid border-lightGray hover:bg-lightGray w-10 h-10 flex items-center justify-center rounded-md"
            pageLinkClassName="block  w-10 h-10 flex items-center justify-center rounded-md text-black no-underline"
            activeClassName="bg-purple-500 text-white no-underline"
            previousClassName="block border border-solid border-lightGray hover:bg-lightGray w-20 h-10 flex items-center justify-center rounded-md bg-purple-500 text-white no-underline"
            previousLinkClassName="block w-20 h-10  flex items-center justify-center rounded-md text-white no-underline"
            nextClassName="block border border-solid border-lightGray hover:bg-lightGray w-20 h-10 flex items-center justify-center rounded-md bg-purple-500 text-white no-underline"
            nextLinkClassName="block w-20 h-10  flex items-center justify-center rounded-md text-white no-underline"
          />
        </div>
      </div>
    </>
  );
};

export default Showall;
