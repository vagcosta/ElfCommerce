import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Row, Col, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import jwt from 'jsonwebtoken';
import { FormattedMessage } from 'react-intl';
import OrderForm from './order/OrderForm';
import { FormContext } from './contexts';
import config from '../config';

const Order = props => {
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
          <FormattedMessage id="sys.order" />
        </div>
        <Breadcrumb>
          <BreadcrumbItem>
            <Button color="link" onClick={() => history.push('/dashboard')}>
              <FormattedMessage id="sys.dashboard" />
            </Button>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Button color="link" onClick={() => history.push('/orders')}>
              <FormattedMessage id="sys.orders" />
            </Button>
          </BreadcrumbItem>
          <BreadcrumbItem active>
            <FormattedMessage id="sys.order" />
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div className="content-body">
        <Row>
          <Col md={12}>
            <OrderForm mode={path === '/new-order' ? 'new' : 'update'} />
          </Col>
        </Row>
      </div>
    </FormContext.Provider>
  );
};

Order.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default withRouter(Order);
