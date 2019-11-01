import React from 'react';
import ReactDOM from 'react-dom'
import Enzyme, { shallow } from 'enzyme'
import jsdom from 'jsdom'
import Adapter from 'enzyme-adapter-react-16'
import Main from './Main/Main'

Enzyme.configure({ adapter: new Adapter() })

describe('Validate Article', () => {
    it('should fetch articles for current logged in user', async () => {
        let wrapper = shallow(<Main />)
        const instance = wrapper.instance()
        // console.log(localStorage.getItem("userId"))
        // localStorage.setItem("userId", 1)
        // console.log(localStorage.getItem("userId"))
        wrapper.state().userId = 1
        // console.log(wrapper.state())
        await instance.fetchUsers()
        await instance.getUserName()
        await instance.fetchPosts()
        await instance.getUserPosts()
        expect(wrapper.state().userPosts.length).toBe(10)
    })

    it('should filter displayed articles by search keyword', async () => {
        let wrapper = shallow(<Main />)
        const instance = wrapper.instance()
        wrapper.state().userId = 1
        await instance.fetchUsers()
        await instance.getUserName()
        await instance.fetchPosts()
        await instance.getUserPosts()

        wrapper.state().searchPost = "quia et"
        await instance.filterPost()
        expect(wrapper.state().filteredPosts.length).toBe(1)
        // console.log(wrapper.state().filteredPosts)

        
    })

    it('should add articles when adding a follower', async () => {
        let wrapper = shallow(<Main />)
        const instance = wrapper.instance()
        wrapper.state().userId = 1
        await instance.fetchUsers()
        await instance.getUserName()
        await instance.fetchPosts()
        await instance.getUserPosts()

        wrapper.state().newFriendName = "Antonette"
        console.log(wrapper.state().newFriendName)
        await instance.addFriend()
        expect(wrapper.state().filteredPosts.length).toBe(20)
        // console.log(wrapper.state().filteredPosts.length)
    })

    it('should remove articles when removing a follower', async () => {
        let wrapper = shallow(<Main />)
        const instance = wrapper.instance()
        wrapper.state().userId = 1
        await instance.fetchUsers()
        await instance.getUserName()
        await instance.fetchPosts()
        // await instance.getUserPosts()

        wrapper.state().newFriendName = "Antonette"
        // console.log(wrapper.state().newFriendName)
        await instance.addFriend()
        // console.log(wrapper.state().friends)
        expect(wrapper.state().filteredPosts.length).toBe(20)
        // console.log(wrapper.state().newFriendPosts.length)
        await instance.removeFriend(2)
        // console.log(wrapper.state().friends)
        expect(wrapper.state().filteredPosts.length).toBe(10)
        // console.log(wrapper.state().filteredPosts.length)

        instance.addPost()
        // instance.handleStatusChange()
    })
})