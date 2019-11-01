import React, { Component } from 'react'
import { Row } from 'react-bootstrap'


export class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userId: localStorage.getItem("userId"),
            userName: "",
            validUserName: "",
            email: "",
            phone: "",
            zipcode: "",
            password: ""
        }
    }

    componentDidMount = () => {
        this.fetchUsers()
    }

    change = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    fetchUsers = async () => {
        const returned = await fetch(
            'https://jsonplaceholder.typicode.com/users'
        );
        const items = await returned.json()
        this.setState({validUserName: items[this.state.userId-1].username})

        // console.log(items)

        
        document.getElementById("userName").placeholder = items[this.state.userId-1].username
        document.getElementById("email").placeholder = items[this.state.userId-1].email
        document.getElementById("phone").placeholder = items[this.state.userId-1].phone
        document.getElementById("zipcode").placeholder = items[this.state.userId-1].address.zipcode
        document.getElementById("password").placeholder = items[this.state.userId-1].address.street
    }


    submitHandler = event => {
        event.preventDefault();
        event.target.className += " was-validated";

        document.getElementById("userName").placeholder = this.state.userName
        document.getElementById("email").placeholder = this.state.email
        document.getElementById("phone").placeholder = this.state.phone
        document.getElementById("zipcode").placeholder = this.state.zipcode
        document.getElementById("password").placeholder = this.state.password

    }

    render() {
        return (
            <div>
                <h1 className="ml-5">Update Info</h1>


                <form className="needs-validation" onSubmit={this.submitHandler} noValidate>
                    <div className="col-md-6 mb-3">
                        <div className="row">
                            <div className="col-md-3 mb-2 mt-2">
                                <label htmlFor="validationCustom01">Username</label>
                            </div>
                            <div className="col-md-6 mb-3">
                                <input type="text" className="form-control" id="userName" placeholder="Name"
                                    onChange={this.change}
                                    name="userName"
                                    pattern="^[^0-9][a-zA-Z0-9]*$"
                                    required />
                                <div className="valid-feedback">
                                    Looks good!
                                    </div>
                                <div className="invalid-feedback">
                                    "upper or lower case letters and numbers, may not start with a number"
                                    </div>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-md-3 mb-2 mt-2">
                                <label htmlFor="validationCustom02">Email</label>
                            </div>
                            <div className="col-md-6 mb-3">
                                <input type="email" className="form-control" id="email" placeholder="email"
                                    onChange={this.change}
                                    name="email"
                                    required />
                                <div className="valid-feedback">
                                    Looks good!
                                    </div>
                                <div className="invalid-feedback">
                                    Please give a valid email
                                    </div>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-md-3 mb-2 mt-2">
                                <label htmlFor="validationCustom03">Phone</label>
                            </div>
                            <div className="col-md-6 mb-3">
                                <input type="tel" className="form-control" id="phone" placeholder="phone"
                                    onChange={this.change}
                                    name="phone"
                                    required />
                                <div className="valid-feedback">
                                    Looks good!
                                    </div>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-md-3 mb-2 mt-2">
                                <label htmlFor="validationCustom01">Zipcode</label>
                            </div>
                            <div className="col-md-6 mb-3">
                                <input type="text" className="form-control" id="zipcode" placeholder="zipcode"
                                    onChange={this.change}
                                    name="zipcode"
                                    required />
                                <div className="valid-feedback">
                                    Looks good!
                                    </div>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-md-3 mb-2 mt-2">
                                <label htmlFor="validationCustom01">Password</label>
                            </div>
                            <div className="col-md-6 mb-3">
                                <input type="password" className="form-control" id="password" placeholder="password"
                                    onChange={this.change}
                                    name="password"
                                    required />
                                <div className="valid-feedback">
                                    Looks good!
                                    </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 mb-3">
                                <button className="btn btn-primary btn-sm" type="submit">Submit form</button>
                            </div>
                        </div>
                    </div>

                </form>

            </div>
        )
    }
}

export default Profile
