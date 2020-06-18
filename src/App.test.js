import React, { useContext, useState } from 'react';
import { render } from '@testing-library/react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import { PostInput } from './components/PostInput';

import { SocialMediaContext } from './components/Context';

// describe("PostInput1" , ()=>{
//   let Wrapper;
//   beforeEach(()=>{
//     function hooks() {
//       const { User_Name, id, AddPostCall } = useContext(SocialMediaContext);
//       Wrapper = shallow(<PostInput WritePost={WritePost()}  User_Name={User_Name} id={id} AddPostCall={AddPostCall} useState={PostCaption}/>);
//       return Wrapper
//     }
//   })

//   it("write post" , ()=>{
//     const find = Wrapper.find(WritePost).simulate('click');
//     const TestWritePost = jest.fn(find);
//     expect(TestWritePost).toBeTruthy();
//   })

//   it("input handler" , ()=>{
//     Wrapper.find("#idtest").simulate('click');
//     expect(Wrapper.find(PostCaption)).toBeFalsy();
//   })

// });

// describe("Write post" , ()=>{
//   const TestWritePost = jest.fn(WritePost);
//   it("toBeTruthy" , ()=>{
//     expect(TestWritePost).toBeTruthy();
//   })
// })

describe('<PostInput/>', () => {
	let Wrapper;
  beforeEach(()=>{
    function hooks() {
      Wrapper = shallow(<PostInput/>);
      return Wrapper
    }
  })

  it("test" , ()=>{
    console.log(Wrapper);
    const input =  Wrapper.find('.PostCaption')
    expect(input.props().value).toBe(null)
  })
});
