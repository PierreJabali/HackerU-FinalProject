import { useEffect, useRef } from 'react';
import Header from './Header';
import axios from 'axios';
import $ from "jquery";
import 'datatables.net';
import Footer from './FooterD';

function Customers() {
    const tableRef = useRef();

    const token = localStorage.getItem('token');
    const apiUrl = 'api/Customer';

    axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : '';

    const handleItemDelete = (itemId) => {
        axios.delete(`${apiUrl}/DeleteCustomer/${itemId}`)
            .then(response => {
                if (response.status === 200) {
                    fetchData();
                }
            })
            .catch(error => console.error('Error:', error));
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(`${apiUrl}/GetCustomers`);

            const customersWithSerial = response.data.map((customer, index) => {
                return {
                    ...customer,
                    serialNumber: index + 1
                };
            });

            if ($.fn.DataTable.isDataTable(tableRef.current)) {
                const dataTable = $(tableRef.current).DataTable();
                dataTable.clear().rows.add(customersWithSerial).draw();
            } else {
                $(tableRef.current).DataTable({
                    data: customersWithSerial, // Use the modified data with serial numbers
                    columns: [
                        { data: "serialNumber" },
                        {
                            data: null,
                            render: data => (
                                data.firstName + ' ' + data.lastName
                            )
                        },
                        { data: "role" },
                        { data: "email" },
                        { data: "phoneNumber" },
                        { data: "address" },
                        { data: "country" },
                        {
                            data: null,
                            render: data => (
                                `<img src="https://localhost:7033/api/Customer/GetImage/${data.image}" alt="${data.firstName + ' ' + data.lastName}" height="70" />`
                            )
                        },
                        {
                            data: null,
                            render: data => (
                                `<div style="display: flex;">
                                    <button class="bg-red-500 p-2 delete-button">Delete</button>
                                </div>`
                            ),
                            // Inside the createdCell callback
                            createdCell: (td, cellData, rowData) => {
                                const deleteButton = $(td).find(".delete-button");

                                deleteButton.on("click", () => {
                                    if (window.confirm('Are You Sure To Delete Data ??')) {
                                        handleItemDelete(rowData.id);
                                    }
                                });

                                // Cleanup event listeners when the component unmounts
                                return () => {
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
            <div className="content-wrapper pt-28">
                <div className="page-content fade-in-up">
                    <div className="ibox">
                        <div className="ibox-head">
                            <div className="ibox-title">Customers</div>
                        </div>
                        <div className="ibox-body">
                            <table ref={tableRef} className="table table-striped table-bordered table-hover" cellSpacing="0" width="100%">
                                <thead>
                                    <tr>
                                        <th>Sr#</th>
                                        <th>Name</th>
                                        <th>Role</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Address</th>
                                        <th>Country</th>
                                        <th>Image</th>
                                        <th><i className='fa fa-cogs'></i></th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default Customers;
