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
import { fetchCustomers } from '../actions';
import { CustomerListItem } from '../components';

class CustomerList extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCustomers());
  }

  render() {
    const { customers } = this.props;
    return (
      <div className="content-body">
        <Breadcrumb>
          <BreadcrumbItem>
            <a href="/dashboard">
              <FormattedMessage id="sys.dashboard" />
            </a>
          </BreadcrumbItem>
          <BreadcrumbItem active>
            <FormattedMessage id="sys.customers" />
          </BreadcrumbItem>
        </Breadcrumb>
        <Row style={{ padding: 20 }}>
          <Col md={12} style={{ background: '#fff', padding: 20 }}>
            <Table bordered responsive>
              <thead style={{ background: '#eee' }}>
                <tr>
                  <th>
                    <FormattedMessage id="sys.name" />
                  </th>
                  <th>
                    <FormattedMessage id="sys.email" />
                  </th>
                  <th>
                    <FormattedMessage id="sys.contactNo" />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {customers.map(customer => (
                  <CustomerListItem
                    name={customer.number}
                    email={customer.email}
                    contact={customer.contact}
                  />
                ))}
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
  customers: state.customerReducer.customers,
});

export default connect(
  mapStateToProps,
  null
)(CustomerList);
