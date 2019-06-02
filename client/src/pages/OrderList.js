import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
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
import OrderListItem from './order/OrderListItem';
import { Loader } from '../components';
import config from '../config';

const OrderList = props => {
  const {
    history,
    intl: { formatMessage },
  } = props;

  const {
    data: { storeId },
  } = jwt.decode(localStorage.getItem(config.accessTokenKey));

  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [result, setResult] = useState({ items: [], count: 0 });
  const [total, setTotal] = useState(-1);

  useEffect(() => {
    async function fetchItems() {
      try {
        const res = await axios({
          method: 'get',
          url: `${
            config.apiDomain
          }/stores/${storeId}/orders?page=${pageNo}&size=${pageSize}`,
          headers: {
            authorization: localStorage.getItem(config.accessTokenKey),
          },
        });

        const diff = res.data.count / pageSize;

        setResult({ items: res.data.data, count: res.data.count });
        setTotal(Number.isInteger(diff) ? diff : parseInt(diff) + 1);
      } catch (e) {
        //TODO: add error msg
        setResult({ items: [], count: 0 });
      }
    }
    fetchItems();
  }, [pageNo]);

  const viewItem = id => {
    history.push(`/orders/${id}`);
  };

  const changePage = page => {
    setPageNo(page.selected + 1);
  };

  return (
    <div>
      <div className="page-navbar">
        <div className="page-name">
          <FormattedMessage id="sys.orders" />
        </div>
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
            {total < 0 ? (
              <Loader />
            ) : (
              <div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <div>
                    <InputGroup size="sm">
                      <Input
                        placeholder={formatMessage({ id: 'sys.search' })}
                      />
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
                    {result.items.length ? (
                      result.items.map(item => (
                        <OrderListItem
                          key={item.code}
                          number={item.code}
                          customer={item.customerName}
                          date={item.addedOn}
                          paidOn={item.paidOn}
                          status={item.status}
                          onClick={viewItem}
                        />
                      ))
                    ) : (
                      <tr>
                        <td>
                          <FormattedMessage id="sys.noRecords" />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
                <div className="pagination-container">
                  <span className="text-muted">
                    Total {result.count} entries
                  </span>
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
                    onPageChange={changePage}
                  />
                </div>
              </div>
            )}
          </Col>
        </div>
      </div>
    </div>
  );
};

OrderList.propTypes = {
  history: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
};

export default withRouter(injectIntl(OrderList));
