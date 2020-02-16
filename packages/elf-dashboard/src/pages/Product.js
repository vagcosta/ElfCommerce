import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb, BreadcrumbItem, Button, Row, Col } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { FormattedMessage } from 'react-intl';
import ProductForm from './product/ProductForm';
import { FormContext } from './contexts';
import config from '../config';

class Product extends Component {
  render() {
    const {
      history,
      match: {
        path,
        params: { id },
      },
    } = this.props;
    const {
      data: { storeId },
    } = jwt.decode(localStorage.getItem(config.accessTokenKey));

    return (
      <FormContext.Provider value={{ storeId, id }}>
        <div className="page-navbar">
          <div className="page-name">
            <FormattedMessage id="sys.product" />
          </div>
          <Breadcrumb>
            <BreadcrumbItem>
              <Button color="link" onClick={() => history.push('/dashboard')}>
                <FormattedMessage id="sys.dashboard" />
              </Button>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Button color="link" onClick={() => history.push('/products')}>
                <FormattedMessage id="sys.products" />
              </Button>
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <FormattedMessage id="sys.product" />
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="content-body">
          <Row>
            <Col md={12}>
              <ProductForm mode={path === '/new-product' ? 'new' : 'update'} />
            </Col>
          </Row>
        </div>
      </FormContext.Provider>
    );
  }
}

Product.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default withRouter(Product);
