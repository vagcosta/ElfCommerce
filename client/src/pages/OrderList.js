import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Table,
  Col,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  InputGroup,
  Input,
  InputGroupAddon,
} from 'reactstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { injectIntl, FormattedMessage } from 'react-intl';
import { MdSearch, MdAddCircleOutline } from 'react-icons/md';
import ReactPaginate from 'react-paginate';
import jwt from 'jsonwebtoken';
import 'react-datepicker/dist/react-datepicker.css';
import { fetchOrders } from '../actions';
import OrderListItem from './order/OrderListItem';
import { Loader } from '../components';
import config from '../config';

class OrderList extends Component {
  constructor(props) {
    super(props);
    const { data: { storeId } } = jwt.decode(localStorage.getItem(config.accessTokenKey));

    this.state = {
      pageSize: 20,
      storeId,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(
      fetchOrders(
        {
          storeId: this.state.storeId,
          pageSize: this.state.pageSize,
          pageNo: 1,
        }
      )
    );
  }

  onViewClick = id => {
    const { history } = this.props;
    history.push(`/orders/${id}`);
  };

  onPageChange = page => {
    const { dispatch } = this.props;
    dispatch(
      fetchOrders(
        {
          storeId: this.state.storeId,
          pageSize: this.state.pageSize,
          pageNo: page.selected + 1,
        }
      )
    );
  }

  render() {
    const {
      orders,
      history,
      total,
      count,
      loaded,
      intl: { formatMessage },
    } = this.props;

    return (
      <div>
        <div className="page-navbar">
          <div className="page-name"><FormattedMessage id="sys.orders" /></div>
          <Breadcrumb>
            <BreadcrumbItem>
              <Button
                color="link"
                onClick={() => this.props.history.push('/dashboard')}
              >
                <FormattedMessage id="sys.dashboard" />
              </Button>
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <FormattedMessage id="sys.orders" />
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="content-body">
          <div className="table-container">
            <Col md={12} className="table-content">
              {
                !loaded ? <Loader /> :
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div>
                        <InputGroup size="sm">
                          <Input placeholder={formatMessage({ id: 'sys.search' })} />
                          <InputGroupAddon addonType="append">
                            <Button color="secondary">
                              <MdSearch />
                            </Button>
                          </InputGroupAddon>
                        </InputGroup>
                      </div>
                      <div>
                        <div>
                          <FormattedMessage id="sys.orderDate" />
                          :&nbsp;
                          <DatePicker
                            dateFormat="YYYY-MM-DD"
                            selected={moment()}
                            popperModifiers={{
                              offset: {
                                enabled: true,
                                offset: '10px, 10px',
                              },
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <Button
                          size="sm"
                          color="primary"
                          className="pull-right form-btn"
                          onClick={() => history.push('/new-order')}
                        >
                          <MdAddCircleOutline />
                          &nbsp;
                          <FormattedMessage id="sys.addNew" />
                        </Button>
                      </div>
                    </div>
                    <br />
                    <Table responsive>
                      <thead className="table-header">
                        <tr>
                          <th>
                            <FormattedMessage id="sys.orderNumber" />
                          </th>
                          <th>
                            <FormattedMessage id="sys.customerName" />
                          </th>
                          <th>
                            <FormattedMessage id="sys.orderDate" />
                          </th>
                          <th>
                            <FormattedMessage id="sys.payment" />
                          </th>
                          <th>
                            <FormattedMessage id="sys.status" />
                          </th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {orders.length > 0 ? orders.map(order => (
                          <OrderListItem
                            key={order.code}
                            number={order.code}
                            customer={order.customerName}
                            date={order.addedOn}
                            paidOn={order.paidOn}
                            status={order.status}
                            onClick={this.onViewClick}
                          />
                        )) : <tr><td><FormattedMessage id="sys.noRecords" /></td></tr>}
                      </tbody>
                    </Table>
                    <div className="pagination-container">
                      <span className="text-muted">Total {count} entries</span>
                      <ReactPaginate
                        pageCount={total || 1}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        containerClassName="pagination"
                        subContainerClassName="pages pagination"
                        pageClassName="page-item"
                        breakClassName="page-item"
                        breakLabel="..."
                        pageLinkClassName="page-link"
                        previousLabel="‹"
                        nextLabel="›"
                        previousLinkClassName="page-link"
                        nextLinkClassName="page-link"
                        activeClassName="active"
                        onPageChange={this.onPageChange}
                      />
                    </div>
                  </div>
              }
            </Col>
          </div>
        </div>
      </div>
    );
  }
}

OrderList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  orders: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  intl: PropTypes.object.isRequired,
  loaded: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
  const diff = state.orderReducer.orders.count / 20;

  return ({
    orders: state.orderReducer.orders.data,
    count: state.orderReducer.orders.count,
    loaded: state.orderReducer.loaded,
    total: Number.isInteger(diff) ? diff : parseInt(diff) + 1,
  });
};

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(injectIntl(OrderList))
);
