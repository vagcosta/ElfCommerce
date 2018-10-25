import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Table,
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Breadcrumb,
  BreadcrumbItem,
} from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { fetchOrders } from '../actions';
import { OrderListItem } from '../components';

class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = { activePage: 1 };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchOrders());
  }

  render() {
    const { orders } = this.props;
    return (
      <div className="content-body">
        <Breadcrumb>
          <BreadcrumbItem>
            <a href="/dashboard">
              <FormattedMessage id="sys.dashboard" />
            </a>
          </BreadcrumbItem>
          <BreadcrumbItem active>
            <FormattedMessage id="sys.orders" />
          </BreadcrumbItem>
        </Breadcrumb>
        <Row>
          <Col md={12}>
            <Table condensed responsive style={{ backgroundColor: '#fff' }}>
              <thead>
                <tr>
                  <th>
                    <FormattedMessage id="sys.orderNumber" />
                  </th>
                  <th>
                    <FormattedMessage id="sys.orderedBy" />
                  </th>
                  <th>
                    <FormattedMessage id="sys.orderDate" />
                  </th>
                  <th>
                    <FormattedMessage id="sys.payBy" />
                  </th>
                  <th>
                    <FormattedMessage id="sys.orderStatus" />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {orders.map(order => {
                  return (
                    <OrderListItem
                      number={order.number}
                      customer={order.customer}
                      date={order.date}
                      payment={order.payment}
                      status={order.status}
                    />
                  );
                })}
              </tbody>
            </Table>
            <Pagination aria-label="Page navigation example">
              <PaginationItem disabled>
                <PaginationLink previous href="#" />
              </PaginationItem>
              <PaginationItem active>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">4</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">5</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink next href="#" />
              </PaginationItem>
            </Pagination>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  orders: state.orderReducer.orders,
});

export default connect(
  mapStateToProps,
  null
)(OrderList);