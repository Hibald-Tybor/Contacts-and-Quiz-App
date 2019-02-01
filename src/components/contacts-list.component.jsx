import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

import './styles.css';

const Contact = props => (
    <div className="contact-container">
        <span className="contact-name">{props.contact.name}</span>
        <span className="contact-email">{props.contact.email}</span>
        <span className="contact-phone">{props.contact.phone}</span>
        <button className="contact-icon" onClick={() => props.handleModal(props.contact)}>EDIT</button>
        <button className="contact-icon" onClick={() => props.handleDelete(props.contact.key)}>Delete</button>
    </div>

)

Modal.setAppElement('#root');

function filterContacts(contacts, key) {
    return contacts.filter(contact => {
        return contact.key !== key;
    });
}

export default class ContactsList extends Component {

    constructor(props) {
        super(props);

        this.handleModal = this.handleModal.bind(this);
        this.listContacts = this.listContacts.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);

        this.state = {
            contacts: [],
            isModalOpen: false,
            formName: '',
            formEmail: '',
            formPhone: '',
            selectedContact: {}
        }
    };

    handleSubmit(e) {
        e.preventDefault();

        this.setState((prevState) => {
            let form = {
                key: (Math.random() * 10),
                name: this.state.formName,
                email: this.state.formEmail,
                phone: this.state.formPhone
            }

            return {
                contacts: [...prevState.contacts, form],
                formName: '',
                formEmail: '',
                formPhone: '',
                selectedContact: {}
            }
        })
    }

    handleUpdate(e, contact) {

        e.preventDefault();

        let remainingContacts = filterContacts(this.state.contacts, contact.key);
        let updatedContact = {
            key: contact.key,
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone
        }
        this.setState({
            contacts: [...remainingContacts, updatedContact]
        })
    }


    handleDelete(key) {
        let remainingContacts = filterContacts(this.state.contacts, key)

        this.setState({
            contacts: remainingContacts
        })
    }

    handleModal(contact) {
        this.setState((prevState) => {
            return { isModalOpen: !prevState.isModalOpen, selectedContact: contact }
        })
    }

    handleChange(event, argument) {
        this.setState({
            [argument]: event.target.value
        })
    }

    listContacts() {
        return this.state.contacts.map((currentContact, i) => {
            return <Contact handleModal={this.handleModal} handleDelete={this.handleDelete} contact={currentContact} key={`contact_${i}`} />;
        })
    }

    render() {
        return (
            <div>
                <Modal
                    className="edit-contact-form"
                    isOpen={this.state.isModalOpen}
                    onRequestClose={this.handleModal}
                    shouldCloseOnOverlayClick={false}
                    data={{ contact: this.state.selectedContact}}
                >
                    <p>Edit contact</p>
                    <form className="new-contact-form-container" onSubmit={this.handleUpdate} >
                        <div className="new-contact-form form-group">
                            <input value={this.props.data} onChange={(event) => this.handleChange(event, "formName")} type="text" placeholder="Jméno" className="form-control" />
                            <input value={this.state.formEmail} onChange={(event) => this.handleChange(event, "formEmail")} type="email" placeholder="E-mail" className="form-control" />
                            <input value={this.state.formPhone} onChange={(event) => this.handleChange(event, "formPhone")} type="text" placeholder="Telefon" className="form-control" />
                        </div>
                        <div className="button-container">
                            <button className="btn btn-default" onClick={this.handleModal}>Zrušit</button>
                            <input type="submit" class="btn btn-primary" value="OK" />
                        </div>

                    </form>
                </Modal>

                <form className="new-contact-form-container" onSubmit={this.handleSubmit} >
                    <div className="new-contact-form form-group">
                        <input value={this.state.formName} onChange={(event) => this.handleChange(event, "formName")} type="text" placeholder="Jméno *" className="form-control" required />
                        <input value={this.state.formEmail} onChange={(event) => this.handleChange(event, "formEmail")} type="email" placeholder="E-mail *" className="form-control" required />
                        <input value={this.state.formPhone} onChange={(event) => this.handleChange(event, "formPhone")} type="text" placeholder="Telefon" className="form-control" />
                    </div>
                    <input type="submit" class="btn btn-primary" value="Přidat" />
                </form>
                <div className="contact-list">
                    {this.listContacts()}
                </div>

            </div>
        )
    }
}