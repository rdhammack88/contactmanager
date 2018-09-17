import React, { Component } from 'react';
import { Consumer } from '../../context';
// import uuid from 'uuid';
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';

class AddContact extends Component {
    state = {
        name: '',
        email: '',
        phone: '',
        errors: {}
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    };

    onSubmit = async (dispatch, e) => {
        e.preventDefault();
        const { name, email, phone } = this.state;

        /** Check for Errors */
        // (function () {
        if (name === '') {
            this.setState({ errors: { name: 'Name is required' } });
            return;
        }
        if (email === '') {
            this.setState({ errors: { email: 'Email is required' } });
            return;
        }
        if (phone === '') {
            this.setState({ errors: { phone: 'Phone is required' } });
            return;
        }
        // return;
        // })().bind(this);


        const newContact = {
            name,
            email,
            phone
        }

        const res = await axios
            .post(`https://jsonplaceholder.typicode.com/users`, newContact);

        dispatch({ type: 'ADD_CONTACT', payload: res.data })

        /** Clear input fields */
        this.setState({
            name: '',
            email: '',
            phone: '',
            errors: {}
        });

        this.props.history.push('/');

        console.log(this.state);

    }

    render() {
        const { name, email, phone, errors } = this.state;

        return (
            <Consumer>
                {value => {
                    const { dispatch } = value;
                    return (
                        <div>
                            <div className="card mb-3">
                                <div className="card-header">Add Contact</div>
                                <div className="card-body">
                                    <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                                        <TextInputGroup
                                            label="Name"
                                            placeholder="Enter Name..."
                                            name="name"
                                            value={name}
                                            onChange={this.onChange}
                                            error={errors.name}
                                        />
                                        <TextInputGroup
                                            label="Email"
                                            type="email"
                                            placeholder="Enter Email..."
                                            name="email" value={email}
                                            onChange={this.onChange}
                                            error={errors.email}
                                        />
                                        <TextInputGroup
                                            label="Phone"
                                            type="tel"
                                            placeholder="Enter Phone..."
                                            name="phone"
                                            value={phone}
                                            onChange={this.onChange}
                                            error={errors.phone}
                                        />
                                        {/* <div className="form-group">
                                            <label htmlFor="name">Name</label>
                                            <input
                                                type="text"
                                                className="form-control form-control-lg"
                                                placeholder="Enter Name..."
                                                name="name"
                                                value={name}
                                                onChange={this.onChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input
                                                type="email"
                                                className="form-control form-control-lg"
                                                placeholder="Enter Email..."
                                                name="email"
                                                value={email}
                                                onChange={this.onChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="phone">Phone</label>
                                            <input
                                                type="tel"
                                                className="form-control form-control-lg"
                                                placeholder="Enter Phone..."
                                                name="phone"
                                                value={phone}
                                                onChange={this.onChange}
                                            />
                                        </div> */}
                                        <input
                                            type="submit"
                                            value="Add Contact"
                                            className="btn btn-light btn-block"
                                        />
                                    </form>
                                </div>
                            </div>
                        </div>
                    )
                }}
            </Consumer>
        )
    }
}

export default AddContact;