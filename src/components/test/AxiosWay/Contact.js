import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Consumer } from '../../context';
import axios from 'axios';

class Contact extends Component {

    // static propTypes = {
    //     name: PropTypes.string.isRequired,
    //     email: PropTypes.bool.isRequired,
    //     phone: PropTypes.string.isRequired,
    // }

    state = {
        showContactInfo: false
    };

    onShowClick = e => {
        this.setState({ showContactInfo: !this.state.showContactInfo })
    };

    onDeleteClick = (id, dispatch) => {
        // this.props.deleteClickHandler();
        // dispatch({ type: 'DELETE_CONTACT', payload: id })

        axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then(res => dispatch({ type: 'DELETE_CONTACT', payload: id }));
    }

    render() {

        const { id, name, email, phone } = this.props.contact;
        const { showContactInfo } = this.state;

        return (
            <Consumer>
                {value => {
                    const { dispatch } = value;
                    return (
                        <div className="card card-body mb-3">
                            <h4>
                                {name} &nbsp;
                                <i
                                    className="fas fa-sort-down"
                                    onClick={this.onShowClick}
                                    style={{ cursor: 'pointer' }}
                                />
                                <i
                                    className="fas fa-times"
                                    onClick={this.onDeleteClick.bind(this, id, dispatch)}
                                    style={{ cursor: 'pointer', float: 'right', color: 'red' }}
                                />
                            </h4>
                            {!showContactInfo ? null : (
                                <ul className="list-group">
                                    <li className="list-group-item">Email: {email}</li>
                                    <li className="list-group-item">Phone: {phone}</li>
                                </ul>
                            )}

                        </div>
                    )
                }}
            </Consumer>
        )
    }
}

// Contact.propTypes = {
//     name: PropTypes.string.isRequired,
//     email: PropTypes.string.isRequired,
//     phone: PropTypes.string.isRequired,
// }

Contact.propTypes = {
    contact: PropTypes.object.isRequired,
    // deleteClickHandler: PropTypes.func.isRequired
}

export default Contact;