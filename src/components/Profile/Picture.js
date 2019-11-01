import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'


export default function Picture() {
    return (
        <div>
            {/* <Card style={{ width: '20rem' }}>
                <Card.Body>
                    <Card style={{ width: '15rem' }}>
                        <Card.Img variant="top" src="https://picsum.photos/1000/500" />
                    </Card>
                    <div className="mt-2 ml-4">
                        <Button variant="primary" type="file">Upload new picture</Button>
                    </div>
                </Card.Body>


            </Card> */}
            <div className="mt-5 ml-5">
                <img src="https://picsum.photos/500/300"/>
            </div>
            <div className="mt-3">
                <input className="px-5" type="file" />
            </div>
            

        </div>
    )
}
