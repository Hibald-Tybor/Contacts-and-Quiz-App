import React from 'react';
import Modal from 'react-bootstrap/Modal';

const DeleteModal = (props) => {
    return (
        <Modal
            className="deleteModal"
            show={props.isModalOpen}
            onHide={() => props.handleHide('delete')}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    Smazat kontakt
</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="new-contact-form form-group">
                    <p>Prosím potvrďte smazání kontaktu {props.selectedContact.name}</p>
                </div>
                <div className="edit-button-container">
                    <button className="btn btn-light btn-lg" onClick={() => props.handleHide('delete')}>Zrušit</button>
                    <button className="btn btn-danger btn-lg" onClick={() => props.handleDelete(props.selectedContact._id)}>Smazat</button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default DeleteModal;
