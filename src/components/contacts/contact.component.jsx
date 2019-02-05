import React from 'react';

import './styles.scss';

export default class Contact extends React.Component {
    constructor(props) {
        super(props);

        this.state = { iconVisible: false };

        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    // The functionality is separate because otherwise there was a chance of reverting the hover effect
    handleMouseEnter() {
        this.setState({
            iconVisible: true
        })
    }

    handleMouseLeave() {
        this.setState({
            iconVisible: false
        })
    }

    render() {
        const { contact } = this.props;

        return (
            <div className="contact-container" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                <span className="contact-name">{contact.name}</span>
                <span className="contact-email">{contact.email}</span>
                <span className="contact-phone">{contact.phone}</span>
                <div className="icon-container">
                    <i className={`fa fa-pencil ${this.state.iconVisible ? 'contact-icon-visible' : 'contact-icon'}`} onClick={() => this.props.handleShow(this.props.contact, 'edit')}></i>
                    <i className={`fa fa-trash-o ${this.state.iconVisible ? 'contact-icon-visible' : 'contact-icon'}`} onClick={() => this.props.handleShow(this.props.contact, 'delete')}> </i>
                </div>

            </div>
        )
    }
} 