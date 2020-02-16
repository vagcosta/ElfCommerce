import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  Table,
  Col,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  InputGroup,
  Input,
  InputGroupAddon,
} from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { injectIntl, FormattedMessage } from 'react-intl';
import { MdAddCircleOutline, MdSearch } from 'react-icons/md';
import ReactPaginate from 'react-paginate';
import jwt from 'jsonwebtoken';
import CategoryListItem from './category/CategoryListItem';
import { Loader } from '../components';
import config from '../config';

const CategoryList = props => {
  const {
    history,
    intl: { formatMessage },
  } = props;

  const {
    data: { storeId },
  } = jwt.decode(localStorage.getItem(config.accessTokenKey));

  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(200);
  const [result, setResult] = useState({ items: [], count: 0 });
  const [total, setTotal] = useState(-1);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    async function fetchItems() {
      try {
        const res = await axios({
          method: 'get',
          url: `${
            config.apiDomain
          }/stores/${storeId}/categories?page=${pageNo}&size=${pageSize}`,
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
  }, [pageNo, selectedItem]);

  useEffect(() => {
    async function updateStatus() {
      try {
        const res = await axios({
          method: !selectedItem.status ? 'delete' : 'patch',
          url: `${config.apiDomain}/stores/${storeId}/categories/${
            selectedItem.id
          }`,
          headers: {
            authorization: localStorage.getItem(config.accessTokenKey),
          },
        });
      } catch (e) {
        //TODO: to be rewritten
        setSelectedItem(null);
      } finally {
        setSelectedItem(null);
      }
    }

    if (selectedItem) {
      updateStatus();
    }
  }, [selectedItem]);

  const viewItem = id => {
    history.push(`/categories/${id}`);
  };

  const updateStatus = (id, status) => {
    setSelectedItem({ id, status });
  };

  const changePage = page => {
    setPageNo(page.selected + 1);
  };

  return (
    <div>
      <div className="page-navbar">
        <div className="page-name">
          <FormattedMessage id="sys.categories" />
        </div>
        <Breadcrumb>
          <BreadcrumbItem>
            <Button color="link" onClick={() => history.push('/dashboard')}>
              <FormattedMessage id="sys.dashboard" />
            </Button>
          </BreadcrumbItem>
          <BreadcrumbItem active>
            <FormattedMessage id="sys.categories" />
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
                  <Button
                    size="sm"
                    color="primary"
                    className="pull-right form-btn"
                    onClick={() => history.push('/new-category')}
                  >
                    <MdAddCircleOutline />
                    &nbsp;
                    <FormattedMessage id="sys.addNew" />
                  </Button>
                </div>
                <br />
                <Table responsive size="sm">
                  <thead className="table-header">
                    <tr>
                      <th width="40%">
                        <FormattedMessage id="sys.name" />
                      </th>
                      <th width="10%">
                        <FormattedMessage id="sys.status" />
                      </th>
                      <th width="10%" />
                    </tr>
                  </thead>

                  {result.items.length ? (
                    result.items.map(cat => (
                      <CategoryListItem
                        key={cat.code}
                        id={cat.code}
                        name={cat.name}
                        level={cat.level}
                        status={cat.status}
                        onViewClick={viewItem}
                        onStatusUpdateClick={updateStatus}
                      />
                    ))
                  ) : (
                    <tr>
                      <td>
                        <FormattedMessage id="sys.noRecords" />
                      </td>
                    </tr>
                  )}
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

CategoryList.propTypes = {
  history: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
};

export default withRouter(injectIntl(CategoryList));
