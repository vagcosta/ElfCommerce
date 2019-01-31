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
import { fetchManufacturers, updateManufacturerStatus } from '../../actions';
import { ManufacturerListItem, Loader } from '../../components';
import config from '../../config';

class ManufacturerList extends Component {
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
      fetchManufacturers(
        {
          storeId: this.state.storeId,
          pageSize: this.state.pageSize,
          pageNo: 1,
        }
      )
    );
  }

  onViewClick = id => {
    this.props.history.push(`/manufacturers/${id}`);
  };

  onStatusUpdateClick = (id, status) => {
    const { dispatch } = this.props;

    dispatch(updateManufacturerStatus({ storeId: this.state.storeId, supplierId: id, status }));
  }

  onPageChange = page => {
    const { dispatch } = this.props;

    dispatch(
      fetchManufacturers(
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
      manufacturers,
      total,
      count,
      loaded,
      intl: { formatMessage },
    } = this.props;

    return (
      <div>
        <div className="page-navbar">
          <div className="page-name"><FormattedMessage id="sys.manufacturers" /></div>
          <Breadcrumb>
            <BreadcrumbItem>
              <Button color="link" onClick={() => history.push('/dashboard')}>
                <FormattedMessage id="sys.dashboard" />
              </Button>
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <FormattedMessage id="sys.manufacturers" />
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
                        onClick={() => history.push('/new-manufacturer')}
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
                            <FormattedMessage id="sys.logo" />
                          </th>
                          <th width="25%">
                            <FormattedMessage id="sys.name" />
                          </th>
                          <th width="40%">
                            <FormattedMessage id="sys.contactInfo" />
                          </th>
                          <th width="10%">
                            <FormattedMessage id="sys.status" />
                          </th>
                          <th width="15%" />
                        </tr>
                      </thead>
                      <tbody>
                        {manufacturers.length > 0 ? manufacturers.map(manufacturer => (
                          <ManufacturerListItem
                            key={manufacturer.code}
                            id={manufacturer.code}
                            logo={manufacturer.logo}
                            name={manufacturer.name}
                            url={manufacturer.url}
                            address={manufacturer.address}
                            email={manufacturer.email}
                            contact={manufacturer.contact}
                            status={manufacturer.status}
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

ManufacturerList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  manufacturers: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  total: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  intl: PropTypes.object.isRequired,
  loaded: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
  const diff = state.manufacturerReducer.manufacturers.count / 20;
  return ({
    manufacturers: state.manufacturerReducer.manufacturers.data,
    count: state.manufacturerReducer.manufacturers.count,
    loaded: state.manufacturerReducer.loaded,
    total: Number.isInteger(diff) ? diff : parseInt(diff) + 1,
  });
};

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(injectIntl(ManufacturerList))
);
