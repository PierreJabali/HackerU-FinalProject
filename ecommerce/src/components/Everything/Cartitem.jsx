import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import PropTypes from "prop-types";
import { useEffect } from "react";
import Swal from 'sweetalert2';

const Cartitem = ({ grid_col_numbers, image_width, productData }) => {
  const dispatch = useDispatch();
  const { cart, Quantity, getItem } = useSelector((state) => state.custom);

  Cartitem.propTypes = {
    grid_col_numbers: PropTypes.number.isRequired,
    image_width: PropTypes.number.isRequired,
    productData: PropTypes.arrayOf(
      PropTypes.shape({
        Id: PropTypes.number.isRequired,
        CategoryId: PropTypes.number.isRequired, // Add this line
      })
    ).isRequired,
  };

  const postCartland = (obj) => {
    const duplicateValue = cart.find((item) => item.id === obj.id);

    if (duplicateValue) {
      const updatesum = duplicateValue.quantity + 1;
      const subtracttotal = ((parseFloat(duplicateValue.discount)) / 100) * (parseInt(duplicateValue.salePrice));
      const subtotal = parseInt(duplicateValue.salePrice) - subtracttotal;
      const finaltotal = subtotal * updatesum;

      const updatedItem = { ...duplicateValue, quantity: updatesum, subtotal: finaltotal };
      dispatch({ type: "addToCart", payload: updatedItem });

      // Show SweetAlert for successful update
      Swal.fire({
        icon: 'success',
        title: 'Item Updated',
        text: 'The item quantity has been updated in the cart.',
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      const subtracttotal = ((parseFloat(obj.discount)) / 100) * (parseInt(obj.salePrice));
      const subtotal = parseInt(obj.salePrice) - subtracttotal;
      const finaltotal = subtotal * Quantity;

      const newvalue = { ...obj, quantity: Quantity, subtotal: finaltotal };
      dispatch({ type: "addToCart", payload: newvalue });
      dispatch({ type: "setQuantity", payload: 1 });

      // Show SweetAlert for successful addition
      Swal.fire({
        icon: 'success',
        title: 'Item Added',
        text: 'The item has been successfully added to the cart.',
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  const func = () => {
    localStorage.setItem("count", parseInt(getItem) + 1);
  };

  useEffect(() => {
    // Save cartItems in sessionStorage whenever it changes
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }, [cart]);

  return (
    <div className={`mt-[3rem] grid grid-cols-1 gap-5 md:grid md:grid-cols-2 md:gap-10 lg:grid lg:grid-cols-${grid_col_numbers} lg:gap-20 `}>
      {productData && productData.length > 0 ? (
        productData.map((product) => (
          <div
            key={product.id} // Add the key prop here
            className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7] text-center"
          >
            <div>
              <Link to={`/landing/product/${product.id}`}>
                <img
                  className={`w-full h-[10rem] md:h-[12rem] lg:h-[${image_width}rem] rounded-t-xl object-fill`}
                  src={`https://localhost:7033/api/Product/GetImage/${product.image}`}
                  alt={product.description}
                  onClick={() => {
                    dispatch({ type: "setNone", payload: 1 });
                  }}
                />
              </Link>
            </div>

            <div className="p-4 md:p-5">
              <h1 className="text-gray-800 dark:text-white text-[1.3rem]">
                {product.Name}
              </h1>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                Price: ${product.purchasePrice}
              </h3>
              <p>{product.categoryName}</p>
              <div>
                <StarRatings

                  starRatedColor="rgba(0,0,20,10)"
                  starDimension="20px"
                  starSpacing="2px"
                  numberOfStars={5}
                  name='rating'
                />
              </div>

              <button
                onClick={() => {
                  postCartland(product);
                  func();
                  dispatch({ type: "setOffcanvas", payload: true })
                }}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 mt-3 text-sm font-semibold text-white transition-all bg-purple-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                href="#"
              >
                Add To Cart
              </button>
            </div>
          </div>
        ))
      ) : (
        ''
      )}
    </div>
  );

};

export default Cartitem;