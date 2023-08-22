import axios from "axios";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Offcanvas = () => {
  const navigate = useNavigate();
  const ref = useRef(null)
  const { offCanvas, cart, checkoutTotal, sum } = useSelector(
    (state) => state.custom
  );
  const dispatch = useDispatch();

  const deleteCartItemoffcancas = (item) => {
    const filterArray = cart.filter((fil) => fil.id !== item.id);

    dispatch({ type: "setCarts", payload: filterArray });

    axios.delete(" http://localhost:3000/carts/" + item.id);
  };

  const handlefunction = () => {
    console.log("hello world");
    navigate("/landing/cart");

    dispatch({ type: "setOffcanvas", payload: false });

  };

  return (
    <>
      {offCanvas && (
        <div
          id="hs-overlay-example"
          className=" hs-overlay hs-overlay-open:translate-x-0 hidden translate-x-full fixed top-0 right-0 transition-all duration-300 transform h-full max-w-lg w-full z-[60] bg-white border-r dark:bg-gray-800 dark:border-gray-700 "
        >
          <div className="flex items-center justify-between px-4 py-3 border-b dark:border-gray-700">
            <h3 className="font-bold text-gray-800 dark:text-white">
              Shopping Cart
            </h3>
            <button
              type="button"
              className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-sm text-gray-500 rounded-md hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white dark:text-gray-500 dark:hover:text-gray-400 dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
              data-hs-overlay="#hs-overlay-example"
            >
              <span className="sr-only">Close modal</span>
              <svg
                className="w-5 h-5"
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>

          <div className="overflow-scroll h-[100vh]">
            {cart.map((item) => {
              return (
                <>
                  <div
                    key={item.id}
                    className="flex justify-between p-5 text-gray-600 hover:bg-gray-100"
                  >
                    <div>
                      <div>
                        <img src="" alt="" />
                      </div>
                      <div>
                        <p className="font-normal text-normal">
                          {item.title}
                        </p>
                        <p>
                          {item.quantity} x ${parseInt(item.subtotal)}
                        </p>
                      </div>
                    </div>
                    <div>
                      <button
                        className="px-8 py-2 text-white bg-purple-500 rounded-md"
                        onClick={() => {
                          deleteCartItemoffcancas(item);
                        }}
                      >
                        delete
                      </button>
                    </div>
                  </div>
                </>
              );
            })}
            <div className=" p-10 mb-10 w-[100%]">
              <div className="flex items-center justify-around py-5 font-semibold text-[1.5rem] text-gray-800 border-gray-300 border-y-2">
                <p>Subtotal</p>
                <p>${checkoutTotal}</p>
              </div>

              <div>
                <button
                  className="w-[100%] px-8 py-4 my-4 text-white bg-purple-500 rounded-md"
                >
                  <span onClick={handlefunction}>View Cart</span>
                </button>
              </div>
              <div>
                <button className="w-[100%] px-8 py-4 text-white bg-purple-500 rounded-md">
                  <Link to="/landing/checkout"> CheckOut</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Offcanvas;
