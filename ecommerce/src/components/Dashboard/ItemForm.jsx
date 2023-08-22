function ItemForm({
    show,
    onHide,
    item,
}) {
    return (
        <div>
            {show && (
                <div className="absolute inset-0 z-50 flex items-center justify-center">
                    <div className="modal-overlay absolute inset-0 bg-gray-900 opacity-50"></div>
                    <div className="modal-container bg-white w-5/6 md:max-w-3xl mx-auto rounded shadow-lg z-50 overflow-y-auto">
                        <div className="modal-content py-4 text-left px-6">
                            <div className="modal-header flex justify-between mb-4">
                                <h2 className="text-2xl font-semibold">
                                    Order Details
                                </h2>
                                <button
                                    className="modal-close-btn"
                                    onClick={onHide}
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
                            <div className="modal-body">
                                {item.additionalData && item.additionalData.length > 0 ? (
                                    <table className="table table-striped table-bordered table-hover" cellSpacing="0" width="100%">
                                        <thead>
                                            <tr>
                                                <th>Image</th>
                                                <th>Product</th>
                                                <th>Price</th>
                                                <th>Quantity</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {item.additionalData.map((dataRow, index) => (
                                                <tr key={index}>
                                                    <td><img
                                                        src={`https://localhost:7033/api/Product/GetImage/${dataRow.product.image}`}
                                                        alt={dataRow.product.name}
                                                        className="h-32 object-contain"
                                                    /></td>
                                                    <td>{dataRow.product.name}</td>
                                                    <td>{dataRow.price}</td>
                                                    <td>{dataRow.orderQuantity}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p>No additional data to display.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ItemForm;
