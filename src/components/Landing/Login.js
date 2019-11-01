import React, { Component } from 'react';
import {Redirect, withRouter} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';


export class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: "",
            userId: "",
            userName: "",
            password: "",
            userValid: false,
            redirectMain: false
        }
        //bind the functions
        this.change = this.change.bind(this)
        this.userValidation = this.userValidation.bind(this)

        //fetch the data once
        this.fetchItems()

        // const cookies = new Cookies()
        // localStorage.setItem('userId', this.state.userId)
    }

    change = e => {
        this.setState({
          [e.target.name]: e.target.value
        })
        this.setState({userValid: false})
      }

    userValidation = () => {
        let userValid = false
        let passwordValid = false
        this.state.data.map(n => {
            if (this.state.userName === n.username) {
                userValid = true
                this.setState({userId: n.id}, () => {localStorage.setItem('userId', this.state.userId)})
            }
            if (this.state.password === n.address.street) {
                passwordValid = true
            }
        })

        if(userValid && passwordValid) {
            // console.log(this.state.userId)
            this.setState({userValid: true}, () => {localStorage.setItem("userValid", this.state.userValid)})
            // return (
            //     <Redirect
            //       to={{
            //         pathname: "/Main"
            //       }}
            //     />
            //   );
            // this.props.history.push(
            //     {pathname:"/Main"}
            // );
            this.setState({redirectMain: true})
        } else {
            alert("Wrong account name or password")
        }
    }

    fetchItems = async () => {
        // console.log("in fetch items!!!!!!!!!!!!")
        const returned = await fetch(
            'https://jsonplaceholder.typicode.com/users'
        );
        const items = await returned.json()
        this.setState({ data: items })
        // console.log(typeof this.state.data)
        // console.log(this.state.data[0].id)
        // console.log(this.state.data)
        // console.log(this.state.data[0].address.street)
    }

    render() {
        //eturn <Redirect to='/Main' push />
        return (
            <div className="login">
                {this.state.redirectMain && <Redirect to='/Main' push/>}
                <h1>Log in</h1>
                <div>
                <input
                    name="userName"
                    placeholder="Username"
                    value={this.state.userName}
                    type="text"
                    onChange={this.change}
                    required
                />
                </div>
                <div className="mt-2">
                <input
                    name="password"
                    placeholder="password"
                    value={this.state.password}
                    type="text"
                    onChange={this.change}
                    required
                />
                </div>
                <div>
                    <button className="btn btn-primary btn-sm mt-2 ml-5" onClick={this.userValidation}>Login</button>
                    {/* <button onClick={this.userValidation}>Login</button> */}
                </div>
            </div>
        )
    }
}

export default Login
