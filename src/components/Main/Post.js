import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export class Post extends Component {
    handleComment = () => {
        var x = document.getElementById("comment"+this.props.postId);
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }

    render() {
        return (
            <Card style={{ width: '70rem' }}>


                <Card.Body>
                    {(this.props.postId < 105) && <Card.Img variant="top" src="https://picsum.photos/id/1/800/400" />}

                    {/* <Card.Title>this should be the text of the post</Card.Title> */}
                    {/* <div className="text-center"> */}
                    <Card.Text>
                        {this.props.postText}
                    </Card.Text>
                    {/* </div> */}

                    <div className="text-center">
                        <Button size="4" variant="primary">Edit</Button>
                        <Button className="ml-2" variant="primary" onClick={this.handleComment}>Comment</Button>
                    </div>
                    <ul id={"comment"+this.props.postId}>
                        <li>This is a great article</li>
                        <li>I really like this article</li>
                        <li>The best one</li>
                    </ul>



                </Card.Body>




            </Card>
        )
    }
}

export default Post
