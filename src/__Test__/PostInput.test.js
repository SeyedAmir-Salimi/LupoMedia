import React, { useState as useStateMock } from 'react';

import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import { act } from "react-dom/test-utils";
import PostInput from '../components/PostInput';

import { SocialMediaContext } from '../components/Context';

describe('<PostInput/>', () => {
	let wrapper;

	const setState = jest.fn();
	const useStateSpy = jest.spyOn(React, 'useState')
	useStateSpy.mockImplementation((init) => [init, setState]);


	beforeEach(() => {
		const myValue = {
			User_Name: 'nader',
			id: '0111',
			AddPostCall: jest.fn()
		};

		afterEach(() => {
			jest.clearAllMocks();
		});

		wrapper = mount(
			<SocialMediaContext.Provider value={myValue}>
				<PostInput />
			</SocialMediaContext.Provider>
		);
	});

	it('has value set to empty string', () => {
		const input = wrapper.find('.PostCaption');
		expect(input.props().value).toBe('');
	});

	it('postinput form', () => {
		const input = wrapper.find('.PostInput');
		expect(input.props().disabled).toBeTruthy();
	});

	describe('While making a post', () => {
		const newValue = 'I am happy';
		beforeEach(() => {
			let input = wrapper.find('.PostCaption');
			input.simulate('change', {
				target: { name: 'PostCaption', value: newValue }
			});
		});

		it(`sets the value to ${newValue}`, () => {
			const inputValue = wrapper.find('.PostCaption');
			expect(inputValue.props().value).toBe(newValue);
		});
	});

	describe('the form can be submitte', () => {
		it(`the input field is cleared`, () => {
			act(() => {
				const form = wrapper.find('.PostInput');
				form.simulate('submit', {
					preventDefault: () => {}
				});
			});
			const input = wrapper.find('.PostCaption');
			expect(input.props().value).toBe('');
		});

	});

	describe('Zero', () => {
		beforeEach(() => {
			let myCLick = wrapper.find('#zero-count')
			myCLick.simulate("click");
		});
		it('calls setCount with 0', () => {

			// act(() => {
			// 	let myCLick = wrapper.find('#zero-count')
			// 	myCLick.simulate("click");
			// });
		  expect(setState).toHaveBeenCalled(1)
		});
	  });


});
