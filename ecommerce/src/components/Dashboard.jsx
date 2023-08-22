import { useEffect, useRef } from 'react';
import Header from './Header';
import axios from 'axios';
import $ from "jquery";
import 'datatables.net';
import Footer from './FooterD';
import Swal from 'sweetalert2';
import ItemForm from './Dashboard/ItemForm';
import { useState } from 'react';

function Dashboard() {
  const tableRef = useRef();
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem('token');
  const apiUrl = 'api/Order';

  axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : '';

  const handleItemClick = async (item) => {
    try {
      // Fetch additional data using axios
      const response = await axios.get(`${apiUrl}/GetOrderById/${item}`);

      // Pass the data to the modal component
      setSelectedItem({ ...item, additionalData: response.data });
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAccept = async (orderId) => {
    const result = await Swal.fire({
      title: 'Accept Order',
      text: 'Are you sure you want to accept this order?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, accept it!',
      cancelButtonText: 'No, keep it'
    });

    if (result.isConfirmed) {
      try {
        await axios.post(`${apiUrl}/${orderId}/accept`);
        Swal.fire('Confirmed!', 'The order has been accepted.', 'success');
        fetchData();
      } catch (error) {
        Swal.fire('Error!', 'An error occurred while accepting the order.', 'error');
      }
    }
  };

  const handleCancel = async (orderId) => {
    const result = await Swal.fire({
      title: 'Cancel Order',
      text: 'Are you sure you want to cancel this order?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No, keep it'
    });

    if (result.isConfirmed) {
      try {
        await axios.post(`${apiUrl}/${orderId}/cancel`);
        Swal.fire('Canceled!', 'The order has been canceled.', 'success');
        fetchData();
      } catch (error) {
        Swal.fire('Error!', 'An error occurred while canceling the order.', 'error');
      }
    }
  };

  const handleDelete = async (orderId) => {
    const result = await Swal.fire({
      title: 'Delete Order',
      text: 'Are you sure you want to delete this order?',
      icon: 'danger',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No, keep it'
    });

    if (result.isConfirmed) {
      try {
        await axios.post(`${apiUrl}/${orderId}/delete`);
        Swal.fire('Deleted!', 'The order has been deleted.', 'success');
        fetchData();
      } catch (error) {
        Swal.fire('Error!', 'An error occurred while deleting the order.', 'error');
      }
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/GetAllOrders`);

      const ordersWithSerial = response.data.map((customer, index) => {
        return {
          ...customer,
          serialNumber: index + 1
        };
      });

      if ($.fn.DataTable.isDataTable(tableRef.current)) {
        const dataTable = $(tableRef.current).DataTable();
        dataTable.clear().rows.add(ordersWithSerial).draw();
      } else {
        $(tableRef.current).DataTable({
          data: ordersWithSerial, // Use the modified data with serial numbers
          columns: [
            { data: "orderNo" },
            {
              data: null,
              render: data => (
                data.fullName
              )
            },
            { data: "orderDate" },
            { data: "status" },
            { data: "payment_Mode" },
            { data: "totalAmount" },
            { data: "postalCode" },
            {
              data: null,
              render: data => {
                const { status } = data;
                let buttonsHtml = '<div style="display: flex;"><button class="bg-blue-500 p-2 view-button">View</button>&nbsp;&nbsp;';

                if (status === "Pending") {
                  buttonsHtml += `
                    <button class="bg-green-500 p-2 accept-button">Accept</button>&nbsp;&nbsp;`;
                } else if (status === "Canceled") {
                  buttonsHtml += `<button class="bg-red-500 p-2 delete-button">Delete</button>&nbsp;&nbsp;`;
                }

                if (status !== "Canceled") {
                  buttonsHtml += '<button class="bg-orange-500 p-2 cancel-button">Cancel</button></div>';
                }
                return buttonsHtml;
              },
              createdCell: (td, cellData, rowData) => {
                const viewButton = $(td).find(".view-button");
                const acceptButton = $(td).find(".accept-button");
                const cancelButton = $(td).find(".cancel-button");
                const deleteButton = $(td).find(".delete-button");

                viewButton.on("click", () => {
                  handleItemClick(rowData.orderId);
                });

                acceptButton.on("click", () => {
                  handleAccept(rowData.orderId);
                });

                cancelButton.on("click", () => {
                  handleCancel(rowData.orderId);
                });

                deleteButton.on("click", () => {
                  handleDelete(rowData.orderId);
                });

                // Cleanup event listeners when the component unmounts
                return () => {
                  viewButton.off("click");
                  acceptButton.off("click");
                  cancelButton.off("click");
                  deleteButton.off("click");
                };
              }
            },
          ]
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();

    return () => {
      const dataTable = $(tableRef.current).DataTable();
      dataTable.destroy();
    };
  }, []);

  return (
    <div>
      <Header />
      <div className="content-wrapper pt-10">
        <div className="page-content fade-in-up">
          <div className="row pt-20">
            <div className="col-lg-12">
              <div className="ibox">
                <div className="ibox-head">
                  <div className="ibox-title">Latest Orders</div>
                  <div className="ibox-tools relative">
                    <a className="ibox-collapse cursor-pointer"><i className="fa fa-minus"></i></a>
                    <button className="dropdown-toggle ml-2 focus:outline-none" onClick={(e) => e.currentTarget.nextElementSibling.classList.toggle('hidden')}>
                      <i className="fa fa-ellipsis-v"></i>
                    </button>
                    <div className="dropdown-menu dropdown-menu-right absolute hidden mt-2 w-40 py-2 bg-white border rounded shadow-lg">
                      <a className="block px-4 py-2 text-gray-800 hover:bg-gray-100" href="#">Option 1</a>
                      <a className="block px-4 py-2 text-gray-800 hover:bg-gray-100" href="#">Option 2</a>
                    </div>
                  </div>
                </div>
                <div className="ibox-head">
                  <div className="ibox-title">Products</div>
                  <div className='mb-2 mt-2'>
                    <ItemForm show={showModal} onHide={handleCloseModal} item={selectedItem} />
                  </div>
                </div>
                <div className="ibox-body">
                  <table ref={tableRef} className="min-w-full table table-striped table-hover" cellSpacing="0" width="100%">
                    <thead className='py-1'>
                      <tr>
                        <th>Order No</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Payment</th>
                        <th>Amount</th>
                        <th>Postal Code</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Dashboard;