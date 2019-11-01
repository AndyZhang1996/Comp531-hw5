import Picture from './Picture'
import Update from './Update'
import './Profile.css'
import {Redirect} from "react-router-dom"
import React, { Component } from 'react'

export class Profile extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             redirectMain: false
        }
    }

    handleMain = () => {
        this.setState({redirectMain: true})
    } 
    
    render() {
        return (
            
            <div className="profile">
                {this.state.redirectMain && <Redirect to='/Main' push/>}
                <div className="header">
                <h1>Ricebook</h1>
                </div>
                <button className="btn btn-primary btn-lg ml-3" style={{ width: '10rem' }} onClick={this.handleMain}>Main</button>
                <div className="row">
                    <div className="col-md-6 mb-2 mt-10">
                        <Picture />
                    </div>


                    <div className="col-md-6 mb-2 mt-2">
                        <Update />
                    </div>
                </div>


            </div>
        )
    }
}

export default Profile
