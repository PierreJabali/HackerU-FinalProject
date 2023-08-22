import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import { Button } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './FooterD';
import Swal from 'sweetalert2';

function Settings() {
    const [emailSettings, setEmailSettings] = useState({
        setting_ID: '',
        smtP_Server: '',
        port: 0,
        username: '',
        password: '',
        encryption: '',
        signature: '',
    });

    const [validationErrors, setValidationErrors] = useState({
        smtP_Server: '',
        port: '',
        username: '',
        password: '',
        encryption: '',
        signature: '',
    });

    const token = localStorage.getItem('token');
    const apiUrl = 'api/Settings';

    axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : '';

    const fetchData = () => {
        axios.get(`${apiUrl}/EmailSettings`)
            .then(response => {
                const data = response.data;
                setEmailSettings(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const handleSubmit = () => {
        if (validateForm()) {

            const formData = {
                'Setting_ID': emailSettings.setting_ID,
                'SMTP_Server': emailSettings.smtP_Server,
                'Port': emailSettings.port,
                'Username': emailSettings.username,
                'Password': emailSettings.password,
                'Encryption': emailSettings.encryption,
                'Signature': emailSettings.signature,
            };

            handleItemAction(formData);
        }
    };

    const handleItemAction = (itemData) => {
        const formData = new FormData();

        for (const key in itemData) {
            formData.append(key, itemData[key]);
        }

        axios.post(`${apiUrl}/UpdateSettings`, formData)
            .then(response => {
                if (response.status === 200) {
                    fetchData();
                    Swal.fire({
                        icon: 'success',
                        title: 'Settings Updated',
                        text: 'The settings has been updated successfully.',
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
            smtP_Server: '',
            port: '',
            username: '',
            password: '',
            encryption: '',
            signature: '',
        };

        let isValid = true;

        if (!emailSettings.smtP_Server) {
            errors.smtP_Server = 'SMTP Server is required.';
            isValid = false;
        }

        if (!emailSettings.port) {
            errors.port = 'Port is required.';
            isValid = false;
        }

        if (!emailSettings.username) {
            errors.username = 'Username is required.';
            isValid = false;
        }

        if (!emailSettings.password) {
            errors.password = 'Password is required.';
            isValid = false;
        }

        if (!emailSettings.encryption) {
            errors.encryption = 'Encryption is required.';
            isValid = false;
        }

        if (!emailSettings.signature) {
            errors.signature = 'Signature is required.';
            isValid = false;
        }

        setValidationErrors(errors);
        return isValid;
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <Header />
            <div className="content-wrapper pt-20">
                <div className="page-content fade-in-up">
                    <div className="ibox">
                        <div className="ibox-head">
                            <div className="ibox-title">Email Settings</div>
                        </div>
                        <div className="ibox-body">
                            <form>
                                <div className='form-group row'>
                                    <div className='col-md-4'>
                                        <label className='control-label'>SMTP Server:</label>
                                        <input
                                            type="text"
                                            className={`form-control ${validationErrors.smtP_Server ? 'is-invalid' : ''}`}
                                            placeholder="SMTP Server"
                                            value={emailSettings.smtP_Server}
                                            onChange={(e) => setEmailSettings({ ...emailSettings, smtP_Server: e.target.value })}
                                        />
                                        {validationErrors.smtP_Server && (
                                            <div className="invalid-feedback">{validationErrors.smtP_Server}</div>
                                        )}
                                    </div>
                                    <div className='col-md-4'>
                                        <label className='control-label'>SMTP Port:</label>
                                        <input
                                            type="text"
                                            className={`form-control ${validationErrors.port ? 'is-invalid' : ''}`}
                                            placeholder="SMTP Port"
                                            value={emailSettings.port}
                                            onChange={(e) => setEmailSettings({ ...emailSettings, port: e.target.value })}
                                        />
                                        {validationErrors.port && (
                                            <div className="invalid-feedback">{validationErrors.port}</div>
                                        )}
                                    </div>
                                    <div className='col-md-4'>
                                        <label className='control-label'>SMTP Encryption:</label>
                                        <input
                                            type="text"
                                            className={`form-control ${validationErrors.encryption ? 'is-invalid' : ''}`}
                                            placeholder="SMTP Encryption"
                                            value={emailSettings.smtP_Server}
                                            onChange={(e) => setEmailSettings({ ...emailSettings, encryption: e.target.value })}
                                        />
                                        {validationErrors.encryption && (
                                            <div className="invalid-feedback">{validationErrors.encryption}</div>
                                        )}
                                    </div>
                                </div>
                                <div className='form-group row'>
                                    <div className='col-md-4'>
                                        <label className='control-label'>Username:</label>
                                        <input
                                            type="text"
                                            className={`form-control ${validationErrors.username ? 'is-invalid' : ''}`}
                                            placeholder="Username"
                                            value={emailSettings.username}
                                            onChange={(e) => setEmailSettings({ ...emailSettings, username: e.target.value })}
                                        />
                                        {validationErrors.smtP_Server && (
                                            <div className="invalid-feedback">{validationErrors.username}</div>
                                        )}
                                    </div>
                                    <div className='col-md-4'>
                                        <label className='control-label'>Password:</label>
                                        <input
                                            type="password"
                                            className={`form-control ${validationErrors.password ? 'is-invalid' : ''}`}
                                            placeholder="Password"
                                            value={emailSettings.password}
                                            onChange={(e) => setEmailSettings({ ...emailSettings, password: e.target.value })}
                                        />
                                        {validationErrors.port && (
                                            <div className="invalid-feedback">{validationErrors.password}</div>
                                        )}
                                    </div>
                                    <div className='col-md-4'>
                                        <label className='control-label'>Signature:</label>
                                        <input
                                            type="text"
                                            className={`form-control ${validationErrors.signature ? 'is-invalid' : ''}`}
                                            placeholder="Signature"
                                            value={emailSettings.signature}
                                            onChange={(e) => setEmailSettings({ ...emailSettings, signature: e.target.value })}
                                        />
                                        {validationErrors.encryption && (
                                            <div className="invalid-feedback">{validationErrors.signature}</div>
                                        )}
                                    </div>
                                </div>
                                <div className='form-group row  flex items-end content-end'>
                                    <div className='col-span-1 text-center mt-5 p-3 rounded-lg bg-purple-700 text-white'>
                                        <Button variant="primary" onClick={() => handleSubmit()}>
                                            Update Settings
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

export default Settings;
