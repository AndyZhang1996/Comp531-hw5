import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export class Friends extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             id: this.props.friendId
        }
    }

    unfriend = () => {
        this.props.removeFriend(this.state.id)
    }
    

    render() {
        return (
            <div>
                <Card style={{ width: '25rem' }}>
                    <Card.Body>
                        
                            <Card.Img variant="top" src="https://picsum.photos/800/400" />

                            <Card.Title>{this.props.friendName}</Card.Title>
                            <Card.Text>
                                {this.props.friendStatus}
                            </Card.Text>
                        
                        <div>
                            <Button variant="primary" onClick={this.unfriend}>Unfriend</Button>
                        </div>
                    </Card.Body>

                </Card>
            </div>
        )
    }
}

export default Friends
