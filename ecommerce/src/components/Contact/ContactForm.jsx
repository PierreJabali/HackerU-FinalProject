import { useState } from 'react'
import axios from 'axios';


const ContactForm = () => {

  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    email: '',
    messages: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post('https://localhost:7033/api/Message/AddMessage', formData);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };
  return (
    <>
      <div className="max-w-[30rem]   px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="max-w-xl mx-auto">
          <div className="">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 lg:gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                  <div>
                    <label className="block text-sm text-gray-800 font-medium dark:text-gray"> Name</label>
                    <input type="text" name="name" id="hs-firstname-hire-us-2"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-800 font-medium dark:text-gr">Subject</label>
                    <input type="text" name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      id="hs-lastname-hire-us-2" className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-800 font-medium dark:text-white">Work Email</label>
                  <input type="email" name="email" id="hs-work-email-hire-us-2"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" />
                </div>
                <div>
                  <label className="block text-sm text-gray-800 font-medium dark:text-white">Details</label>
                  <textarea id="hs-about-hire-us-2"
                    value={formData.messages}
                    onChange={handleInputChange}
                    name="messages" rows="4" className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"></textarea>
                </div>
              </div>
              <div className="mt-6 grid">
                <button type="submit" className="inline-flex justify-center items-center gap-x-3 text-center bg-purple-900 hover:bg-purple-600 border border-transparent text-sm lg:text-base text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 dark:focus:ring-offset-gray-800">Send inquiry</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ContactForm