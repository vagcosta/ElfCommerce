import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb, BreadcrumbItem, Button, Col } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { FormattedMessage } from 'react-intl';
import SupplierForm from './supplier/SupplierForm';
import config from '../config';

class Supplier extends Component {
  render() {
    const { history, match: { path } } = this.props;
    const { data: { storeId } } = jwt.decode(localStorage.getItem(config.accessTokenKey));

    return (
      <div>
        <div className="page-navbar">
          <div className="page-name"><FormattedMessage id="sys.supplier" /></div>
          <Breadcrumb>
            <BreadcrumbItem>
              <Button color="link" onClick={() => history.push('/dashboard')}>
                <FormattedMessage id="sys.dashboard" />
              </Button>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Button color="link" onClick={() => history.push('/suppliers')}>
                <FormattedMessage id="sys.suppliers" />
              </Button>
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <FormattedMessage id="sys.supplier" />
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="content-body">
          <div className="table-container">
            <Col md={12} className="table-content">
              <SupplierForm
                mode={path === '/new-supplier' ? 'new' : 'update'}
                storeId={storeId}
              />
            </Col>
          </div>
        </div>
      </div>
    );
  }
}

Supplier.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};


export default withRouter(Supplier);
