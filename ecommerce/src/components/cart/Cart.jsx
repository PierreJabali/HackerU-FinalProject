import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Checkout from "./Checkout";
import Header from "../../Layout/Header";
import Swal from "sweetalert2";
import Footer from "../../Layout/Footer";

const Cart = () => {
  const dispatch = useDispatch();
  const { cart, sum, checkoutTotal } = useSelector((state) => state.custom);

  const updateCartInLocalStorage = (updatedCart) => {
    dispatch({ type: "setCarts", payload: updatedCart });
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const handleMinusClick = (item) => {
    if (item.quantity > 1) {
      const updatedItem = { ...item, quantity: item.quantity - 1 };
      const updatedCart = cart.map(cartItem =>
        cartItem.id === item.id ? {
          ...updatedItem,
          subtotal: (updatedItem.quantity * updatedItem.salePrice) - ((updatedItem.discount / 100) * (updatedItem.quantity * updatedItem.salePrice))
        } : cartItem
      );
      updateCartInLocalStorage(updatedCart);
    }
  };

  const handlePlusClick = (item) => {
    const updatedItem = { ...item, quantity: item.quantity + 1 };
    const updatedCart = cart.map(cartItem =>
      cartItem.id === item.id ? {
        ...updatedItem,
        subtotal: (updatedItem.quantity * updatedItem.salePrice) - ((updatedItem.discount / 100) * (updatedItem.quantity * updatedItem.salePrice))
      } : cartItem
    );
    updateCartInLocalStorage(updatedCart);
  };

  const deleteCartItem = (item) => {
    Swal.fire({
      title: "Delete Product",
      text: "Are you sure you want to remove this product from your cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedCart = cart.filter((cartItem) => cartItem.id !== item.id);
        dispatch({ type: "setCarts", payload: updatedCart });
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));

        Swal.fire("Deleted!", "Product has been removed from your cart.", "success");
      }
    });
  };

  useEffect(() => {
    const cartItemsFromLocalStorage = JSON.parse(localStorage.getItem("cartItems")) || [];
    dispatch({ type: "setCarts", payload: cartItemsFromLocalStorage });
  }, []);

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
  }, [cart, checkoutTotal, sum]);

  const isCartEmpty = cart.length === 0;

  return (
    <>

      <Header />
      <div className="bg-purple-50">
        <div>
          <h1 className="text-[2rem] text-gray-600 pt-28 pb-5 font-extrabold  flex justify-center items-center">
            Your Cart
          </h1>
        </div>
        <div className="flex flex-wrap">
          <div className="w-full lg:w-8/12 px-4 mb-8">
            <div className="flex flex-col  max-w-[100%] ml-10">

              {cart.map((item) => {
                return (
                  <div key={item.id} className="block mb-16 border lg:hidden">
                    <div>
                      <img
                        className="w-[5rem] h-[5rem] block mx-auto object-contain"
                        src={`https://localhost:7033/api/Product/GetImage/${item.image}`}
                        alt=""
                      />
                    </div>
                    <div className="flex justify-between p-5 border-b-2 ">
                      <p>Product</p>
                      <p>{item.name}</p>
                    </div>
                    <div className="flex justify-between p-5 border-b-2">
                      <p>Quantity</p>
                      <div className="flex items-center space-x-2">
                        <button
                          className="text-purple-500 hover:text-purple-700"
                          style={{ fontSize: '1.2rem' }}
                          onClick={() => handleMinusClick(item)}
                        >
                          -
                        </button>
                        <p className='mb-0'>{item.quantity}</p>
                        <button
                          className="text-purple-500 hover:text-purple-700"
                          style={{ fontSize: '1.2rem' }}
                          onClick={() => handlePlusClick(item)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between p-5 border-b-2">
                      <p>Price</p>
                      <p>${item.salePrice}</p>
                    </div>
                    <div className="flex justify-between p-5 border-b-2">
                      <p>Discunt</p>
                      <p>${item.discount}</p>
                    </div>
                    <div className="flex justify-between p-5 border-b-2">
                      <p>Subtotal</p>
                      <p>${parseInt(item.subtotal)}</p>
                    </div>
                    <div className="py-5 border-b-2">
                      <button className=" py-3 flex justify-center  w-[25%] rounded-md text-white mx-auto text-center bg-purple-500 ">Delete</button>
                    </div>
                  </div>
                )
              })
              }
              <div className="hidden lg:block -m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                  <div className="overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead>
                        <tr className="bg-purple-900 ">
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-medium text-left text-white uppercase"
                          >
                            Product
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-medium text-left text-white uppercase"
                          >
                            Quantity
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-medium text-left text-white uppercase"
                          >
                            Price
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-medium text-left text-white uppercase"
                          >
                            Discount
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-medium text-left text-white uppercase"
                          >
                            Subtotal
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-medium text-right text-white uppercase"
                          >
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 border-r-2 border-l-2 border-purple-900 dark:divide-gray-700">
                        {cart.map((item) => {
                          return (
                            <tr
                              key={item.id}
                              className="hover:bg-purple-100 dark:hover:bg-purple-700"
                            >
                              <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap dark:text-gray-200">
                                <div className="flex items-center gap-5">
                                  <div>
                                    {" "}
                                    <img
                                      className="w-[5rem] h-[5rem] object-contain"
                                      src={`https://localhost:7033/api/Product/GetImage/${item.image}`}
                                      alt=""
                                    />{" "}
                                  </div>
                                  <p>{item.title}</p>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap dark:text-gray-200">
                                <div className="flex items-center space-x-2">
                                  <button
                                    className="text-purple-500 hover:text-purple-700"
                                    style={{ fontSize: '1.2rem' }}
                                    onClick={() => handleMinusClick(item)}
                                  >
                                    -
                                  </button>
                                  <p className='mb-0' className="text-purple-500 hover:text-purple-700">{item.quantity}</p>
                                  <button
                                    className="text-purple-500 hover:text-purple-700"
                                    style={{ fontSize: '1.2rem' }}
                                    onClick={() => handlePlusClick(item)}
                                  >
                                    +
                                  </button>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-sm whitespace-nowrap text-purple-500 hover:text-purple-700">
                                ${item.salePrice}
                              </td>
                              <td className="px-6 py-4 text-sm whitespace-nowrap text-purple-500 hover:text-purple-700">
                                {item.discount}%
                              </td>
                              <td className="px-6 py-4 text-sm whitespace-nowrap text-purple-500 hover:text-purple-700">
                                ${parseInt(item.subtotal)}
                              </td>
                              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                <button
                                  className="text-purple-500 hover:text-purple-700"
                                  href="#"
                                  onClick={() => {
                                    deleteCartItem(item);
                                  }}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-4/12 px-4 mb-8">
            <Checkout isCartEmpty={isCartEmpty} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
