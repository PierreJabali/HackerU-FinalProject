import PaymentMethod from "./PaymentMethod";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Header from "../../Layout/Header";
import Footer from "../../Layout/Footer";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const dispatch = useDispatch();

  const token = localStorage.getItem('token');
  const apiUrl = 'api/Order';

  const navigate = useNavigate();

  axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : '';

  useEffect(() => {
    const getItem = localStorage.getItem("count");
    dispatch({ type: "setGetItem", payload: getItem });
  }, [dispatch]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    city: '',
    state: '',
    street: '',
    postalCode: '',
    phone: '',
    email: ''
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    city: '',
    state: '',
    street: '',
    postalCode: '',
    phone: '',
    email: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for any errors before submitting
    if (validateForm()) {

      try {

        const cartItems = JSON.parse(localStorage.getItem("cartItems"));

        if (cartItems && cartItems.length > 0) {

          const selectedProductsInfo = cartItems.map(item => ({
            CategoryId: item.categoryId,
            ProductId: item.id,
            PurchasePrice: item.purchasePrice,
            SalePrice: item.salePrice,
            Quantity: item.quantity,
            Subtotal: item.subtotal,
          }));

          let data = {
            User: formData,
            Cart: selectedProductsInfo
          }

          axios.post(`${apiUrl}/PlaceOrder`, data)
            .then(response => {
              if (response.status === 200) {
                Swal.fire({
                  icon: 'success',
                  title: 'Order Completed',
                  text: 'Your order has been successfully completed.',
                  timer: 1500,
                  showConfirmButton: false,
                });

                setFormData({
                  firstName: '',
                  lastName: '',
                  city: '',
                  state: '',
                  street: '',
                  postalCode: '',
                  phone: '',
                  email: ''
                });

                dispatch({ type: "clearCart" });

                navigate('/landing');
              }
            })
            .catch((error) => {
              toast.error(`Error: ${error}`);
            });
        }
      } catch (error) {
        console.error('Error sending form data:', error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let error = '';

    if (name === 'firstName' && value.trim() === '') {
      error = 'First name is required';
    }
    if (name === 'lastName' && value.trim() === '') {
      error = 'Last name is required';
    }
    if (name === 'city' && value.trim() === '') {
      error = 'City is required';
    }
    if (name === 'state' && value.trim() === '') {
      error = 'State is required';
    }
    if (name === 'street' && value.trim() === '') {
      error = 'Street address is required';
    }
    if (name === 'postalCode' && value.trim() === '') {
      error = 'Postal code is required';
    } else if (name === 'postalCode' && !/^\d+$/.test(value)) {
      error = 'Postal code must be a number';
    }
    if (name === 'phone' && value.trim() === '') {
      error = 'Phone number is required';
    } else if (name === 'phone' && !/^\d+$/.test(value)) {
      error = 'Phone number must be a number';
    }
    if (name === 'email' && value.trim() === '') {
      error = 'Email address is required';
    } else if (name === 'email' && !isValidEmail(value)) {
      error = 'Invalid email format';
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.firstName.trim() === '') {
      newErrors.firstName = 'First name is required';
    }
    if (formData.lastName.trim() === '') {
      newErrors.lastName = 'Last name is required';
    }
    if (formData.city.trim() === '') {
      newErrors.city = 'City is required';
    }
    if (formData.state.trim() === '') {
      newErrors.state = 'State is required';
    }
    if (formData.street.trim() === '') {
      newErrors.street = 'Street address is required';
    }
    if (formData.postalCode.trim() === '') {
      newErrors.postalCode = 'Postal code is required';
    } else if (!/^\d+$/.test(formData.postalCode)) {
      newErrors.postalCode = 'Postal code must be a number';
    }
    if (formData.phone.trim() === '') {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d+$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be a number';
    }
    if (formData.email.trim() === '') {
      newErrors.email = 'Email address is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidEmail = (email) => {
    // Basic email validation regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <>
      <Header />
      <div className="bg-purple-100 w-[100%]">
        <div className="flex flex-col lg:flex-row w-[80%] mx-auto px-5 py-40 lg:flex lg:justify-between gap-5 ">
          <div className="bg-purple-200 w-[100%] lg:w-[60%] flex justify-center">
            <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
              <div className="max-w-xl mx-auto">
                <div className="text-center">
                  <h1 className="text-3xl font-bold sm:text-4xl text-purple-500 hover:text-purple-700">
                    Billing Details
                  </h1>
                </div>

                <div className="mt-12 w-[35rem]">
                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 lg:gap-6">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
                        <div>
                          <label
                            htmlFor="hs-firstname-hire-us-2"
                            className="block text-sm font-medium text-purple-500 hover:text-purple-700"
                          >
                            First Name
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            id="hs-firstname-hire-us-2"
                            value={formData.firstName}
                            onChange={handleChange}
                            className={`block w-full px-4 py-3 text-sm border-gray-200 rounded-md focus:border-purple-500 focus:ring-purple-500 ${errors.firstName ? 'border-red-500' : ''
                              } dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400`}
                          />
                          {errors.firstName && (
                            <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>)}
                        </div>

                        <div>
                          <label
                            htmlFor="hs-lastname-hire-us-2"
                            className="block text-sm font-medium text-purple-500 hover:text-purple-700"
                          >
                            Last Name
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            id="hs-lastname-hire-us-2"
                            value={formData.lastName}
                            onChange={handleChange}
                            className={`block w-full px-4 py-3 text-sm border-gray-200 rounded-md focus:border-purple-500 focus:ring-purple-500 ${errors.lastName ? 'border-red-500' : ''
                              } dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400`}
                          />
                          {errors.lastName && (
                            <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
                        <div>
                          <label
                            htmlFor="hs-work-email-hire-us-2"
                            className="block text-sm font-medium text-purple-500 hover:text-purple-700"
                          >
                            Town/City
                          </label>
                          <input
                            type="text"
                            name="city"
                            id="hs-work-email-hire-us-2"
                            value={formData.city}
                            onChange={handleChange}
                            className={`block w-full px-4 py-3 text-sm border-gray-200 rounded-md focus:border-purple-500 focus:ring-purple-500 ${errors.city ? 'border-red-500' : ''
                              } dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400`}
                          />
                          {errors.city && (
                            <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                          )}
                        </div>
                        <div>
                          <label
                            htmlFor="hs-work-email-hire-us-2"
                            className="block text-sm font-medium text-purple-500 hover:text-purple-700"
                          >
                            State/Country
                          </label>
                          <input
                            type="text"
                            name="state"
                            id="hs-work-email-hire-us-2"
                            value={formData.state}
                            onChange={handleChange}
                            className={`block w-full px-4 py-3 text-sm border-gray-200 rounded-md focus:border-purple-500 focus:ring-purple-500 ${errors.state ? 'border-red-500' : ''
                              } dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400`}
                          />
                          {errors.state && (
                            <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
                        <div>
                          <label
                            htmlFor="street-input"
                            className="block text-sm font-medium text-purple-500 hover:text-purple-700"
                          >
                            Street Address
                          </label>
                          <input
                            type="text"
                            name="street"
                            id="street-input"
                            value={formData.street}
                            onChange={handleChange}
                            className={`block w-full px-4 py-3 text-sm border-gray-200 rounded-md focus:border-purple-500 focus:ring-purple-500 ${errors.street ? 'border-red-500' : ''
                              } dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400`}
                          />
                          {errors.street && (
                            <p className="text-red-500 text-sm mt-1">{errors.street}</p>
                          )}
                        </div>
                        <div>
                          <label
                            htmlFor="postalCode-input"
                            className="block text-sm font-medium text-purple-500 hover:text-purple-700"
                          >
                            Postcode Zip
                          </label>
                          <input
                            type="number"
                            name="postalCode"
                            id="postalCode-input"
                            value={formData.postalCode}
                            onChange={handleChange}
                            className={`block w-full px-4 py-3 text-sm border-gray-200 rounded-md focus:border-purple-500 focus:ring-purple-500 ${errors.postalCode ? 'border-red-500' : ''
                              } dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400`}
                          />
                          {errors.postalCode && (
                            <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
                        <div>
                          <label
                            htmlFor="hs-company-hire-us-2"
                            className="block text-sm font-medium text-purple-500 hover:text-purple-700"
                          >
                            Phone
                          </label>
                          <input
                            type="number"
                            name="phone"
                            id="hs-company-hire-us-2"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`block w-full px-4 py-3 text-sm border-gray-200 rounded-md focus:border-purple-500 focus:ring-purple-500 ${errors.phone ? 'border-red-500' : ''
                              } dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400`}
                          />
                          {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                          )}
                        </div>
                        <div>
                          <label
                            htmlFor="hs-company-website-hire-us-2"
                            className="block text-sm font-medium text-purple-500 hover:text-purple-700"
                          >
                            Email Address
                          </label>
                          <input
                            type="email"
                            name="email"
                            id="hs-company-website-hire-us-2"
                            value={formData.email}
                            onChange={handleChange}
                            className={`block w-full px-4 py-3 text-sm border-gray-200 rounded-md focus:border-purple-500 focus:ring-purple-500 ${errors.email ? 'border-red-500' : ''
                              } dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400`}
                          />
                          {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                          )}
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="hs-about-hire-us-2"
                          className="block text-sm font-medium text-purple-500 hover:text-purple-700"
                        >
                          Additional Information
                        </label>
                        <textarea
                          id="hs-about-hire-us-2"
                          name="hs-about-hire-us-2"
                          rows="4"
                          className="block w-full px-4 py-3 text-sm border-gray-200 rounded-md focus:border-purple-500 focus:ring-purple-500 dark:border-gray-700 dark:text-gray-400"
                        ></textarea>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[100%] h-[100%] lg:w-[50%] bg-purple-400">
            <div className="mt-16">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-white sm:text-4xl dark:text-white">
                  Your Order
                </h1>
              </div>
              <div>
                <div className="flex flex-col p-10 pt-10">
                  <div className="-m-1.5 overflow-x-hidden">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                      <div className="overflow-hidden">
                        <PaymentMethod />
                      </div>
                      <div className='w-[70%] mx-auto mt-28 ml-[5rem]'>
                        <button className='bg-purple-800 text-center  px-[6rem] py-[0.7rem] text-[0.8rem] text-white'
                          onClick={handleSubmit}>Place Order</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;
