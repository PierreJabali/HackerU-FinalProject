import React, { useState, useEffect } from 'react';
import { Modal, Button, ModalFooter } from 'react-bootstrap';

function ItemForm({
    selectedItem,
    onAddItem,
    showModal,
    handleCloseModal,
}) {
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const [validationErrors, setValidationErrors] = useState({
        email: '',
        subject: '',
        message: '',
    });

    useEffect(() => {
        if (selectedItem) {
            setEmail(selectedItem.email);
            setSubject('');
            setMessage('');
        }
    }, [selectedItem]);

    const handleSubmit = (isUpdating) => {
        if (validateForm()) {

            const formData = {
                'Email': email,
                'Subject': subject,
                'Message_Text': message
            }

            onAddItem(formData);

            handleCloseModal();
        }
    };

    const validateForm = () => {
        const errors = {
            email: '',
            subject: '',
            message: '',
        };

        let isValid = true;

        if (!email) {
            errors.email = 'Email is required.';
            isValid = false;
        }

        if (!subject) {
            errors.subject = 'Subject is required.';
            isValid = false;
        }

        if (!message) {
            errors.message = 'Message is required.';
            isValid = false;
        }

        setValidationErrors(errors);
        return isValid;
    };

    return (
        <div>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedItem ? 'Update' : 'Add'} Category</Modal.Title>
                </Modal.Header>
                <form>
                    <Modal.Body>
                        <div className='form-group row'>
                            <div className='col-md-12'>
                                <label className='control-label'>Customer Email</label>
                                <input
                                    type="text"
                                    className={`form-control ${validationErrors.email ? 'is-invalid' : ''}`}
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    readOnly
                                />
                                {validationErrors.email && (
                                    <div className="invalid-feedback">{validationErrors.email}</div>
                                )}
                            </div>
                        </div>
                        <div className='form-group row'>
                            <div className='col-md-12'>
                                <label className='control-label'>Subject</label>
                                <input
                                    type="text"
                                    className={`form-control ${validationErrors.subject ? 'is-invalid' : ''}`}
                                    placeholder="Subject"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                />
                                {validationErrors.subject && (
                                    <div className="invalid-feedback">{validationErrors.subject}</div>
                                )}
                            </div>
                        </div>
                        <div className='form-group row'>
                            <div className='col-md-12'>
                                <label className='control-label'>Message</label>
                                <textarea
                                    rows={3}
                                    cols={50}
                                    className={`form-control ${validationErrors.message ? 'is-invalid' : ''}`}
                                    placeholder="Message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                                {validationErrors.message && (
                                    <div className="invalid-feedback">{validationErrors.message}</div>
                                )}
                            </div>
                        </div>
                    </Modal.Body>
                    <ModalFooter>
                        <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                        <Button variant="primary" onClick={() => handleSubmit(!!selectedItem)}>
                            SendEmail
                        </Button>
                    </ModalFooter>
                </form>
            </Modal>
        </div>
    );
}

export default ItemForm;
