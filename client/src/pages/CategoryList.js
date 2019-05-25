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
import { MdAddCircleOutline, MdSearch } from 'react-icons/md';
import ReactPaginate from 'react-paginate';
import jwt from 'jsonwebtoken';
import CategoryListItem from './category/CategoryListItem';
import { Loader } from '../components';
import { fetchCategories, updateCategoryStatus } from '../modules/category';
import config from '../config';

class CategoryList extends Component {
  constructor(props) {
    super(props);
    const {
      data: { storeId },
    } = jwt.decode(localStorage.getItem(config.accessTokenKey));

    this.state = {
      storeId,
      pageSize: 200,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    /*TODO: The page size is temporarily set to 200 until 
      I figure out a good way to handle pagination for list with sub-items
    */
    dispatch(
      fetchCategories({
        storeId: this.state.storeId,
        pageSize: this.state.pageSize,
        pageNo: 1,
      })
    );
  }

  onViewClick = id => {
    this.props.history.push(`/categories/${id}`);
  };

  onStatusUpdateClick = (id, status) => {
    const { dispatch } = this.props;

    dispatch(
      updateCategoryStatus({
        storeId: this.state.storeId,
        categoryId: id,
        status,
      })
    );
  };

  onPageChange = page => {
    const { dispatch } = this.props;
    dispatch(
      fetchCategories({
        storeId: this.state.storeId,
        pageSize: this.state.pageSize,
        pageNo: page.selected + 1,
      })
    );
  };

  render() {
    const {
      history,
      categories,
      total,
      count,
      loaded,
      intl: { formatMessage },
    } = this.props;

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
              {!loaded ? (
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

                    {categories.length > 0 ? (
                      categories.map(cat => (
                        <CategoryListItem
                          key={cat.code}
                          id={cat.code}
                          name={cat.name}
                          level={cat.level}
                          status={cat.status}
                          onViewClick={this.onViewClick}
                          onStatusUpdateClick={this.onStatusUpdateClick}
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
              )}
            </Col>
          </div>
        </div>
      </div>
    );
  }
}

CategoryList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  intl: PropTypes.object.isRequired,
  total: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  loaded: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
  const diff = state.categoryReducer.categories.count / 20;
  return {
    categories: state.categoryReducer.categories.data,
    count: state.categoryReducer.categories.count,
    loaded: state.categoryReducer.loaded,
    total: Number.isInteger(diff) ? diff : parseInt(diff) + 1,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(injectIntl(CategoryList))
);
