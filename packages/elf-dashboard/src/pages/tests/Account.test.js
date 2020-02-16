import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import jwt from 'jsonwebtoken';
import { Breadcrumb, BreadcrumbItem, Button, Col } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
const moment = require('moment');
import { Account } from '../Account';
import storageMock from './mockLocalStorage';
import config from '../../config';

configure({ adapter: new Adapter() });

describe('<Account />', () => {
  it('should render the Account component', () => {
    window.localStorage = storageMock();
    const accessToken = jwt.sign(
      {
        data: {
          accountId: 'acct',
          storeId: '123',
          expiry: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
        },
      },
      'tokenSecret'
    );
    localStorage.setItem(config.accessTokenKey, accessToken);
    const wrapper = shallow(<Account history={{}} match={{ path: '' }} />);

    expect(wrapper.find('div').at(1).hasClass('page-navbar')).toBe(true);
  });
});