import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { injectIntl, FormattedMessage } from 'react-intl';
import {
  MdSave,
  MdAddCircleOutline,
} from 'react-icons/md';
import {
  Col,
  Row,
  Form,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Label,
  Input,
  InputGroup,
  Button,
  Alert,
  Nav,
  TabContent,
  NavItem,
  NavLink,
  TabPane,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import {
  fetchCategories,
} from '../../actions';
import {
  fetchSuppliers,
} from '../../modules/supplier';
import {
  fetchManufacturers,
} from '../../modules/manufacturer';
import {
  fetchProductDetails,
  clearProductDetails,
  fetchProductAttributes,
  submitProduct,
} from '../../modules/product';
import ProductAttributeForm from './ProductAttributeForm';
import ProductAttributeListItem from './ProductAttributeListItem';
import {
  ParallelLoader,
} from '../../components';
import config from '../../config';

const {
  mediaFileDomain,
  saveMediaFileLocal,
} = config;
const required = value => (value ? undefined : 'Required');

const renderField = ({ input, type, style, meta: { touched, error } }) => (
  <div>
    <Input {...input} type={type} style={style} />
    {touched && (error && <span className="text-danger">{error}</span>)}
  </div>
);

const renderDecimalField = ({ input, type, meta: { touched, error } }) => (
  <div>
    <Input {...input} placeholder="0.00" type={type} step=".01" />
    {touched && (error && <span className="text-danger">{error}</span>)}
  </div>
);

const renderNumberField = ({ input, type, meta: { touched, error } }) => (
  <div>
    <Input {...input} placeholder="0" type={type} />
    {touched && (error && <span className="text-danger">{error}</span>)}
  </div>
);

const renderSelect = ({ input, type, data, meta: { touched, error } }) => (
  <div>
    <select {...input} className="form-control">
      <option />
      {data.map(item => (
        <option key={item.code} value={item.code}>
          {item.name}
        </option>
      ))}
    </select>
    {touched && (error && <div><span className="text-danger">{error}</span></div>)}
  </div>
);

const renderCategoryList = ({ input, type, data, meta: { touched, error } }) => (
  <div>
    <select {...input} className="form-control">
      <option />
      {data.map(item => (
        <option key={item.code} value={item.code}>
          {item.level === 1 ? item.name : '---' + item.name}
        </option>
      ))}
    </select>
    {touched && (error && <div><span className="text-danger">{error}</span></div>)}
  </div>
);

class ProductForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: '1',
      modal: false,
    };
  }

  componentWillMount() {
    this.props.dispatch(
      clearProductDetails()
    );
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

    const params = { storeId, pageSize: 200, pageNo: 1, activeOnly: true };

    dispatch(fetchCategories(params));
    dispatch(fetchSuppliers(params));
    dispatch(fetchManufacturers(params));

    if (mode === 'update') {
      dispatch(
        fetchProductDetails({ storeId, productId: id })
      );
      dispatch(fetchProductAttributes({ storeId, productId: id }));
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
  }

  onAddProductAttributeClick = (data) => {
    const {
      dispatch,
    } = this.props;

    this.setState({
      modal: !this.state.modal,
    });
  }

  onSubmit = data => {
    const {
      dispatch,
      mode,
      storeId,
      match: {
        params: { id },
      },
    } = this.props;

    data.storeId = storeId;
    if (data.allowQuantity === undefined) {
      data.allowQuantity = false;
    }
    data.mode = mode;

    if (mode === 'update') {
      data.productId = id;
    }

    dispatch(submitProduct(data));
  };

  render() {
    const {
      handleSubmit,
      productDetails,
      productAttributes,
      categories,
      suppliers,
      done,
      error,
      manufacturers,
      mode,
      storeId,
    } = this.props;

    return (
      mode === 'update' && !('code' in productDetails) ?
        <ParallelLoader /> :
        <div>
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
                <FormattedMessage id="sys.productDetails" />
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
                <FormattedMessage id="sys.productAttributes" />
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent
            activeTab={this.state.activeTab}
            className="table-content"
          >
            <TabPane tabId="1">
              <Form onSubmit={handleSubmit(data => this.onSubmit(data))}>
                <Button size="sm" color="primary" className="pull-right form-btn">
                  <MdSave />
                  &nbsp;
                  <FormattedMessage id="sys.save" />
                </Button>
                <br />
                <br />
                {
                  error ?
                    <Alert color="danger">
                      <FormattedMessage id="sys.newFailed" />
                    </Alert> :
                    done ?
                      <Alert color="success">
                        <FormattedMessage id="sys.newSuccess" />
                      </Alert> : null
                }
                <Row>
                  <Col md={7}>
                    <Card>
                      <CardHeader>
                        <FormattedMessage id="sys.productInfo" />
                      </CardHeader>
                      <CardBody>
                        <FormGroup row>
                          <Label for="name" sm={3}>
                            <FormattedMessage id="sys.productName" />
                            <span className="text-danger mandatory-field">*</span>
                          </Label>
                          <Col sm={9}>
                            <Field
                              component={renderField}
                              name="name"
                              className="form-control"
                              id="name"
                              validate={[required]}
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label for="description" sm={3}>
                            <FormattedMessage id="sys.desc" />
                          </Label>
                          <Col sm={9}>
                            <Field
                              component={renderField}
                              name="description"
                              id="description"
                              type="textarea"
                              style={{ height: 220 }}
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label for="sku" sm={3}>
                            <FormattedMessage id="sys.sku" />
                            <span className="text-danger mandatory-field">*</span>
                          </Label>
                          <Col sm={9}>
                            <Field
                              component={renderField}
                              name="sku"
                              className="form-control"
                              id="sku"
                              validate={[required]}
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label for="category-id" sm={3}>
                            <FormattedMessage id="sys.category" />
                            <span className="text-danger mandatory-field">*</span>
                          </Label>
                          <Col sm={9}>
                            <Field
                              component={renderCategoryList}
                              id="category-id"
                              name="categoryId"
                              data={categories}
                              validate={[required]}
                            >
                            </Field>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label for="cost" sm={3}>
                            <FormattedMessage id="sys.costPrice" />
                            <span className="text-danger mandatory-field">*</span>
                          </Label>
                          <Col sm={9}>
                            <Field
                              component={renderDecimalField}
                              type="number"
                              name="cost"
                              id="cost"
                              validate={[required]}
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label for="manufacturer-id" sm={3}>
                            <FormattedMessage id="sys.manufacturer" />
                          </Label>
                          <Col sm={9}>
                            <Field
                              component={renderSelect}
                              id="manufacturer-id"
                              name="manufacturerId"
                              data={manufacturers}
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label for="supplier-id" sm={3}>
                            <FormattedMessage id="sys.supplier" />
                          </Label>
                          <Col sm={9}>
                            <Field
                              component={renderSelect}
                              id="supplier-id"
                              name="supplierId"
                              data={suppliers}
                            />
                          </Col>
                        </FormGroup>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md={5}>
                    <Card>
                      <CardHeader>
                        <FormattedMessage id="sys.inventory" />
                      </CardHeader>
                      <CardBody>
                        <FormGroup row>
                          <Label for="allow-quantity" sm={5}>
                            <FormattedMessage id="sys.allowQty" />?
                          </Label>
                          <Col sm={7}>
                            <InputGroup>
                              <Field
                                component="input"
                                type="checkbox"
                                name="allowQuantity"
                                id="allow-quantity"
                                style={{ width: 32, height: 32 }}
                              />
                            </InputGroup>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label for="quantity" sm={5}>
                            <FormattedMessage id="sys.qty" />
                          </Label>
                          <Col sm={7}>
                            <InputGroup>
                              <Field
                                component={renderNumberField}
                                type="number"
                                name="quantity"
                                id="quantity"
                                checked
                              />
                            </InputGroup>
                          </Col>
                        </FormGroup>
                      </CardBody>
                    </Card>
                    <br />
                    <Card>
                      <CardHeader>
                        <FormattedMessage id="sys.price" />
                      </CardHeader>
                      <CardBody>
                        <FormGroup row>
                          <Label for="price" sm={4}>
                            <FormattedMessage id="sys.price" />
                            <span className="text-danger mandatory-field">*</span>
                          </Label>
                          <Col sm={8}>
                            <Field
                              component={renderDecimalField}
                              type="number"
                              name="unitPrice"
                              id="price"
                              validate={[required]}
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label for="discount" sm={4}>
                            <FormattedMessage id="sys.discountPrice" />
                          </Label>
                          <Col sm={8}>
                            <Field
                              component={renderDecimalField}
                              type="number"
                              name="discount"
                              id="discount"
                            />
                          </Col>
                        </FormGroup>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Form>
            </TabPane>
            <TabPane tabId="2">
              <Form onSubmit={handleSubmit(data => this.onSubmit(data))}>
                {
                  error ?
                    <Alert color="danger">
                      <FormattedMessage id="sys.newFailed" />
                    </Alert> :
                    done ?
                      <Alert color="success">
                        <FormattedMessage id="sys.newSuccess" />
                      </Alert> : null
                }
                <Row>
                  <Col md={12}>
                    <Table responsive size="sm">
                      <thead className="table-header">
                        <tr>
                          <th>
                            <FormattedMessage id="sys.attributeName" />
                          </th>
                          <th>
                            <FormattedMessage id="sys.category" />
                          </th>
                          <th>
                            <FormattedMessage id="sys.varPrice" />
                          </th>
                          <th>
                            <FormattedMessage id="sys.qty" />
                          </th>
                          <th>
                            <FormattedMessage id="sys.status" />
                          </th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          productAttributes.length > 0 ? productAttributes.map(attribute => {
                            return (
                              <ProductAttributeListItem
                                key={attribute.code}
                                code={attribute.code}
                                name={attribute.attributeName}
                                varPrice={attribute.varPrice}
                                quantity={attribute.quantity}
                                category={attribute.productAttributeCategoryName}
                                status={attribute.status}
                                currencySign="$"
                                onDeleteClick={this.onProductItemDeleteClick}
                              />
                            );
                          }) : <tr><td><FormattedMessage id="sys.noRecords" /></td></tr>
                        }

                      </tbody>
                    </Table>
                    <Button
                      color="link"
                      className="pull-right form-btn"
                      onClick={this.onAddProductAttributeClick}
                    >
                      <MdAddCircleOutline />
                      &nbsp;
                      <FormattedMessage id="sys.addNew" />
                    </Button>
                  </Col>
                </Row>
              </Form>
              <Modal isOpen={this.state.modal} toggle={this.modalToggle} zIndex="10000">
                <ModalHeader toggle={this.modalToggle}><FormattedMessage id="sys.addProduct" /></ModalHeader>
                <ModalBody>
                  <ProductAttributeForm
                    storeId={storeId} />
                </ModalBody>
              </Modal>
            </TabPane>
          </TabContent>
        </div>
    );
  }
}

ProductForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  suppliers: PropTypes.array.isRequired,
  manufacturers: PropTypes.array.isRequired,
  productAttributes: PropTypes.array,
  done: PropTypes.bool.isRequired,
  productDetails: PropTypes.object.isRequired,
  error: PropTypes.bool,
  intl: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object,
  mode: PropTypes.string.isRequired,
  storeId: PropTypes.string.isRequired,
  initialValues: PropTypes.object,
};

ProductForm = reduxForm({
  form: 'productForm',
})(ProductForm);

export default withRouter(
  connect(state => {
    const {
      productReducer: {
        productDetails,
        productAttributes,
      },
      categoryReducer: {
        categories,
      },
      manufacturerReducer: {
        manufacturers,
      },
      supplierReducer: {
        suppliers,
      },
    } = state;

    return {
      initialValues: productDetails,
      productDetails,
      productAttributes,
      categories: categories ? categories.data : [],
      suppliers: suppliers ? suppliers.data : [],
      manufacturers: manufacturers ? manufacturers.data : [],
      done: state.productReducer.done,
      error: state.productReducer.error,
      enableReinitialize: true,
    };
  })(injectIntl(ProductForm))
);
