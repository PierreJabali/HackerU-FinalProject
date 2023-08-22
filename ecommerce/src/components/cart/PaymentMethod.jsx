import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const PaymentMethod = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.custom.cart); // Retrieve cart from the Redux store
  const checkoutTotal = useSelector((state) => state.custom.checkoutTotal);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    dispatch({ type: 'setCart', payload: storedCart });
  }, [dispatch]);

  return (
    <>
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
        <thead>
          <tr>
            <th
              scope="col"
              className="pr-16 py-3 text-center text-[1.3rem] text-purple-100 uppercase"
            >
              Product
            </th>
            <th
              scope="col"
              className="py-3 text-[1.3rem] text-center text-purple-100 uppercase"
            >
              SubTotal
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {cart.map((item) => {
            return (
              <tr key={item.id}>
                <td className="py-4 pr-16 text-sm font-medium text-center text-gray-800 whitespace-nowrap dark:text-gray-200">
                  {item.title} x {item.quantity}
                </td>
                <td className="px-6 py-4 text-sm text-center text-gray-800 whitespace-nowrap dark:text-gray-200">
                  ${parseInt(item.subtotal)}
                </td>
              </tr>
            );
          })}
          <tr>
            <td className="pt-10 pb-4 pr-16 text-sm font-bold text-center text-purple-900 whitespace-nowrap dark:text-gray-200">
              Subtotal
            </td>
            <td className="px-6 py-4 text-sm font-bold text-center text-purple-200 whitespace-nowrap dark:text-gray-200">
              ${checkoutTotal}
            </td>
          </tr>
          <tr>
            <td className="py-4 pr-16 text-sm font-bold text-center text-purple-900 whitespace-nowrap dark:text-gray-200">
              Total
            </td>
            <td className="px-6 py-4 text-sm font-bold text-center text-purple-200 whitespace-nowrap dark:text-gray-200">
              ${checkoutTotal}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default PaymentMethod;
