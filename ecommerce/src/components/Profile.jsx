import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import { Button } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './FooterD';
import Swal from 'sweetalert2';

function Profile() {
    const userData = JSON.parse(localStorage.getItem('user'));

    const [user, setUser] = useState(userData);
    const [validationErrors, setValidationErrors] = useState({});
    const [image, setImageFile] = useState(null);
    const [isNewImageSelected, setIsNewImageSelected] = useState(false);
    const [previousImage, setPreviousImage] = useState('');
    const [newImageUrl, setNewImageUrl] = useState('');

    const handleImageChange = (e) => {
        const newImage = e.target.files[0];
        setImageFile(newImage);
        setIsNewImageSelected(true);
        setNewImageUrl(URL.createObjectURL(newImage));
    };

    const token = localStorage.getItem('token');
    const apiUrl = 'api/Settings';

    axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : '';

    const handleSubmit = () => {
        if (validateForm()) {

            const formData = {
                'FirstName': user.firstName,
                'LastName': user.lastName,
                'Email': user.email,
                'PostalCode': user.postalCode,
                'PhoneNumber': user.phoneNumber,
                'Country': user.country,
                'State': user.state,
                'Address': user.address,
                'Image': previousImage,
                'Picture': image
            };

            handleItemAction(formData);
        }
    };

    const handleItemAction = (itemData) => {
        const formData = new FormData();

        for (const key in itemData) {
            formData.append(key, itemData[key]);
        }

        axios.post(`${apiUrl}/UpdateProfile`, formData)
            .then(response => {
                if (response.status === 200) {
                    const updatedUserData = { ...userData, ...response.data };
                    localStorage.setItem('user', JSON.stringify(updatedUserData));
                    setUser(updatedUserData);
                    Swal.fire({
                        icon: 'success',
                        title: 'Profile Updated',
                        text: 'The profile has been updated successfully.',
                        timer: 1500,
                        showConfirmButton: false,
                    });
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

    const validateForm = () => {
        const errors = {
            email: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            country: '',
            address: '',
            state: '',
            postalCode: '',
        };

        let isValid = true;

        if (!user.email) {
            errors.email = 'Email is required.';
            isValid = false;
        }

        if (!user.firstName) {
            errors.firstName = 'First Name is required.';
            isValid = false;
        }

        if (!user.lastName) {
            errors.lastName = 'Last Name is required.';
            isValid = false;
        }

        if (!user.phoneNumber) {
            errors.phoneNumber = 'Phone Number is required.';
            isValid = false;
        }

        if (!user.country) {
            errors.country = 'Country is required.';
            isValid = false;
        }

        if (!user.address) {
            errors.address = 'Address is required.';
            isValid = false;
        }

        if (!user.state) {
            errors.state = 'State is required.';
            isValid = false;
        }

        if (!user.postalCode) {
            errors.postalCode = 'Postal Code is required.';
            isValid = false;
        }

        setValidationErrors(errors);
        return isValid;
    };

    useEffect(() => {
        setPreviousImage(user.image || '');
    }, []);

    return (
        <div>
            <Header />
            <div className="content-wrapper pt-20">
                <div className="page-content fade-in-up">
                    <div className="ibox">
                        <div className="ibox-head">
                            <div className="ibox-title">Profile Settings</div>
                        </div>
                        <div className="ibox-body">
                            <form>
                                <div className='form-group row grid gap-2 mb-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 '>
                                    <div className='col-span-1'>
                                        <label className='control-label'>First Name:</label>
                                        <input
                                            type="text"
                                            className={`form-control ${validationErrors.firstName ? 'is-invalid' : ''}`}
                                            placeholder="First Name"
                                            value={user.firstName}
                                            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                                        />
                                        {validationErrors.firstName && (
                                            <div className="invalid-feedback">{validationErrors.firstName}</div>
                                        )}
                                    </div>
                                    <div className='col-span-1'>
                                        <label className='control-label'>Last Name:</label>
                                        <input
                                            type="text"
                                            className={`form-control ${validationErrors.lastName ? 'is-invalid' : ''}`}
                                            placeholder="Last Name"
                                            value={user.lastName}
                                            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                                        />
                                        {validationErrors.lastName && (
                                            <div className="invalid-feedback">{validationErrors.lastName}</div>
                                        )}
                                    </div>
                                    <div className=''>
                                        <label className='control-label'>Email:</label>
                                        <input
                                            type="email"
                                            className={`form-control ${validationErrors.email ? 'is-invalid' : ''}`}
                                            placeholder="Email"
                                            value={user.email}
                                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                                        />
                                        {validationErrors.email && (
                                            <div className="invalid-feedback">{validationErrors.email}</div>
                                        )}
                                    </div>
                                </div>
                                <div className='form-group row grid gap-2 grid-cols-1 mb-2 md:grid-cols-2 lg:grid-cols-3'>
                                    <div className='co-l-span-1'>
                                        <label className='control-label'>Phone Number:</label>
                                        <input
                                            type="text"
                                            className={`form-control ${validationErrors.phoneNumber ? 'is-invalid' : ''}`}
                                            placeholder="Phone Number"
                                            value={user.phoneNumber}
                                            onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
                                        />
                                        {validationErrors.phoneNumber && (
                                            <div className="invalid-feedback">{validationErrors.phoneNumber}</div>
                                        )}
                                    </div>
                                    <div className='col-span-1'>
                                        <label className='control-label'>Country:</label>
                                        <input
                                            type="text"
                                            className={`form-control ${validationErrors.country ? 'is-invalid' : ''}`}
                                            placeholder="Country"
                                            value={user.country}
                                            onChange={(e) => setUser({ ...user, country: e.target.value })}
                                        />
                                        {validationErrors.country && (
                                            <div className="invalid-feedback">{validationErrors.country}</div>
                                        )}
                                    </div>
                                    <div className='col-span-1'>
                                        <label className='control-label'>Address:</label>
                                        <input
                                            type="text"
                                            className={`form-control ${validationErrors.address ? 'is-invalid' : ''}`}
                                            placeholder="Address"
                                            value={user.address}
                                            onChange={(e) => setUser({ ...user, address: e.target.value })}
                                        />
                                        {validationErrors.address && (
                                            <div className="invalid-feedback">{validationErrors.address}</div>
                                        )}
                                    </div>
                                </div>
                                <div className='form-group row grid mb-2 gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                                    <div className='col-span-1'>
                                        <label className='control-label'>State:</label>
                                        <input
                                            type="text"
                                            className={`form-control ${validationErrors.state ? 'is-invalid' : ''}`}
                                            placeholder="State"
                                            value={user.state}
                                            onChange={(e) => setUser({ ...user, state: e.target.value })}
                                        />
                                        {validationErrors.state && (
                                            <div className="invalid-feedback">{validationErrors.state}</div>
                                        )}
                                    </div>
                                    <div className='col-span-1'>
                                        <label className='control-label'>Postal Code:</label>
                                        <input
                                            type="text"
                                            className={`form-control ${validationErrors.postalCode ? 'is-invalid' : ''}`}
                                            placeholder="Postal Code"
                                            value={user.postalCode}
                                            onChange={(e) => setUser({ ...user, postalCode: e.target.value })}
                                        />
                                        {validationErrors.postalCode && (
                                            <div className="invalid-feedback">{validationErrors.postalCode}</div>
                                        )}
                                    </div>
                                </div>
                                <div className='  mb-3 mt-5'>
                                    <div className='border-gray-500 '>
                                        <label className='control-label'>Profile Image:</label>
                                        <input
                                            type="file"
                                            className={`form-control  border-gray-300 border-r-2 border-l-2 border-b-2 border-t-2 rounded`}
                                            onChange={handleImageChange}
                                        />
                                    </div>
                                </div>
                                <div className='form-group row grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                                    <div className='col-span-1 flex items-center rounded-lg'>
                                        {isNewImageSelected ? (
                                            <img
                                            className='flex items-center content-center rounded-lg'
                                                src={newImageUrl} // Use the newImageUrl state for displaying the new image
                                                alt=''
                                                height={120}
                                            />
                                        ) : (
                                            <img
                                                src={`https://localhost:7033/api/Customer/GetImage/${previousImage}`}
                                                alt=''
                                                height={120}
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className='form-group row  flex items-end content-end'>
                                    <div className='col-span-1 text-center mt-5 p-3 rounded-lg bg-purple-700 text-white'>
                                        <Button variant="primary" onClick={() => handleSubmit()}>
                                            Update Profile
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default Profile;
