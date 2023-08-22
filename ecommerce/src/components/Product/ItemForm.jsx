import { useState, useEffect } from 'react';
import { Modal, Button, ModalFooter } from 'react-bootstrap';
import axios from 'axios';

function ItemForm({
    selectedItem,
    onUpdateItem,
    onAddItem,
    handleFormClick,
    showModal,
    handleCloseModal,
}) {
    const [productId, setProductId] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [purchasePrice, setPurchasePrice] = useState('');
    const [salePrice, setSalePrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [discount, setDiscount] = useState('');
    const [image, setImageFile] = useState(null);
    const [categories, setCategories] = useState([]);
    const [isNewImageSelected, setIsNewImageSelected] = useState(false);
    const [previousImage, setPreviousImage] = useState('');
    const [newImageUrl, setNewImageUrl] = useState('');

    const handleImageChange = (e) => {
        const newImage = e.target.files[0];
        setImageFile(newImage);
        setIsNewImageSelected(true);
        setNewImageUrl(URL.createObjectURL(newImage));
    };

    const [validationErrors, setValidationErrors] = useState({
        categoryId: '',
        code: '',
        name: '',
        description: '',
        purchasePrice: '',
        salePrice: '',
        quantity: '',
        discount: '',
        image: '',
    });

    const apiUrl = 'api/Product';

    useEffect(() => {
        axios.get(`${apiUrl}/GetCategories`)
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        if (selectedItem) {
            setProductId(selectedItem.id);
            setCategoryId(selectedItem.categoryId);
            setCode(selectedItem.code);
            setName(selectedItem.name);
            setDescription(selectedItem.description);
            setPurchasePrice(selectedItem.purchasePrice);
            setSalePrice(selectedItem.salePrice);
            setQuantity(selectedItem.quantity);
            setDiscount(selectedItem.discount);
            setImageFile(selectedItem.image || ''); // Set existing image URL or an empty string
            setPreviousImage(selectedItem.image || ''); // Set the previous image URL
        } else {
            setProductId('');
            setCategoryId('');
            setCode('');
            setName('');
            setDescription('');
            setPurchasePrice('');
            setSalePrice('');
            setQuantity('');
            setDiscount('');
            setImageFile('');
            setPreviousImage('');
        }
    }, [selectedItem]);

    const handleSubmit = (isUpdating) => {
        if (validateForm()) {

            const formData = {
                'CategoryId': categoryId,
                'Code': code,
                'Name': name,
                'Description': description,
                'PurchasePrice': purchasePrice,
                'SalePrice': salePrice,
                'Quantity': quantity,
                'Discount': discount,
                'Profile': image
            }

            if (isUpdating) {
                formData.Id = productId;
                formData.Image = previousImage ?? '';
                onUpdateItem(formData);
            } else {
                onAddItem(formData);
            }

            handleCloseModal();
        }
    };

    const validateForm = () => {
        const errors = {
            categoryId: '',
            code: '',
            name: '',
            purchasePrice: '',
            salePrice: '',
            quantity: '',
        };

        let isValid = true;

        // Example validation:
        if (!categoryId) {
            errors.categoryId = 'Category is required.';
            isValid = false;
        }

        if (!code) {
            errors.code = 'Code is required.';
            isValid = false;
        }

        if (!name) {
            errors.name = 'Name is required.';
            isValid = false;
        }

        if (!purchasePrice) {
            errors.purchasePrice = 'Purchase price is required.';
            isValid = false;
        }

        if (!salePrice) {
            errors.salePrice = 'Sale price is required.';
            isValid = false;
        }

        if (!quantity) {
            errors.quantity = 'Quantity is required.';
            isValid = false;
        }

        setValidationErrors(errors);
        return isValid;
    };

    return (
        <div>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleFormClick}
            >
                Add
            </button>
            {showModal && (
                <div className="absolute inset-0 z-50 flex items-center justify-center">
                    <div className="modal-overlay absolute inset-0 bg-gray-900 opacity-50"></div>
                    <div className="modal-container bg-white w-5/6 md:max-w-3xl mx-auto rounded shadow-lg z-50 overflow-y-auto">
                        <div className="modal-content py-4 text-left px-6">
                            <div className="modal-header flex justify-between mb-4">
                                <h2 className="text-2xl font-semibold">
                                    {selectedItem ? 'Update' : 'Add'} Product
                                </h2>
                                <button
                                    className="modal-close-btn"
                                    onClick={handleCloseModal}
                                >
                                    <svg
                                        className="fill-current text-black"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="18"
                                        viewBox="0 0 18 18"
                                    >
                                        <path
                                            d="M18 1.5L16.5 0 9 7.5 1.5 0 0 1.5 7.5 9 0 16.5 1.5 18 9 10.5 16.5 18 18 16.5 10.5 9z"
                                        ></path>
                                    </svg>
                                </button>
                            </div>
                            <form>
                                <div className="modal-body">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                                        <div className="col-span-1">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Select Category
                                            </label>
                                            <select
                                                className={`form-control h-12 mt-1 block w-full border ${validationErrors.categoryId ? 'border-red-500' : 'border-gray-300'
                                                    } rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-300`}
                                                value={categoryId}
                                                onChange={(e) => setCategoryId(e.target.value)}
                                            >
                                                <option value="">Select Category</option>
                                                {categories.map((category) => (
                                                    <option key={category.id} value={category.id}>
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </select>
                                            {validationErrors.categoryId && (
                                                <p className="mt-2 text-sm text-red-500">
                                                    {validationErrors.categoryId}
                                                </p>
                                            )}
                                        </div>
                                        <div className="col-span-1">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Product Code
                                            </label>
                                            <input
                                                type="text"
                                                className={`mt-1 block w-full border ${validationErrors.code ? 'border-red-500' : 'border-gray-300'
                                                    } rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-300`}
                                                placeholder="Code"
                                                value={code}
                                                onChange={(e) => setCode(e.target.value)}
                                            />
                                            {validationErrors.code && (
                                                <p className="mt-2 text-sm text-red-500">
                                                    {validationErrors.code}
                                                </p>
                                            )}
                                        </div>
                                        <div className="col-span-1">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Product Name
                                            </label>
                                            <input
                                                type="text"
                                                className={`mt-1 block w-full border ${validationErrors.name ? 'border-red-500' : 'border-gray-300'
                                                    } rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-300`}
                                                placeholder="Name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                            {validationErrors.name && (
                                                <p className="mt-2 text-sm text-red-500">
                                                    {validationErrors.name}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                                        <div className="col-span-1">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Purchase Price
                                            </label>
                                            <input
                                                type="number"
                                                step="any"
                                                className={`mt-1 block w-full border ${validationErrors.purchasePrice ? 'border-red-500' : 'border-gray-300'
                                                    } rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-300`}
                                                placeholder="Purchase Price"
                                                value={purchasePrice}
                                                onChange={(e) => setPurchasePrice(e.target.value)}
                                            />
                                            {validationErrors.purchasePrice && (
                                                <p className="mt-2 text-sm text-red-500">
                                                    {validationErrors.purchasePrice}
                                                </p>
                                            )}
                                        </div>
                                        <div className="col-span-1">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Sale Price
                                            </label>
                                            <input
                                                type="number"
                                                step="any"
                                                className={`mt-1 block w-full border ${validationErrors.salePrice ? 'border-red-500' : 'border-gray-300'
                                                    } rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-300`}
                                                placeholder="Sale Price"
                                                value={salePrice}
                                                onChange={(e) => setSalePrice(e.target.value)}
                                            />
                                            {validationErrors.salePrice && (
                                                <p className="mt-2 text-sm text-red-500">
                                                    {validationErrors.salePrice}
                                                </p>
                                            )}
                                        </div>
                                        <div className="col-span-1">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Product Quantity
                                            </label>
                                            <input
                                                type="number"
                                                className={`mt-1 block w-full border ${validationErrors.quantity ? 'border-red-500' : 'border-gray-300'
                                                    } rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-300`}
                                                placeholder="Quantity"
                                                value={quantity}
                                                onChange={(e) => setQuantity(e.target.value)}
                                            />
                                            {validationErrors.quantity && (
                                                <p className="mt-2 text-sm text-red-500">
                                                    {validationErrors.quantity}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                                        <div className="col-span-1">
                                            <label className="block text-sm font-medium text-gray-700">Discount</label>
                                            <input
                                                type="number"
                                                step="any"
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                                                placeholder="Discount"
                                                value={discount}
                                                onChange={(e) => setDiscount(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <label className="block text-sm font-medium text-gray-700">Image</label>
                                            <input
                                                type="file"
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-center mt-4">
                                        {isNewImageSelected ? (
                                            <img
                                                src={newImageUrl}
                                                alt={name}
                                                className="h-32 mx-auto object-contain"
                                            />
                                        ) : (
                                            <img
                                                src={`https://localhost:7033/api/Product/GetImage/${previousImage}`}
                                                alt={name}
                                                className="h-32 mx-auto object-contain"
                                            />
                                        )}
                                    </div>
                                    <div className="mt-4 mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Description</label>
                                        <textarea
                                            rows={3}
                                            cols={50}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                                            placeholder="Description"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer flex justify-center">
                                    <button
                                        className="bg-gray-500 text-white px-4 py-2 rounded"
                                        onClick={handleCloseModal}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
                                        onClick={() => handleSubmit(!!selectedItem)}
                                    >
                                        {selectedItem ? 'Update' : 'Add'}
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ItemForm;
