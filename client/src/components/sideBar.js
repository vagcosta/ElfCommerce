import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Container, Collapse } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import {
  FiMenu,
  FiShoppingCart,
  FiShoppingBag,
  FiBarChart2,
  FiGrid,
  FiDollarSign,
  FiHome,
  FiSettings,
} from 'react-icons/fi';
import {
  FaCaretLeft,
  FaCaretDown,
  FaWarehouse,
  FaIndustry,
} from 'react-icons/fa';
import {
  productMenuOpen,
  productMenuClose,
  reportMenuOpen,
  reportMenuClose,
} from '../actions';

class SideBarContent extends Component {
  constructor(props) {
    super(props);
    this.state = { collapse: false };
  }

  onProductMenuClick = () => {
    const { dispatch, productMenu } = this.props;

    if (productMenu) {
      dispatch(productMenuClose());
    } else {
      dispatch(productMenuOpen());
      dispatch(reportMenuClose());
    }
  };

  onReportMenuClick = () => {
    const { dispatch, reportMenu } = this.props;

    if (reportMenu) {
      dispatch(reportMenuClose());
    } else {
      dispatch(reportMenuOpen());
      dispatch(productMenuClose());
    }
  };

  render() {
    const {
      productMenu,
      reportMenu,
      location: { pathname },
    } = this.props;
    const currentPath = pathname.split('/')[1];

    return (
      <Container className="sidebar-container">
        <br />
        <div className={`sidebar-link${currentPath === 'dashboard' ? ' active' : ''}`}>
          <Link to="/dashboard">
            <FiHome className="sidebar-icon" />
            <FormattedMessage id="sys.dashboard" />
          </Link>
        </div>
        <div className={`sidebar-link${currentPath === 'orders' ? ' active' : ''}`}>
          <Link to="/orders">
            <FiShoppingCart className="sidebar-icon" />
            <FormattedMessage id="sys.orders" />
          </Link>
        </div>
        <div
          className="sidebar-link"
          onClick={this.onProductMenuClick}
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <div style={{ cursor: 'pointer' }}>
            <FiMenu className="sidebar-icon" />
            <span style={{ color: '#ddd', fontSize: 14 }}>
              <FormattedMessage id="sys.inventory" />
            </span>
          </div>
          <div style={{ color: '#ddd', marginRight: 10, cursor: 'pointer' }}>
            {productMenu ? <FaCaretDown /> : <FaCaretLeft />}
          </div>
        </div>
        <Collapse isOpen={productMenu} className="sidebar-open">
          <div className={`sidebar-link sub-menu${currentPath === 'categories' ? ' active' : ''}`}>
            <Link to="/categories">
              <FiGrid className="sidebar-icon" />
              <FormattedMessage id="sys.categories" />
            </Link>
          </div>
          <div className={`sidebar-link sub-menu${currentPath === 'products' ? ' active' : ''}`}>
            <Link to="/products">
              <FiShoppingBag className="sidebar-icon" />
              <FormattedMessage id="sys.products" />
            </Link>
          </div>
          <div className={`sidebar-link sub-menu${currentPath === 'suppliers' ? ' active' : ''}`}>
            <Link to="/suppliers">
              <FaWarehouse className="sidebar-icon" />
              <FormattedMessage id="sys.suppliers" />
            </Link>
          </div>
          <div className={`sidebar-link sub-menu${currentPath === 'manufacturers' ? ' active' : ''}`}>
            <Link to="/manufacturers">
              <FaIndustry className="sidebar-icon" />
              <FormattedMessage id="sys.manufacturers" />
            </Link>
          </div>
        </Collapse>
        <div
          className="sidebar-link"
          onClick={this.onReportMenuClick}
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <div style={{ cursor: 'pointer' }}>
            <FiBarChart2 className="sidebar-icon" />
            <span style={{ color: '#ddd', fontSize: 14 }}>
              <FormattedMessage id="sys.reports" />
            </span>
          </div>
          <div style={{ color: '#ddd', marginRight: 10, cursor: 'pointer' }}>
            {reportMenu ? <FaCaretDown /> : <FaCaretLeft />}
          </div>
        </div>
        <Collapse isOpen={reportMenu} className="sidebar-open">
          <div className={`sidebar-link sub-menu${currentPath === 'sales-reports' ? ' active' : ''}`}>
            <Link to="/sales-reports">
              <FiDollarSign className="sidebar-icon" />
              <FormattedMessage id="sys.salesReports" />
            </Link>
          </div>
        </Collapse>
        <div className={`sidebar-link${currentPath === 'settings' ? ' active' : ''}`}>
          <Link to="/settings">
            <FiSettings className="sidebar-icon" />
            <FormattedMessage id="sys.settings" />
          </Link>
        </div>
      </Container >
    );
  }
}

SideBarContent.propTypes = {
  dispatch: PropTypes.func.isRequired,
  productMenu: PropTypes.bool.isRequired,
  reportMenu: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  productMenu: state.pathReducer.productMenu,
  reportMenu: state.pathReducer.reportMenu,
});

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(SideBarContent)
);
