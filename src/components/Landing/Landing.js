import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Registration from './Registration'
import Login from './Login'
import {Router, Route, browserHistory} from "react-router"

export class Landing extends Component {
    render() {
        return (
            <div>
                <h1 style={{color: "#3b5998", width:400}}>Welcome to Ricebook</h1>
                <div className="mt-9">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <Registration />
                    </div>
               
               
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <Login />
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default Landing
