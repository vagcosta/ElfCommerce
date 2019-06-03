import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Col, Button, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { FormattedMessage } from 'react-intl';
import CategoryForm from './category/CategoryForm';
import { FormContext } from './contexts';
import config from '../config';

const ProductCategory = props => {
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
          <FormattedMessage id="sys.category" />
        </div>
        <Breadcrumb>
          <BreadcrumbItem>
            <Button color="link" onClick={() => history.push('/dashboard')}>
              <FormattedMessage id="sys.dashboard" />
            </Button>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Button color="link" onClick={() => history.push('/categories')}>
              <FormattedMessage id="sys.categories" />
            </Button>
          </BreadcrumbItem>
          <BreadcrumbItem active>
            <FormattedMessage id="sys.category" />
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div className="content-body">
        <div className="table-container">
          <Col md={12} className="table-content">
            <CategoryForm mode={path === '/new-category' ? 'new' : 'update'} />
          </Col>
        </div>
      </div>
    </FormContext.Provider>
  );
};

ProductCategory.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default withRouter(ProductCategory);
