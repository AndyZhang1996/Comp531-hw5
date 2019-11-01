import React, { Component } from 'react'
import User from './User.js'
import Friend from './Friend.js'
import Post from './Post.js'
import { Container } from 'react-bootstrap'
import { Col } from 'react-bootstrap'
import { Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import { Redirect } from 'react-router-dom'


export class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userId: localStorage.getItem("userId"),             //id of the user who logged in
            userName: "",          //name of the currently logged-in user 
            users: "",             //information of all users 
            posts: "",             //information of all posts
            status: "",            //status of the logged in user
            friendsList: [],        //list of ids of all the friends of the logged-in user 
            friends: [],           //list of all the friends
            newFriendName: "",      //the new friend name
            userPosts: [],           //posts of the logged-in user 
            // postId: "",              //post id 
            extraPostId: 110,        //initial post id for the non json posts
            timeStamp: 0,             //timestamp of the post, add 1 when posting a new post 
            newPost: "",               //new post the user tries to post
            newFriendPosts: "",
            searchPost: "",             //post that is searched in the search box
            filteredPosts: "",           //posts after search 
            allStatus: ""                //all of the user status, get values from local storage
            // array: [1, 2, 3]
        }

        this.change = this.change.bind(this)
        this.addFriend = this.addFriend.bind(this)
        this.getUserName = this.getUserName.bind(this)
        this.removeFriend = this.removeFriend.bind(this)
    }

    componentDidMount = () => {
        // console.log('ok')
        //if(!localStorage.getItem('userId')) return
        this.fetchPosts()
        this.fetchUsers()
        // this.fetchStatus()
    }




    getUserFriendIds = () => {
        let tempArray = []
        let i
        for (i = 1; i < 4; i++) {
            let temp = parseInt(this.state.userId) + i             //important!!!!!!!!!!!!!!!
            if (temp != 10) {
                temp = temp % 10
            }
            tempArray.push(temp)
        }
        this.setState({ friendsList: tempArray })
    }





    // checkUserFriends = (user) => {
    //     if (user.id === 1 || user.id === 2 || user.id === 3){
    //         return user
    //     }
    // }

    // getUserFriends = () => {
    //     console.log(this.state.users)
    //     let tempArray = this.state.users.filter(this.checkUserFriends)
    //     this.setState({friends: tempArray})
    // }




    fetchUsers = async () => {
        let idx = this.state.userId - 1
        const returned = await fetch(
            'https://jsonplaceholder.typicode.com/users'
        );
        const items = await returned.json()

        // this.setState({ users: items }, () => {
        //     (() => { this.setState({ status: this.state.users[id].company.catchPhrase } )()
        //     (() => { this.getUserFriends })()
        // })})


        // console.log(this.state.allStatus[idx])

        this.setState({ users: items }, () => {
            this.fetchStatus()
            let statusArray = localStorage.getItem("allStatus").split(",")
            this.setState({ allStatus: statusArray })
            this.setState({ status: statusArray[idx] })
        })


        // console.log(this.state.allStatus[idx])
        // this.setState({status: allStatus})



        // console.log(typeof this.state.data)
        // console.log(this.state.data[0].id)
        // console.log(this.state.users)
        // console.log(this.state.data[0].address.street)
        // console.log(this.state.users[0].username)

        this.getUserName()
        // this.fetchFriends()
        // this.fetchStatus()
        // let statusArray = localStorage.getItem("allStatus").split(",")
        // this.setState({allStatus: statusArray})
    }

    getUserName = () => {
        this.setState({ userName: this.state.users[this.state.userId - 1].username })
    }



    fetchStatus = () => {
        let statusArray = []
        this.state.users.map(user => {
            statusArray.push(user.company.catchPhrase)
        })
        // console.log(statusArray)
        if (localStorage.getItem("allStatus") === null) {
            localStorage.setItem("allStatus", statusArray)
        }
    }


    // fetchFriends = async () => {
    //     const returned = await fetch(
    //         'https://jsonplaceholder.typicode.com/users'
    //     );
    //     const items = await returned.json()

    //     this.getUserFriendIds()
    //     let userFriends = this.state.users.map((user) => {
    //         if (user.id === this.state.friendsList[0] || user.id === this.state.friendsList[1] || user.id === this.state.friendsList[2]) {
    //             return user
    //         }
    //     })
    //     let updatedUserFriends = []
    //     for (let i = 0; i < userFriends.length; i++) {
    //         if (userFriends[i] != null) {
    //             updatedUserFriends.push(userFriends[i])
    //         }
    //         // userFriends[i] ? updatedUserFriends.push(userFriends[i]) : ''
    //     }

    //     this.setState({ friends: updatedUserFriends })
    // }


    fetchPosts = async () => {
        const returned = await fetch(
            'https://jsonplaceholder.typicode.com/posts'
        );
        const items = await returned.json()
        this.setState({ posts: items })
        // console.log(typeof this.state.data)
        // console.log(this.state.data[0].id)
        let newPosts = this.state.posts

        newPosts.map(newPost => {
            newPost["timeStamp"] = this.state.timeStamp
        })

        // newPosts[0]["timestamp"] = 0
        this.setState({ posts: newPosts })
        // console.log(this.state.data[0].address.street)
        this.getUserPosts()
    }

    getUserPosts = () => {
        let tempArray = []
        this.state.posts.map(post => {
            if (post.userId == this.state.userId) {
                // console.log("in map function!!!!!!!!!!!!!!!!!!!!!!!")
                tempArray.push({
                    userId: post.userId,
                    timeStamp: post.timeStamp,
                    body: post.body,
                    postId: post.id
                }
                )
            }
        })
        this.setState({ userPosts: tempArray }, () => {
            this.setState({ filteredPosts: this.state.userPosts })
        })
        // console.log(this.state.filteredPosts)
        // console.log(this.state.userPosts)
        // console.log(typeof this.state.userId)
    }



    change = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }



    //push a new json object every time this function is called
    // addFriend = () => {
    //     let tempArray = this.state.friendsList
    //     let dupFlg = false

    //     this.state.friendsList.map(existingId => {
    //         if (this.state.newFriendId === existingId) {
    //             dupFlg = true
    //         }
    //     })
    //     if (this.state.newFriendId > 0 && this.state.newFriendId <= 10 && dupFlg === false) {
    //         tempArray.push(this.state.newFriendId)
    //         this.setState({friendsList : tempArray})
    //     } 
    // }

    addFriend = () => {
        let tempArray = this.state.friends

        this.state.users.map(n => {
            if (this.state.newFriendName === n.username) {
                let newFriend = {
                    company: { catchPhrase: n.company.catchPhrase },
                    username: this.state.newFriendName,
                    id: n.id
                }
                if (newFriend.username != "") {
                    tempArray.push(newFriend)
                }
                this.setState({ friends: tempArray })
                console.log(this.state.friends)

                //add the new friend's posts to feed 
                this.fetchFriendPosts()
                // this.addFriendPosts()
                // let increasedStamp = this.timeStamp + 1
            }
        })

        // let newFriend = {
        //     company: { catchPhrase: "In a relationship" },
        //     username: this.state.newFriendName
        // }
        // if (newFriend.username != "") {
        //     tempArray.push(newFriend)
        // }
        // tempArray.push(newFriend)
        // this.setState({ friends: tempArray })
        this.setState({ newFriendName: "" })
    }

    fetchFriendPosts = () => {
        let increasedStamp = this.state.timeStamp + 1
        this.setState({ timeStamp: increasedStamp })
        let tempArray = []
        let friendId
        this.state.friends.map(friend => {
            if (friend.username === this.state.newFriendName) {
                friendId = friend.id
            }
        })

        this.state.posts.map(post => {
            if (post.userId == friendId) {
                tempArray.push({
                    userId: post.userId,
                    timeStamp: increasedStamp,
                    body: post.body,
                    postId: post.id
                }
                )
            }
        })
        // console.log(tempArray)
        // console.log(this.state.posts)
        this.setState({ newFriendPosts: tempArray }, () => this.addFriendPosts())
    }


    addFriendPosts = async () => {
        console.log("in add Friend posts!!!!!!!!!!")
        let FriendPostsArray = this.state.newFriendPosts
        let userPostsArray = this.state.userPosts
        let allPostsArray = []
        FriendPostsArray.map(post => {
            allPostsArray.push(post)
        })
        userPostsArray.map(post => {
            allPostsArray.push(post)
        })
        // console.log(allPostsArray)
        await this.setState({ userPosts: allPostsArray })
        this.state.userPosts.sort((a, b) => parseInt(b.timeStamp) - parseInt(a.timeStamp))
        // console.log(this.state.userPosts)
        // this.state.userPosts.sort((a, b) => parseInt(b.timeStamp) - parseInt(a.timeStamp))
        this.setState({ filteredPosts: this.state.userPosts })
    }


    addPost = () => {
        let increasedStamp = this.state.timeStamp + 1
        let newPostId = this.state.extraPostId + 1
        this.setState({extraPostId: newPostId})
        this.setState({ timeStamp: increasedStamp }, () => {
            console.log("in updateUserPosts")
            let tempArray = this.state.userPosts
            let newPost = {
                body: this.state.newPost,
                timeStamp: this.state.timeStamp,
                userId: this.state.userId,
                userName: this.state.userName,
                postId: newPostId
            }
            tempArray.push(newPost)
            this.setState({ userPosts: tempArray })
            this.state.userPosts.sort((a, b) => parseInt(b.timeStamp) - parseInt(a.timeStamp))
            this.setState({ filteredPosts: this.state.userPosts })
            this.clearPost()
        })
        // tempArray.sort((a, b) => parseInt(b.timeStamp) - parseInt(a.timeStamp))
        // this.setState({userPosts: tempArray})
    }

    clearPost = () => {
        this.setState({ newPost: "" })
    }

    handleStatusChange = newStatus => {
        let tempArray = this.state.allStatus
        let idx = this.state.userId - 1
        tempArray[idx] = newStatus
        localStorage.setItem("allStatus", tempArray)
        this.setState({ status: newStatus })
    }

    handleSearch = e => {
        this.setState({ searchPost: e.target.value }, () => this.filterPost())
    }


    filterPost = () => {
        let filtered = this.state.userPosts.filter(post => {
            return post.body.toLowerCase().includes(this.state.searchPost.toLowerCase())
        })
        this.setState({ filteredPosts: filtered })
        // console.log(this.state.filteredPosts)
    }


    removeFriend = async friendId => {
        this.setState({ newFriendName: "" })
        this.setState({ newFriendPosts: "" })

        let friendsArray = this.state.friends
        let idx
        this.state.friends.map((friend, index) => {
            if (friend.id === friendId) {
                idx = index
            }
        })
        friendsArray.splice(idx, 1)
        this.setState({ friends: friendsArray })

        let postsArray = this.state.userPosts
        // let idx2
        // console.log(friendId)
        // console.log(typeof friendId)


        let toRemove = []
        postsArray.map((post) => {
            if (post.userId === friendId){
                toRemove.push(post.body)
            }
        })
        postsArray = postsArray.filter(post => 
            !toRemove.includes(post.body)
        )
        await this.setState({ userPosts: postsArray })

        this.state.userPosts.sort((a, b) => parseInt(b.timeStamp) - parseInt(a.timeStamp))
        this.setState({ filteredPosts: this.state.userPosts })
    }


    render() {
        // if(!localStorage.getItem('userId')) {
        //     return <Redirect to='/' push></Redirect>
        // }
        return (
            <div>
                <Row>
                    <div className="" col-lg-6>
                        <div>
                            <User username={this.state.users ? this.state.users[this.state.userId - 1].username : ''}
                                status={this.state.status ? this.state.status : ''}
                                updateStatus={this.handleStatusChange} />


                            <Card style={{ width: '25rem' }}>
                                <div className="text-center">

                                    {this.state.friends ? this.state.friends.map(friend => (
                                        <Friend friendName={friend.username}
                                            friendStatus={this.state.allStatus ? this.state.allStatus[friend.id - 1] : ''}
                                            friendId={friend.id}
                                            removeFriend={this.removeFriend} />
                                    )) : ''}
                                </div>

                                {/* {this.state.friends.map(friend => (
                                    <Friend friendName={this.state.friends ? friend.username : ''}
                                        friendStatus={this.state.friends ? friend.company.catchPhrase : ''} />
                                ))} */}

                                <div className="text-center">
                                    <input
                                        id="newFriendName"
                                        className="mt-2 ml-3"
                                        size="30"
                                        name="newFriendName"
                                        value={this.state.newFriendName}
                                        onChange={this.change}
                                        placeholder="User">
                                    </input>
                                    <Button className="mb-1 ml-4" variant="primary" onClick={this.addFriend}>Add</Button>
                                </div>
                            </Card>



                            {/* {this.state.array.map(number => (
                                <Friend></Friend>
                            ))} */}
                            {/* <Friend></Friend> */}
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <Card style={{ width: '70rem' }}>
                            {/* <div className="text-center"> */}
                            <Card.Body>



                                <div className="text-center">
                                    <div className="Row">
                                    
                                        <input className="text-center" type="file" />
                                      
                                        <textarea type="text" name="newPost" value={this.state.newPost}
                                            onChange={this.change} placeholder="Your post here" />

                                        {/* <FormControl placeholder="Your post here" as="textarea" 
                                    value={this.state.newPost} onChange={this.change}/> */}
                                    </div>




                                    <div className="Row">
                                        <Button variant="primary" onClick={this.clearPost}>Cancel</Button>
                                        <Button className="ml-2" variant="primary" onClick={this.addPost}>Post</Button>
                                    </div>
                                </div>


                            </Card.Body>
                            {/* </div> */}
                        </Card>

                        <Card style={{ width: '70rem' }}>
                            <div className="text-center">
                                <input size="40" type="text" onChange={this.handleSearch} placeholder="search here" />
                            </div>

                        </Card>



                        {/* <div>
                            {this.state.userPosts.map(userPost => (
                                <Post postText={this.state.userPosts ? userPost.body : ''} />
                            )
                            )}
                        </div> */}

                        <div >
                            {
                                this.state.filteredPosts ? this.state.filteredPosts.map(post => (
                                    <Post postText={post.body} 
                                          postId={post.postId}/>
                                ))
                                    :
                                    ''
                            }
                        </div>


                    </div>
                </Row>

            </div>
        )
    }
}

export default Main
