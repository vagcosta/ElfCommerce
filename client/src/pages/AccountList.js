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
import { fetchAccounts, updateAccountStatus } from '../actions';
import AccountListItem from './account/AccountListItem';
import { Loader } from '../components';
import config from '../config';

class AccountList extends Component {
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
      fetchAccounts(
        {
          storeId: this.state.storeId,
          pageSize: this.state.pageSize,
          pageNo: 1,
        }
      )
    );
  }

  onViewClick = id => {
    this.props.history.push(`/accounts/${id}`);
  };

  onStatusUpdateClick = (id, status) => {
    const { dispatch } = this.props;

    dispatch(updateAccountStatus({ storeId: this.state.storeId, accountId: id, status }));
  }

  onPageChange = page => {
    const { dispatch } = this.props;

    dispatch(
      fetchAccounts(
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
      accounts,
      total,
      count,
      loaded,
      intl: { formatMessage },
    } = this.props;

    return (
      <div>
        <div className="page-navbar">
          <div className="page-name"><FormattedMessage id="sys.accounts" /></div>
          <Breadcrumb>
            <BreadcrumbItem>
              <Button color="link" onClick={() => history.push('/dashboard')}>
                <FormattedMessage id="sys.dashboard" />
              </Button>
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <FormattedMessage id="sys.accounts" />
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
                      <Button
                        size="sm"
                        color="primary"
                        className="pull-right form-btn"
                        onClick={() => history.push('/new-account')}
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
                          <th width="25%">
                            <FormattedMessage id="sys.name" />
                          </th>
                          <th width="40%">
                            <FormattedMessage id="sys.email" />
                          </th>
                          <th width="10%">
                            <FormattedMessage id="sys.role" />
                          </th>
                          <th width="10%">
                            <FormattedMessage id="sys.status" />
                          </th>
                          <th width="15%" />
                        </tr>
                      </thead>
                      <tbody>
                        {accounts.length > 0 ? accounts.map(acct => (
                          <AccountListItem
                            key={acct.code}
                            id={acct.code}
                            name={acct.name}
                            email={acct.email}
                            joinedOn={acct.joinedOn}
                            role={acct.role}
                            status={acct.status}
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

AccountList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  accounts: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  total: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  intl: PropTypes.object.isRequired,
  loaded: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
  const diff = state.accountReducer.accounts.count / 20;
  return ({
    accounts: state.accountReducer.accounts.data,
    count: state.accountReducer.accounts.count,
    loaded: state.accountReducer.loaded,
    total: Number.isInteger(diff) ? diff : parseInt(diff) + 1,
  });
};

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(injectIntl(AccountList))
);
