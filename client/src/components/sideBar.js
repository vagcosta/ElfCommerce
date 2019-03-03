import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Container, Collapse } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import {
  MdDashboard,
  MdViewList,
  MdChevronLeft,
  MdExpandMore,
  MdSettings,
  MdShowChart,
  MdShoppingCart,
  MdPieChart,
  MdShoppingBasket,
  MdStore,
  MdLocationCity,
  MdAttachMoney,
  MdPeople,
} from 'react-icons/md';
import {
  productMenuOpen,
  productMenuClose,
  reportMenuOpen,
  reportMenuClose,
} from '../modules/ui';

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
            <MdDashboard className="sidebar-icon" />
            <FormattedMessage id="sys.dashboard" />
          </Link>
        </div>
        <div className={`sidebar-link${currentPath.indexOf('order') !== -1 ? ' active' : ''}`}>
          <Link to="/orders">
            <MdShoppingCart className="sidebar-icon" />
            <FormattedMessage id="sys.orders" />
          </Link>
        </div>
        <div
          className="sidebar-link"
          onClick={this.onProductMenuClick}
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <div style={{ cursor: 'pointer' }}>
            <MdViewList className="sidebar-icon" />
            <span style={{ color: '#ddd', fontSize: 14 }}>
              <FormattedMessage id="sys.inventory" />
            </span>
          </div>
          <div style={{ color: '#ddd', marginRight: 10, cursor: 'pointer' }}>
            {productMenu ? <MdExpandMore /> : <MdChevronLeft />}
          </div>
        </div>
        <Collapse isOpen={productMenu} className="sidebar-open">
          <div className={`sidebar-link sub-menu${currentPath.indexOf('categor') !== -1 ? ' active' : ''}`}>
            <Link to="/categories">
              <MdPieChart className="sidebar-icon" />
              <FormattedMessage id="sys.categories" />
            </Link>
          </div>
          <div className={`sidebar-link sub-menu${currentPath.indexOf('product') !== -1 ? ' active' : ''}`}>
            <Link to="/products">
              <MdShoppingBasket className="sidebar-icon" />
              <FormattedMessage id="sys.products" />
            </Link>
          </div>
          <div className={`sidebar-link sub-menu${currentPath.indexOf('supplier') !== -1 ? ' active' : ''}`}>
            <Link to="/suppliers">
              <MdStore className="sidebar-icon" />
              <FormattedMessage id="sys.suppliers" />
            </Link>
          </div>
          <div className={`sidebar-link sub-menu${currentPath.indexOf('manufacturer') !== -1 ? ' active' : ''}`}>
            <Link to="/manufacturers">
              <MdLocationCity className="sidebar-icon" />
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
            <MdShowChart className="sidebar-icon" />
            <span style={{ color: '#ddd', fontSize: 14 }}>
              <FormattedMessage id="sys.reports" />
            </span>
          </div>
          <div style={{ color: '#ddd', marginRight: 10, cursor: 'pointer' }}>
            {reportMenu ? <MdExpandMore /> : <MdChevronLeft />}
          </div>
        </div>
        <Collapse isOpen={reportMenu} className="sidebar-open">
          <div className={`sidebar-link sub-menu${currentPath === 'sales-reports' ? ' active' : ''}`}>
            <Link to="/sales-reports">
              <MdAttachMoney className="sidebar-icon" />
              <FormattedMessage id="sys.salesReports" />
            </Link>
          </div>
        </Collapse>
        <div className={`sidebar-link${currentPath.indexOf('account') !== -1 ? ' active' : ''}`}>
          <Link to="/accounts">
            <MdPeople className="sidebar-icon" />
            <FormattedMessage id="sys.accounts" />
          </Link>
        </div>
        <div className={`sidebar-link${currentPath === 'settings' ? ' active' : ''}`}>
          <Link to="/settings">
            <MdSettings className="sidebar-icon" />
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
