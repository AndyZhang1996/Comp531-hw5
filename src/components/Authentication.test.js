import React from 'react';
import ReactDOM from 'react-dom'
import Enzyme, { shallow } from 'enzyme'
import jsdom from 'jsdom'
import Adapter from 'enzyme-adapter-react-16'
import Login from './Landing/Login'
import User from './Main/User'

Enzyme.configure({ adapter: new Adapter() })

// let data
// let wrapper = shallow(<Login />);
// async function fetchItems() {
//     console.log("in fetch items in test!!!!!!!!!!!!")
//     const returned = await fetch(
//         'https://jsonplaceholder.typicode.com/users'
//     );
//     const items = await returned.json()
//     return items
// }

// const data = fetchItems()
// console.log(data)

describe('Validate Authentication', () => {
    // let wrapper

    // beforeEach(async () => {
    // const returned = await fetch(
    //     'https://jsonplaceholder.typicode.com/users'
    // );
    // const items = await returned.json()
    // let data = items
    // // console.log(data)
    //  


    //     wrapper = shallow(<Login />);
    //     const instance = wrapper.instance()
    //     instance.fetchItems()
    // })
    // const fetchItems = async () => {
    //     const returned = await fetch(
    //         'https://jsonplaceholder.typicode.com/users'
    //     );
    //     const items = await returned.json()
    //     data = items
    // }

    // console.log(data)


    it('should log in previously registered user', async () => {
        let wrapper = shallow(<Login />)
        const instance = wrapper.instance()
        await instance.fetchItems()
        const data = wrapper.state().data
        // console.log(data[0])

        data.map(each => {
            // console.log(each.username)
            // console.log(each.address.street)
            wrapper.find('input[name="userName"]').simulate('change', { target: { name: 'userName', value: each.username } })
            wrapper.find('input[name="password"]').simulate('change', { target: { name: 'password', value: each.address.street } })
            wrapper.find('button').simulate('click')
            expect(wrapper.state().redirectMain).toBe(true)
        })
    })

    it('should not log in an invalid user', async () => {
        window.alert = () => {}
        let wrapper = shallow(<Login />)
        const instance = wrapper.instance()
        await instance.fetchItems()
        wrapper.find('input[name="userName"]').simulate('change', { target: { name: 'userName', value: "an invalid user" } })
        wrapper.find('input[name="password"]').simulate('change', { target: { name: 'password', value: "some password" } })
        wrapper.find('button').simulate('click')
        expect(wrapper.state().redirectMain).toBe(false)
    })

    it('should not log in an invalid user', async () => {
        let wrapper = shallow(<Login />)
        const instance = wrapper.instance()
        await instance.fetchItems()
        wrapper.find('input[name="userName"]').simulate('change', { target: { name: 'userName', value: "an invalid user" } })
        wrapper.find('input[name="password"]').simulate('change', { target: { name: 'password', value: "some password" } })
        wrapper.find('button').simulate('click')
        expect(wrapper.state().userValid).toBe(false)
    })


    it('should log out a user', async () => {
        //simulate user Bret successfully log in 
        let wrapper2 = shallow(<Login />)
        const instance2 = wrapper2.instance()
        await instance2.fetchItems()
        wrapper2.find('input[name="userName"]').simulate('change', { target: { name: 'userName', value: 'Bret' } })
        wrapper2.find('input[name="password"]').simulate('change', { target: { name: 'password', value: 'Kulas Light' } })
        wrapper2.find('button').simulate('click')

        let wrapper = shallow(<User />)
        const instance = wrapper.instance()
        // console.log(wrapper.state())
        // console.log(localStorage.getItem("userId"))
        // console.log(localStorage.getItem("userValid"))
        wrapper.find('button').at(0).simulate('click')
        // console.log(localStorage.getItem("userId"))
        // console.log(localStorage.getItem("userValid"))
        expect(localStorage.getItem("userId")).toBe("")
        expect(localStorage.getItem("userValid")).toBe("")
    })

    
})

