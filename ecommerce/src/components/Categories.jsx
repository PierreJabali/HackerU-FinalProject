import { useState, useEffect, useRef } from 'react';
import Header from './Header';
import axios from 'axios';
import $ from 'jquery';
import 'datatables.net';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './FooterD';
import ItemForm from './Category/ItemForm';
import {FaTrashAlt, FaPenAlt } from "react-icons/fa";

function Categories() {
    const tableRef = useRef();
    const [selectedItem, setSelectedItem] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const token = localStorage.getItem('token');
    const apiUrl = 'api/Category';

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

        axios.post(`${apiUrl}/AddCategory`, formData)
            .then(response => {
                if (response.status === 200) {
                    fetchData();
                    handleCloseModal();
                    if ('Id' in itemData && itemData.Id !== null) {
                        toast.success('Category updated successfully!');
                    } else {
                        toast.success('Category added successfully!');
                    }
                }
            })
            .catch((error) => {
                toast.error(`Error: ${error}`);
            });
    };

    const handleItemDelete = (itemId) => {
        axios.delete(`${apiUrl}/DeleteCategory/${itemId}`)
            .then(response => {
                if (response.status === 200) {
                    fetchData();
                }
            })
            .catch((error) => {
                toast.error(`Error: ${error}`);
            });
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(`${apiUrl}/GetCategory`);

            const categoriesWithSerial = response.data.map((category, index) => {
                return {
                    ...category,
                    serialNumber: index + 1
                };
            });

            if ($.fn.DataTable.isDataTable(tableRef.current)) {
                const dataTable = $(tableRef.current).DataTable();
                dataTable.clear().rows.add(categoriesWithSerial).draw();
            } else {
                $(tableRef.current).DataTable({
                    data: categoriesWithSerial, // Use the modified data with serial numbers
                    columns: [
                        { data: "serialNumber" },
                        { data: "name" },
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
                                    if (window.confirm('Are You Sure To Delete Data ??')) {
                                        handleItemDelete(rowData.id);
                                    }
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
                            <div className="ibox-title">Categories</div>
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

export default Categories;
