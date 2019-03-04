import 'jsdom-global/register'; //at the top of file , even  , before importing react
import React from 'react';
import axios from 'axios';

import sinon from 'sinon';
import { shallow, mount } from 'enzyme';

import TempChart from '../TempChart';

describe('TempChart', () => {
  const result = {
    temperature: 23
  };
  const promise = Promise.resolve(result);

  beforeAll(() => {
    sinon
      .stub(axios, 'get')
      .withArgs('http://cassusa.go.ro:3001/api/statuspompa')
      .returns(promise);
  });

  afterAll(() => {
    axios.get.restore();
  });

  it('stores temp in local state', (done) => {
    const wrapper = shallow(<TempChart />);
    expect(wrapper.state().temperature).toEqual('');
    promise.then(() => {
      wrapper.update();
      expect(wrapper.state().temperature).toEqual(result.temperature);
      done();
    });
  });

  // it('renders temp when it fetched data successfully', (done) => {
  //   const wrapper = mount(<TempChart />);
  //   // expect(wrapper.find('h5').text()).toEqual('Loading ...');
  //   promise.then(() => {
  //     wrapper.update();
  //     expect(wrapper.find('h5')).toHaveLength(2);
  //     done();
  //   });
  // });
});