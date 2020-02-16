import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { injectIntl, FormattedMessage } from 'react-intl';
import { MdSave } from 'react-icons/md';
import {
  Col,
  Row,
  Card,
  Nav,
  TabContent,
  NavItem,
  NavLink,
  Input,
  TabPane,
  Button,
  Alert,
  CardTitle,
  Table,
  FormGroup,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { MdFileDownload, MdAddCircleOutline } from 'react-icons/md';
import classnames from 'classnames';
import numeral from 'numeral';
import { ProfileLoader } from '../../components';
import OrderShippingItem from './OrderShippingItem';
import OrderProductListItem from './OrderProductListItem';
import ProductSearchForm from '../product/ProductSearchForm';
import {
  fetchOrderDetails,
  clearOrderDetails,
  submitOrder,
  clearOrderSearchedProductResult,
  removeOrderProduct,
} from '../../modules/order';
import { clearSearchProducts } from '../../modules/product';
import config from '../../config';

const orderValidation = Yup.object().shape({
  shippingFee: Yup.number(),
  customerName: Yup.string().required('Required'),
  customerContact: Yup.string().required('Required'),
  shippingAddress: Yup.string().required('Required'),
  billingAddress: Yup.string().required('Required'),
});

class OrderForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: '1',
      modal: false,
    };
  }

  componentWillMount() {
    this.props.dispatch(clearOrderDetails());
  }

  componentDidMount() {
    const {
      dispatch,
      mode,
      storeId,
      match: {
        params: { id },
      },
    } = this.props;

    if (mode === 'update') {
      dispatch(fetchOrderDetails({ storeId, orderId: id }));
    }
  }

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  };

  modalToggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  onAddProductClick = data => {
    const { dispatch } = this.props;

    this.setState(
      {
        modal: !this.state.modal,
      },
      () => {
        dispatch(clearSearchProducts());
        dispatch(clearOrderSearchedProductResult());
      }
    );
  };

  onSubmit = data => {
    const {
      dispatch,
      mode,
      storeId,
      orderDetails,
      match: {
        params: { id },
      },
    } = this.props;

    data.storeId = storeId;
    data.products = orderDetails.products;
    data.mode = mode;

    if (mode === 'update') {
      data.orderId = id;
    }

    dispatch(submitOrder(data));
  };

  onProductItemDeleteClick = code => {
    const { dispatch } = this.props;

    dispatch(removeOrderProduct(code));
  };

  render() {
    const { history, done, error, mode, storeId, orderDetails } = this.props;

    const products = orderDetails.products;
    const subTotal =
      products.length > 0
        ? products.reduce(
            (acc, product) => acc + product.unitPrice * product.quantity,
            0
          )
        : 0.0;
    const shipping = 21.5; // TODO: replace this

    return mode === 'update' && !('code' in orderDetails) ? (
      <ProfileLoader />
    ) : (
      <div>
        {error ? (
          <Alert color="danger">
            <FormattedMessage id="sys.newFailed" />
          </Alert>
        ) : done ? (
          <Alert color="success">
            <FormattedMessage id="sys.newSuccess" />
          </Alert>
        ) : null}
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({
                active: this.state.activeTab === '1',
              })}
              onClick={() => {
                this.toggle('1');
              }}
            >
              <FormattedMessage id="sys.orderDetails" />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: this.state.activeTab === '2',
              })}
              onClick={() => {
                this.toggle('2');
              }}
            >
              <FormattedMessage id="sys.shipping" />
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab} className="table-content">
          <TabPane tabId="1">
            <Formik
              enableReinitialize
              initialValues={{ ...orderDetails }}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                this.onSubmit(values);
                setSubmitting(false);
              }}
              validationSchema={orderValidation}
            >
              {({
                values: {
                  shippingFee = '',
                  customerName = '',
                  customerContact = '',
                  shippingAddress = '',
                  billingAddress = '',
                },
                handleChange,
                isSubmitting,
                errors,
              }) => (
                <Form>
                  <Row>
                    <Col md={4}>
                      {mode === 'update' ? (
                        <span className="tab-content-title">
                          <FormattedMessage id="sys.orderNumber" />:{' '}
                          <b>{orderDetails.code}</b>
                        </span>
                      ) : null}
                    </Col>
                    <Col md={8}>
                      <Button
                        size="sm"
                        color="secondary"
                        className="pull-right form-btn"
                        onClick={() => history.push('/new-product')}
                      >
                        <MdFileDownload />
                        &nbsp;
                        <FormattedMessage id="sys.downloadInvoice" />
                      </Button>
                      <Button
                        type="submit"
                        size="sm"
                        color="primary"
                        className="pull-right form-btn"
                        style={{ marginRight: 10 }}
                        disabled={isSubmitting}
                      >
                        <MdSave />
                        &nbsp;
                        <FormattedMessage id="sys.save" />
                      </Button>
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col md={7}>
                      <CardTitle>
                        <FormattedMessage id="sys.products" />
                      </CardTitle>
                      <Table responsive size="sm">
                        <thead className="table-header">
                          <tr>
                            <th>
                              <FormattedMessage id="sys.productName" />
                            </th>
                            <th>
                              <FormattedMessage id="sys.unitPrice" />
                            </th>
                            <th>
                              <FormattedMessage id="sys.qty" />
                            </th>
                            <th>
                              <FormattedMessage id="sys.amount" />
                            </th>
                            <th />
                          </tr>
                        </thead>
                        <tbody>
                          {products.length > 0 ? (
                            products.map(product => {
                              return (
                                <OrderProductListItem
                                  key={product.code}
                                  code={product.code}
                                  name={product.name}
                                  unitPrice={product.unitPrice}
                                  quantity={product.quantity}
                                  currencySign="$"
                                  onDeleteClick={this.onProductItemDeleteClick}
                                />
                              );
                            })
                          ) : (
                            <tr>
                              <td>
                                <FormattedMessage id="sys.noRecords" />
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                      <Button
                        color="link"
                        className="pull-right form-btn"
                        onClick={this.onAddProductClick}
                      >
                        <MdAddCircleOutline />
                        &nbsp;
                        <FormattedMessage id="sys.addNew" />
                      </Button>
                      <br />
                      <br />
                      <br />
                      <Col md={6} className="pull-right">
                        <Table size="sm" responsive>
                          <tbody>
                            <tr>
                              <td>
                                <FormattedMessage id="sys.subTotal" />:
                              </td>
                              <td>${numeral(subTotal).format('0,0.00')}</td>
                            </tr>
                            <tr>
                              <td>
                                <FormattedMessage id="sys.tax" />:
                              </td>
                              <td>
                                ${numeral(subTotal * 0.07).format('0,0.00')}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <FormattedMessage id="sys.shipping" />:
                              </td>
                              <td>
                                $
                                <Input
                                  name="shippingFee"
                                  id="shipping-fee"
                                  type="number"
                                  style={{ width: 80 }}
                                  value={shippingFee}
                                  onChange={handleChange}
                                />
                                {errors.shippingFee && (
                                  <div className="text-danger">
                                    {errors.shippingFee}
                                  </div>
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <b>
                                  <FormattedMessage id="sys.total" />:
                                </b>
                              </td>
                              <td>
                                <b>
                                  $
                                  {numeral(subTotal * 1.07 + shipping).format(
                                    '0,0.00'
                                  )}
                                </b>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </Col>
                    </Col>
                    <Col md={5}>
                      <CardTitle>
                        <FormattedMessage id="sys.customerInfo" />
                      </CardTitle>
                      <Card body>
                        <FormGroup row>
                          <Label for="customer-name" sm={4}>
                            <FormattedMessage id="sys.customerName" />
                            <span className="text-danger mandatory-field">
                              *
                            </span>
                          </Label>
                          <Col sm={8}>
                            <Input
                              name="customerName"
                              id="customer-name"
                              value={customerName}
                              onChange={handleChange}
                            />
                            {errors.customerName && (
                              <div className="text-danger">
                                {errors.customerName}
                              </div>
                            )}
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label for="customer-contact" sm={4}>
                            <FormattedMessage id="sys.contactNo" />
                            <span className="text-danger mandatory-field">
                              *
                            </span>
                          </Label>
                          <Col sm={8}>
                            <Input
                              name="customerContact"
                              id="customer-contact"
                              value={customerContact}
                              onChange={handleChange}
                            />
                            {errors.customerContact && (
                              <div className="text-danger">
                                {errors.customerContact}
                              </div>
                            )}
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label for="shipping-address" sm={4}>
                            <FormattedMessage id="sys.shippingAddr" />
                            <span className="text-danger mandatory-field">
                              *
                            </span>
                          </Label>
                          <Col sm={8}>
                            <Input
                              name="shippingAddress"
                              id="shipping-address"
                              value={shippingAddress}
                              onChange={handleChange}
                            />
                            {errors.shippingAddress && (
                              <div className="text-danger">
                                {errors.shippingAddress}
                              </div>
                            )}
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label for="billing-address" sm={4}>
                            <FormattedMessage id="sys.billingAddr" />
                            <span className="text-danger mandatory-field">
                              *
                            </span>
                          </Label>
                          <Col sm={8}>
                            <Input
                              name="billingAddress"
                              id="billing-address"
                              value={billingAddress}
                              onChange={handleChange}
                            />
                            {errors.billingAddress && (
                              <div className="text-danger">
                                {errors.billingAddress}
                              </div>
                            )}
                          </Col>
                        </FormGroup>
                      </Card>
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col md={5}>
                <OrderShippingItem
                  courier="Fedex Express"
                  trackingId="asa3djfa123lksdfj23432sdf"
                  datetime="2018-11-11 11:11:00"
                  location="Singapore logistics center"
                  status="Processing"
                  statusColor="green"
                />
                <OrderShippingItem
                  courier="Fedex Express"
                  trackingId="234adsf9asdf31asdf"
                  datetime="2018-11-10 07:10:00"
                  location="Malaysia logistic center"
                  status="Shipped out"
                />
                <OrderShippingItem
                  courier="Fedex Express"
                  trackingId="Not available"
                  datetime="2018-11-08 16:30:00"
                  location="Seller"
                  status="Dispatched"
                />
              </Col>
              <Col md={7}>
                <iframe
                  width="100%"
                  height="450"
                  frameBorder="0"
                  src={`https://www.google.com/maps/embed/v1/place?key=${
                    config.googleApiKey
                  }&q=Space+Needle,Seattle+WA`}
                  allowFullScreen
                />
              </Col>
            </Row>
          </TabPane>
        </TabContent>

        <Modal
          isOpen={this.state.modal}
          toggle={this.modalToggle}
          zIndex="10000"
        >
          <ModalHeader toggle={this.modalToggle}>
            <FormattedMessage id="sys.addProduct" />
          </ModalHeader>
          <ModalBody>
            <ProductSearchForm storeId={storeId} />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

OrderForm.propTypes = {
  storeId: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  error: PropTypes.bool,
  intl: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object,
  mode: PropTypes.string,
  orderDetails: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(
  connect(state => {
    return {
      orderDetails: state.orderReducer.orderDetails,
      done: state.orderReducer.done,
      error: state.orderReducer.error,
      counter: state.orderReducer.counter,
    };
  })(injectIntl(OrderForm))
);
