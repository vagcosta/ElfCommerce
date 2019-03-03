import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
import {
  MdAddCircleOutline,
  MdSearch,
} from 'react-icons/md';
import ReactPaginate from 'react-paginate';
import jwt from 'jsonwebtoken';
import {
  fetchProducts,
  updateProductStatus,
} from '../modules/product';
import ProductListItem from './product/ProductListItem';
import { Loader } from '../components';
import config from '../config';

class ProductList extends Component {
  constructor(props) {
    super(props);
    const { data: { storeId } } = jwt.decode(localStorage.getItem(config.accessTokenKey));
    this.state = {
      storeId,
      pageSize: 20,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { data: { storeId } } = jwt.decode(localStorage.getItem(config.accessTokenKey));

    dispatch(
      fetchProducts(
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
    history.push(`/products/${id}`);
  };

  onStatusUpdateClick = (id, status) => {
    const { dispatch } = this.props;

    dispatch(updateProductStatus({ storeId: this.state.storeId, productId: id, status }));
  }

  onPageChange = page => {
    const { dispatch } = this.props;

    dispatch(
      fetchProducts(
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
      history,
      products,
      total,
      count,
      loaded,
      intl: { formatMessage },
    } = this.props;

    return (
      <div>
        <div className="page-navbar">
          <div className="page-name"><FormattedMessage id="sys.products" /></div>
          <Breadcrumb>
            <BreadcrumbItem>
              <Button color="link" onClick={() => history.push('/dashboard')}>
                <FormattedMessage id="sys.dashboard" />
              </Button>
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <FormattedMessage id="sys.products" />
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="content-body">
          <div className="table-container">
            <Col md={12} className="table-content">
              {
                !loaded ?
                  <Loader />
                  :
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
                      <Button
                        size="sm"
                        color="primary"
                        className="pull-right form-btn"
                        onClick={() => history.push('/new-product')}
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
                          <th width="10%">
                            <FormattedMessage id="sys.thumbnail" />
                          </th>
                          <th width="20%">
                            <FormattedMessage id="sys.name" />
                          </th>
                          <th width="25%">
                            <FormattedMessage id="sys.sku" />
                          </th>
                          <th width="10%">
                            <FormattedMessage id="sys.price" />
                          </th>
                          <th width="10%">
                            <FormattedMessage id="sys.qty" />
                          </th>
                          <th width="10%">
                            <FormattedMessage id="sys.status" />
                          </th>
                          <th width="15%" />
                        </tr>
                      </thead>
                      <tbody>
                        {products.length > 0 ? products.map(product => (
                          <ProductListItem
                            key={product.code}
                            id={product.code}
                            coverImage={product.coverImage}
                            name={product.name}
                            sku={product.sku}
                            currency={product.currency}
                            currencySign="$"
                            price={product.unitPrice}
                            quantity={product.quantity}
                            status={product.status}
                            onViewClick={this.onViewClick}
                            onStatusUpdateClick={this.onStatusUpdateClick}
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

ProductList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  products: PropTypes.array,
  total: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  intl: PropTypes.object.isRequired,
  loaded: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
  const diff = state.productReducer.products.count / 20;
  return {
    products: state.productReducer.products.data,
    count: state.productReducer.products.count,
    loaded: state.productReducer.loaded,
    total: Number.isInteger(diff) ? diff : parseInt(diff) + 1,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(injectIntl(ProductList))
);
