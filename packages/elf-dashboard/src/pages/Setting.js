import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  TabContent,
  TabPane,
  Col,
  Row,
  Nav,
  NavItem,
  NavLink,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  Table,
} from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import jwt from 'jsonwebtoken';
import classnames from 'classnames';
import AccountSettingForm from './account/AccountSettingForm';
import PasswordForm from './account/PasswordForm';
import StoreSettingForm from './setting/StoreSettingForm';
import CredentialListItem from './setting/CredentialListItem';
import { FormContext } from './contexts';
import config from '../config';

const Setting = props => {
  const { history } = props;
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    setActiveTab(tab);
  };

  const handleApiSettingSubmit = () => {};
  const {
    data: { storeId, accountId },
  } = jwt.decode(localStorage.getItem(config.accessTokenKey));

  return (
    <FormContext.Provider value={{ storeId, id: accountId }}>
      <div className="page-navbar">
        <div className="page-name">
          <FormattedMessage id="sys.settings" />
        </div>
        <Breadcrumb>
          <BreadcrumbItem>
            <Button color="link" onClick={() => history.push('/dashboard')}>
              <FormattedMessage id="sys.dashboard" />
            </Button>
          </BreadcrumbItem>
          <BreadcrumbItem active>
            <FormattedMessage id="sys.settings" />
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div className="content-body">
        <div>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === '1',
                })}
                onClick={() => {
                  toggle('1');
                }}
              >
                <FormattedMessage id="sys.storeSettings" />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === '2',
                })}
                onClick={() => {
                  toggle('2');
                }}
              >
                <FormattedMessage id="sys.acctSettings" />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === '3',
                })}
                onClick={() => {
                  toggle('3');
                }}
              >
                <FormattedMessage id="sys.credentials" />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === '4',
                })}
                onClick={() => {
                  toggle('4');
                }}
              >
                <FormattedMessage id="sys.pwd" />
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent
            activeTab={activeTab}
            className="bg-white padding-v20 padding-h20"
          >
            <TabPane tabId="1">
              <StoreSettingForm storeId={storeId} />
            </TabPane>
            <TabPane tabId="2">
              <AccountSettingForm onSubmit={handleApiSettingSubmit} />
            </TabPane>
            <TabPane tabId="3">
              <Row>
                <Col md={12}>
                  <Table>
                    <thead className="table-header">
                      <tr>
                        <th>
                          <FormattedMessage id="sys.company" />
                        </th>
                        <th>
                          <FormattedMessage id="sys.apiKey" />
                        </th>
                        <th>
                          <FormattedMessage id="sys.apiSecret" />
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <CredentialListItem
                        logo="http://mediad.publicbroadcasting.net/p/wkar/files/styles/medium/public/201706/10398927_9465478123_740_n.jpg"
                        apiKey="13adfjkE23hrjkFESfjk2hjk3hkErjkFE122j"
                        apiSecret="1kE23hrjkESfjasdfjkE23hrjkFESfjk2hjkE23hrjkFESfj3421D"
                      />
                      <CredentialListItem
                        logo="https://cdn.logojoy.com/wp-content/uploads/2017/07/Etsy_logo.png"
                        apiKey="12323kE23hrjkF4jk2hjk3hDSF3hrjkFESfj"
                        apiSecret="j23asd12323kE23hrjkF4jk2hjk3hDSF3hrjkFESfjfjkE23hrjk"
                      />
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="4">
              <Row>
                <Col md={{ size: 6 }}>
                  <PasswordForm
                    onSubmit={this.handleApiSettingSubmit}
                    storeId={storeId}
                    accountId={accountId}
                  />
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </div>
      </div>
    </FormContext.Provider>
  );
};

Setting.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(Setting);
