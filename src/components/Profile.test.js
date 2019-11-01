import React from 'react';
import ReactDOM from 'react-dom'
import Enzyme, { shallow } from 'enzyme'
import jsdom from 'jsdom'
import Adapter from 'enzyme-adapter-react-16'
import Update from './Profile/Update'

Enzyme.configure({ adapter: new Adapter() })

describe('Validate Profile', () => {
    it('should fetch the logged in users profile informaiton', async () => {
        let wrapper = shallow(<Update />)
        const instance = wrapper.instance()
    

        // console.log(localStorage.getItem("userId"))
        // localStorage.setItem("userId", 1)
        // console.log(localStorage.getItem("userId"))
        wrapper.state().userId = 1
        // console.log(wrapper.state())
        await instance.fetchUsers()
        await instance.submitHandler()
        
        expect(wrapper.state().validUserName).toBe("Bret")
    })
})