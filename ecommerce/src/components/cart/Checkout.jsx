import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Checkout = ({ isCartEmpty }) => {
  const { checkoutTotal } = useSelector(state => state.custom)
  return (
    <>
      <div className="w-[100%] mx-auto flex justify-center ">

        <div className=" w-[100%] lg:w-[90%] bg-purple-100 ">
          <div>
            <h1 className="text-[1.5rem] py-2 text-gray-600 font-extrabold text-center border-b-2 border-t-2 border-purple-900">Checkout</h1>
          </div>
          <div className="flex items-center justify-around py-2 border-b-2 border-purple-300">
            <p>Subtotal</p>
            <p>${checkoutTotal}</p>
          </div>
          <div className="flex items-center justify-around py-3 border-b-2 border-purple-300">
            <p>Total</p>
            <p>${checkoutTotal}</p>
          </div>
          <div className="my-2 text-center">
            {!isCartEmpty && (
              <button className="checkOut-btn px-6 py-3 text-white bg-purple-900 text-[1rem]" disabled={isCartEmpty}>
                <Link to="/landing/checkout" className="text-white no-underline">Checkout</Link>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
