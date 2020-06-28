import React, { useState as useStateMock } from 'react';

import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });


import PostInput from './components/PostInput';
import LastSeen from './components/LastSeen';



describe('<LastSeen/>', () => {
	it('just now', () => {
		const Result = shallow(<LastSeen date={new Date('2020-05-27T18:22:25.026+00:00')} />);
		expect(Result.text().startsWith('Date:')).toBeTruthy();
	});
});


