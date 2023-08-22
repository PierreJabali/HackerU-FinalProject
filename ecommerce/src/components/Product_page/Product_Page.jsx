import { useEffect, useState } from "react";
import Button from "../Button";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "../../Layout/Header";
import Footer from "../../Layout/Footer";

const Product_Page = () => {
  const [product, setProduct] = useState(null);
  const [increment_decrement, setIncrementDecrement] = useState(1);
  const param = useParams();
  const dispatch = useDispatch();
  const { cart, Quantity } = useSelector((state) => state.custom);

  useEffect(() => {
    axios.get(`/api/Product/GetProductById/${param.id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [param.id]);

  const increment = () => {
    const updatedIncrement = increment_decrement + 1;
    setIncrementDecrement(updatedIncrement);
    updateLocalStorage(updatedIncrement);
  };

  const decrement = () => {
    if (increment_decrement > 1) {
      const updatedIncrement = increment_decrement - 1;
      setIncrementDecrement(updatedIncrement);
      updateLocalStorage(updatedIncrement);
    }
  };

  const updateLocalStorage = (updatedValue) => {
    localStorage.setItem("increment_decrement", updatedValue);
  };

  const postCart = () => {
    if (product) {
      const duplicateValue = cart.find((item) => item.id === product.id);

      if (duplicateValue) {
        const updatedQuantity = duplicateValue.quantity + increment_decrement;
        const subtractTotal = ((parseFloat(duplicateValue.discount)) / 100) * (parseInt(duplicateValue.salePrice));
        const subtotal = parseInt(duplicateValue.salePrice) - subtractTotal;
        const finalTotal = subtotal * updatedQuantity;

        const updatedItem = { ...duplicateValue, quantity: updatedQuantity, subtotal: finalTotal };
        dispatch({ type: "addToCart", payload: updatedItem });

        // Update cartItems in local storage after cart update
        localStorage.setItem("cartItems", JSON.stringify([...cart])); // Use the updated cart state

        // Show SweetAlert for successful update
        Swal.fire({
          icon: "success",
          title: "Item Updated",
          text: "The item quantity has been updated in the cart.",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        const subtractTotal = ((parseFloat(product.discount)) / 100) * (parseInt(product.salePrice));
        const subtotal = parseInt(product.salePrice) - subtractTotal;
        const finalTotal = subtotal * Quantity;

        const newvalue = { ...product, quantity: Quantity, subtotal: finalTotal };
        dispatch({ type: "addToCart", payload: newvalue });
        dispatch({ type: "setQuantity", payload: 1 });
        dispatch({ type: "setIncrementDecrement", payload: 1 }); // Reset quantity display

        // Update cartItems in local storage after cart update
        localStorage.setItem("cartItems", JSON.stringify([...cart])); // Use the updated cart state

        // Show SweetAlert for successful addition
        Swal.fire({
          icon: "success",
          title: "Item Added",
          text: "The item has been successfully added to the cart.",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    }
  };

  useEffect(() => {
    // Load the initial increment_decrement value from localStorage
    const initialIncrement = parseInt(localStorage.getItem("increment_decrement")) || 1;
    setIncrementDecrement(initialIncrement);
  }, []);

  useEffect(() => {
    // Save cartItems in localStorage whenever the cart state changes
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }, [cart]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="w-[100%] ">
        <div className="flex max-w-[80%] justify-center items-center mx-auto gap-16 py-16">
          <div className="w-[40%] pt-20">
            <img
              src={`https://localhost:7033/api/Product/GetImage/${product.image}`}
              className="description-image w-[60%rem] h-[30rem]"
              alt="hello"
            />
          </div>
          <div className="w-[50%]">
            <div className="leading-[4rem]">
              <p className="text-[1.2rem]">{product.categoryName}</p>
              <h1 className="font-semibold text-[3rem] text-purple-900">
                {product.title}
              </h1>
              <h2 className="font-normal text-[1.5rem]">
                Price: <strong className="text-purple-700">${product.salePrice}</strong>
                <span className="text-[1.2rem]">+ free shipping</span>
              </h2>
              <h2 className="font-normal text-[1.4rem] text-gray-500">
                Discount Percentage: <strong>{product.discount}%</strong>
              </h2>
              <p className="text-[1rem] text-gray-500 leading-7">
                {product.description}
              </p>
            </div>
            <div className="flex gap-1 my-5">
              <Button
                value="-"
                color="blue"
                horizontol={4}
                className="bg-purple-800 text-white text-[1.5rem]"
                vertical={1}
                clickfunction={decrement}
              />
              <div className="mx-2">{increment_decrement}</div>
              <Button
                value="+"
                color="blue"
                horizontol={4}
                vertical={1}
                className="bg-purple-800 text-white text-[1.5rem]"
                clickfunction={increment}
              />
              <button className="px-16 py-1 ml-10 rounded-tl-lg rounded-br-lg text-white bg-purple-500" onClick={() => {
                postCart();
              }}>
                Add to Cart
              </button>
            </div>

            <p className="text-gray-500 text-[0.9rem]">SKU N/A Categories : {product.categoryName}</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product_Page;