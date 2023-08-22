import React, { useState, useEffect } from 'react';

function ItemForm({
    selectedItem,
    onUpdateItem,
    onAddItem,
    handleFormClick,
    showModal,
    handleCloseModal,
}) {
    const [categoryId, setCategoryId] = useState('');
    const [name, setName] = useState('');

    const [validationErrors, setValidationErrors] = useState({
        name: '',
    });

    useEffect(() => {
        if (selectedItem) {
            setCategoryId(selectedItem.categoryId);
            setName(selectedItem.name);
        } else {
            setCategoryId('');
            setName('');
        }
    }, [selectedItem]);

    const handleSubmit = (isUpdating) => {
        if (validateForm()) {
            const formData = {
                'Name': name
            }

            if (isUpdating) {
                formData.Id = categoryId;
                onUpdateItem(formData);
            } else {
                onAddItem(formData);
            }

            handleCloseModal();
        }
    };

    const validateForm = () => {
        const errors = {
            name: '',
        };

        let isValid = true;

        if (!name) {
            errors.name = 'Name is required.';
            isValid = false;
        }

        setValidationErrors(errors);
        return isValid;
    };

    return (
        <div className='pt-5'>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleFormClick}>
                Add Category
            </button>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-10">
                    <div className="bg-white w-full md:max-w-md p-6 rounded-md shadow-lg">
                        <button
                            className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
                            onClick={handleCloseModal}
                        >
                            Close
                        </button>
                        <h2 className="text-xl font-semibold mb-4">
                            {selectedItem ? 'Update' : ''} Category
                        </h2>
                        <form>
                            <div className='mb-4'>
                                <label className='block text-gray-600'>Category Name</label>
                                <input
                                    type="text"
                                    className={`form-input w-full ${validationErrors.name ? 'border-red-500' : ''}`}
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                {validationErrors.name && (
                                    <p className="text-red-500 text-sm mt-1">{validationErrors.name}</p>
                                )}
                            </div>
                            <div className="flex justify-end">
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                                    onClick={() => handleSubmit(!!selectedItem)}
                                >
                                    {selectedItem ? 'Update' : 'Add'}
                                </button>
                                <button
                                    className="bg-gray-300 text-gray-600 px-4 py-2 rounded-md"
                                    onClick={handleCloseModal}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ItemForm;
