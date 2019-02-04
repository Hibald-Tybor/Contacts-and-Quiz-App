import React, { Component } from 'react';
import axios from 'axios';

import './styles.css';

import Contact from './contact.component';
import EditModal from './editModal.component';
import DeleteModal from './deleteModal.component';

function filterContacts(contacts, key) {
    return contacts.filter(contact => {
        return contact.key !== key;
    });
}

export default class ContactsList extends Component {

    constructor(props) {
        super(props);

        this.handleShow = this.handleShow.bind(this);
        this.handleHide = this.handleHide.bind(this);

        this.listContacts = this.listContacts.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);

        this.getContacts = this.getContacts.bind(this);



        this.state = {
            contacts: [],
            isEditModalOpen: false,
            isDeleteModalOpen: false,
            formName: '',
            formEmail: '',
            formPhone: '',
            selectedContact: {},
        }
    };

    getContacts() {
        axios.get('http://localhost:4000/contacts/', () => {
            console.log('received contacts successfully')
        }).then(response => {
            this.setState({ contacts: [...response.data] });
        }).catch(err => {
            console.log(err);
        })
    }

    componentDidMount() {
        this.getContacts();
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     const { contacts, isDeleteModalOpen, isEditModalOpen, formName, formEmail, formPhone, selectedContact} = this.state;

    //     if (contacts.length !== nextState.contacts.length ||
    //         isDeleteModalOpen !== nextState.isDeleteModalOpen ||
    //         isEditModalOpen !== nextState.isEditModalOpen ||
    //         formName !== nextState.formName ||
    //         formEmail !== nextState.formEmail ||
    //         formPhone !== nextState.formPhone ||
    //         selectedContact !== nextState.selectedContact
    //         ) {
    //             return true
    //         }
    //         return false
    // }

    componentDidUpdate() {
        this.getContacts();
    }

    handleSubmit(e) {
        e.preventDefault();

        let newContact = {
            name: this.state.formName,
            email: this.state.formEmail,
            phone: this.state.formPhone
        };

        axios.post('http://localhost:4000/contacts/add/', newContact)
            .then(response => {
                console.log('Creation success')
            }).catch(err => {
                console.log(err);
            });

        this.setState({
            formName: '',
            formEmail: '',
            formPhone: '',
            readyForFetch: true
        });
    }

    handleUpdate(e, newContact) {
        e.preventDefault();

        // this.setState((prevState) => {
        //     let updatedContacts = prevState.contacts.map(oldContact => {
        //         if (oldContact.key === newContact.key) {
        //             return Object.assign(oldContact, newContact);
        //         }
        //         return oldContact
        //     })

        //     return {
        //         contacts: updatedContacts,
        //         isEditModalOpen: false
        //     }
        // })

        const contactToSend = {
            name: newContact.name,
            email: newContact.email,
            phone: newContact.phone
        }

        axios.post('http://localhost:4000/contacts/update/' + newContact._id, contactToSend)
            .then(response => console.log('Update success'))
            .catch(err => console.log(err));

        this.setState({
            isEditModalOpen: false,
            readyForFetch: true
        })
    }


    handleDelete(key) {
        let remainingContacts = filterContacts(this.state.contacts, key)

        this.setState({
            contacts: remainingContacts,
            isDeleteModalOpen: false
        })
    }

    // Another approach would be to open the modal with a router dialog, with the id of the contact in the params, eg. /contacts/34141 
    // Diff is used to recognize which modal should be handled
    handleShow(contact, diff) {
        // A copy is created, otherwise, the contact would be directly altered even without clicking on the update button
        let selectedModal = (diff === 'edit' ? 'isEditModalOpen' : 'isDeleteModalOpen');

        this.setState({
            [selectedModal]: true,
            selectedContact: Object.assign({}, contact)
        })
    }

    handleHide(diff) {
        let selectedModal = diff === 'edit' ? 'isEditModalOpen' : 'isDeleteModalOpen';

        this.setState({
            [selectedModal]: false,
        })
    }

    handleChange(event, argument) {
        this.setState({
            [argument]: event.target.value
        })
    }

    handleEdit(event, argument) {
        let editedContact = Object.assign(this.state.selectedContact, { [argument]: event.target.value });

        this.setState({
            selectedContact: editedContact
        })
    }

    listContacts() {
        return this.state.contacts.map((currentContact, i) => {
            return <Contact handleShow={this.handleShow} handleDelete={this.handleDelete} contact={currentContact} key={currentContact.key} />;
        })
    }

    render() {
        return (
            <div>
                <EditModal
                    isModalOpen={this.state.isEditModalOpen}
                    handleHide={this.handleHide}
                    selectedContact={this.state.selectedContact}
                    handleEdit={this.handleEdit}
                    handleUpdate={this.handleUpdate}

                />
                <DeleteModal
                    isModalOpen={this.state.isDeleteModalOpen}
                    handleHide={this.handleHide}
                    selectedContact={this.state.selectedContact}
                    handleDelete={this.handleDelete}
                />
                <form className="new-contact-form-container" onSubmit={this.handleSubmit} >
                    <div className="new-contact-form form-group">
                        {/*For the sake of convenience and instructions not specifying it, the form is validated through HTML, otherwise a JS function with the use of regular expressions would do the work*/}
                        <input value={this.state.formName} onChange={(event) => this.handleChange(event, "formName")} type="text" placeholder="Jméno *" className="form-control" required />
                        <input value={this.state.formEmail} onChange={(event) => this.handleChange(event, "formEmail")} type="email" placeholder="E-mail *" className="form-control" required />
                        <input value={this.state.formPhone} onChange={(event) => this.handleChange(event, "formPhone")} type="text" placeholder="Telefon" className="form-control" />
                    </div>
                    <input type="submit" className="add-contact-btn btn btn-primary" value="Přidat" />
                </form>
                <div className="contact-list">
                    {this.listContacts()}
                </div>

            </div>
        )
    }
}