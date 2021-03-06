import React from 'react';
import Modal from 'react-bootstrap/Modal';

const EditModal = (props) => {
    return (
        <Modal
            className="editModal"
            show={props.isModalOpen}
            onHide={() => props.handleHide('edit')}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    Upravit kontakt
</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="new-contact-form form-group">
                    <input value={props.selectedContact.name} onChange={(event) => props.handleEdit(event, 'name')} type="text" placeholder="Jméno" className="form-control" />
                    <input value={props.selectedContact.email} onChange={(event) => props.handleEdit(event, 'email')} type="email" placeholder="E-mail" className="form-control" />
                    <input value={props.selectedContact.phone} onChange={(event) => props.handleEdit(event, 'phone')} type="text" placeholder="Telefon" className="form-control" />
                </div>
                <div className="edit-button-container">
                    <button className="btn btn-light btn-lg" onClick={() => props.handleHide('edit')}>Zrušit</button>
                    <button className="btn btn-primary btn-lg" onClick={(event) => props.handleUpdate(event, props.selectedContact)}>OK</button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default EditModal;
