import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb, BreadcrumbItem, Button, Col } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { FormattedMessage } from 'react-intl';
import AccountForm from './account/AccountForm';
import { FormContext } from './contexts';
import config from '../config';

const Account = props => {
  const {
    history,
    match: {
      path,
      params: { id },
    },
  } = props;
  const {
    data: { storeId },
  } = jwt.decode(localStorage.getItem(config.accessTokenKey));

  return (
    <FormContext.Provider value={{ storeId, id }}>
      <div className="page-navbar">
        <div className="page-name">
          <FormattedMessage id="sys.account" />
        </div>
        <Breadcrumb>
          <BreadcrumbItem>
            <Button color="link" onClick={() => history.push('/dashboard')}>
              <FormattedMessage id="sys.dashboard" />
            </Button>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Button color="link" onClick={() => history.push('/accounts')}>
              <FormattedMessage id="sys.accounts" />
            </Button>
          </BreadcrumbItem>
          <BreadcrumbItem active>
            <FormattedMessage id="sys.account" />
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div className="content-body">
        <div className="table-container">
          <Col md={12} className="table-content">
            <AccountForm mode={path === '/new-account' ? 'new' : 'update'} />
          </Col>
        </div>
      </div>
    </FormContext.Provider>
  );
};

Account.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default withRouter(Account);
