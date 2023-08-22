import { useState, useEffect, useRef } from 'react';
import Header from './Header';
import axios from 'axios';
import $ from 'jquery';
import 'datatables.net';
import 'react-toastify/dist/ReactToastify.css';
import ItemForm from './Product/ItemForm';
import Footer from './FooterD';
import Swal from 'sweetalert2';

function Products() {
    const tableRef = useRef();
    const [selectedItem, setSelectedItem] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const token = localStorage.getItem('token');
    const apiUrl = 'api/Product';

    axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : '';

    const handleItemClick = (item) => {
        setSelectedItem(item);
        setShowModal(true);
    };

    const handleFormClick = () => {
        setSelectedItem(null);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleItemAction = (itemData) => {
        const formData = new FormData();

        for (const key in itemData) {
            formData.append(key, itemData[key]);
        }

        axios.post(`${apiUrl}/UpsertProduct`, formData)
            .then(response => {
                if (response.status === 200) {
                    fetchData();
                    handleCloseModal();
                    if ('Id' in itemData && itemData.Id !== null) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Product Updated',
                            text: 'The product has been updated successfully.',
                            timer: 1500,
                            showConfirmButton: false,
                        });
                    } else {
                        Swal.fire({
                            icon: 'success',
                            title: 'Product Added',
                            text: 'The product has been added successfully.',
                            timer: 1500,
                            showConfirmButton: false,
                        });
                    }
                }
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: `${error}`,
                    timer: 1500,
                    showConfirmButton: false,
                });
            });
    };

    const handleItemDelete = (itemId) => {
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
                axios.delete(`${apiUrl}/DeleteProduct/${itemId}`)
                    .then(response => {
                        if (response.status === 200) {
                            fetchData();
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        });
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(`${apiUrl}/GetProducts`);

            const productsWithSerial = response.data.map((product, index) => {
                return {
                    ...product,
                    serialNumber: index + 1
                };
            });

            if ($.fn.DataTable.isDataTable(tableRef.current)) {
                const dataTable = $(tableRef.current).DataTable();
                dataTable.clear().rows.add(productsWithSerial).draw();
            } else {
                $(tableRef.current).DataTable({
                    data: productsWithSerial, // Use the modified data with serial numbers
                    columns: [
                        { data: "serialNumber" },
                        { data: "name" },
                        { data: "code" },
                        { data: "description" },
                        { data: "purchasePrice" },
                        { data: "salePrice" },
                        {
                            data: null,
                            render: data => (
                                `<img src="https://localhost:7033/api/Product/GetImage/${data.image}" alt="${data.name}" height="70" />`
                            )
                        },
                        {
                            data: null,
                            render: data => (
                                `<div style="display: flex;">
                                    <button class="bg-yellow-500 p-2 edit-button">Edit</button>&nbsp;
                                    <button class="bg-red-500 p-2 delete-button">Delete</button>
                                </div>`
                            ),
                            // Inside the createdCell callback
                            createdCell: (td, cellData, rowData) => {
                                const editButton = $(td).find(".edit-button");
                                const deleteButton = $(td).find(".delete-button");

                                editButton.on("click", () => {
                                    handleItemClick(rowData);
                                });

                                deleteButton.on("click", () => {
                                    handleItemDelete(rowData.id);
                                });

                                // Cleanup event listeners when the component unmounts
                                return () => {
                                    editButton.off("click");
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
            <div className="content-wrapper pt-20">
                <div className="page-content fade-in-up">
                    <div className="ibox">
                        <div className="ibox-head">
                            <div className="ibox-title">Products</div>
                            <div className='mb-2 mt-2'>
                                <ItemForm
                                    selectedItem={selectedItem}
                                    onUpdateItem={handleItemAction}
                                    onAddItem={handleItemAction}
                                    handleFormClick={handleFormClick}
                                    showModal={showModal}
                                    handleCloseModal={handleCloseModal}
                                />
                            </div>
                        </div>
                        <div className="ibox-body">
                            <table ref={tableRef} className="table table-striped table-bordered table-hover" cellSpacing="0" width="100%">
                                <thead>
                                    <tr>
                                        <th>Sr#</th>
                                        <th>Name</th>
                                        <th>Code</th>
                                        <th>Description</th>
                                        <th>Purchase Price</th>
                                        <th>Sale Price</th>
                                        <th>Image</th>
                                        <th>Actions</th>
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

export default Products;
