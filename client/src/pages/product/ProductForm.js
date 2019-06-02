import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { injectIntl, FormattedMessage } from 'react-intl';
import { MdSave, MdAddCircleOutline } from 'react-icons/md';
import {
  Col,
  Row,
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
import { fetchSuppliers } from '../../modules/supplier';
import { fetchManufacturers } from '../../modules/manufacturer';
import {
  fetchProductDetails,
  clearProductDetails,
  fetchProductAttributes,
  submitProduct,
} from '../../modules/product';
import ProductAttributeForm from './ProductAttributeForm';
import ProductAttributeListItem from './ProductAttributeListItem';
import { ParallelLoader } from '../../components';
import config from '../../config';

const { mediaFileDomain, saveMediaFileLocal } = config;

const productValidation = Yup.object().shape({
  name: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  sku: Yup.string().required('Required'),
  categoryId: Yup.number().required('Required'),
  cost: Yup.number().required('Required'),
  quantity: Yup.number().integer(),
  unitPrice: Yup.number().required('Required'),
  discount: Yup.number(),
});

class ProductForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: '1',
      modal: false,
    };

    this.props.dispatch(clearProductDetails());
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

    dispatch(fetchSuppliers(params));
    dispatch(fetchManufacturers(params));

    if (mode === 'update') {
      dispatch(fetchProductDetails({ storeId, productId: id }));
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
  };

  onAddProductAttributeClick = data => {
    this.setState({
      modal: !this.state.modal,
    });
  };

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
      productDetails,
      productAttributes,
      categories,
      suppliers,
      status,
      manufacturers,
      mode,
      storeId,
    } = this.props;

    return mode === 'update' && !productDetails ? (
      <ParallelLoader />
    ) : (
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
        <TabContent activeTab={this.state.activeTab} className="table-content">
          <TabPane tabId="1">
            <Formik
              enableReinitialize
              initialValues={{ ...productDetails }}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                this.onSubmit(values);
                setSubmitting(false);
              }}
              validationSchema={productValidation}
            >
              {({
                values: {
                  name = '',
                  description = '',
                  sku = '',
                  categoryId = '',
                  cost = '',
                  quantity = '',
                  unitPrice = '',
                  discount = '',
                  manufacturerId = '',
                  supplierId = '',
                },
                handleChange,
                isSubmitting,
                errors,
              }) => (
                <Form>
                  <Button
                    type="submit"
                    size="sm"
                    color="primary"
                    className="pull-right form-btn"
                    disabled={isSubmitting}
                  >
                    <MdSave />
                    &nbsp;
                    <FormattedMessage id="sys.save" />
                  </Button>
                  <br />
                  <br />
                  {status === 0 ? (
                    <Alert color="danger">
                      <FormattedMessage id="sys.newFailed" />
                    </Alert>
                  ) : status === 1 ? (
                    <Alert color="success">
                      <FormattedMessage id="sys.newSuccess" />
                    </Alert>
                  ) : null}
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
                              <span className="text-danger mandatory-field">
                                *
                              </span>
                            </Label>
                            <Col sm={9}>
                              <Input
                                name="name"
                                id="name"
                                value={name}
                                onChange={handleChange}
                              />
                              {errors.name && (
                                <div className="text-danger">{errors.name}</div>
                              )}
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label for="description" sm={3}>
                              <FormattedMessage id="sys.desc" />
                              <span className="text-danger mandatory-field">
                                *
                              </span>
                            </Label>
                            <Col sm={9}>
                              <Input
                                name="description"
                                id="description"
                                type="textarea"
                                style={{ height: 220 }}
                                value={description}
                                onChange={handleChange}
                              />
                              {errors.description && (
                                <div className="text-danger">
                                  {errors.description}
                                </div>
                              )}
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label for="sku" sm={3}>
                              <FormattedMessage id="sys.sku" />
                              <span className="text-danger mandatory-field">
                                *
                              </span>
                            </Label>
                            <Col sm={9}>
                              <Input
                                name="sku"
                                id="sku"
                                value={sku}
                                onChange={handleChange}
                              />
                              {errors.sku && (
                                <div className="text-danger">{errors.sku}</div>
                              )}
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label for="category-id" sm={3}>
                              <FormattedMessage id="sys.category" />
                              <span className="text-danger mandatory-field">
                                *
                              </span>
                            </Label>
                            <Col sm={9}>
                              <Input
                                type="select"
                                id="category-id"
                                name="categoryId"
                                value={categoryId}
                                onChange={handleChange}
                              >
                                <option />
                                {categories.map(item => (
                                  <option key={item.code} value={item.code}>
                                    {item.level === 1
                                      ? item.name
                                      : '---' + item.name}
                                  </option>
                                ))}
                              </Input>
                              {errors.categoryId && (
                                <div className="text-danger">
                                  {errors.categoryId}
                                </div>
                              )}
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label for="cost" sm={3}>
                              <FormattedMessage id="sys.costPrice" />
                              <span className="text-danger mandatory-field">
                                *
                              </span>
                            </Label>
                            <Col sm={9}>
                              <Input
                                type="number"
                                name="cost"
                                id="cost"
                                value={cost}
                              />
                              {errors.cost && (
                                <div className="text-danger">{errors.cost}</div>
                              )}
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label for="manufacturer-id" sm={3}>
                              <FormattedMessage id="sys.manufacturer" />
                            </Label>
                            <Col sm={9}>
                              <Input
                                type="select"
                                id="manufacturer-id"
                                name="manufacturerId"
                                value={manufacturerId}
                              >
                                <option />
                                {manufacturers.map(item => (
                                  <option key={item.code} value={item.code}>
                                    {item.name}
                                  </option>
                                ))}
                              </Input>
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label for="supplier-id" sm={3}>
                              <FormattedMessage id="sys.supplier" />
                            </Label>
                            <Col sm={9}>
                              <Input
                                type="select"
                                id="supplier-id"
                                name="supplierId"
                                value={supplierId}
                              >
                                <option />
                                {suppliers.map(item => (
                                  <option key={item.code} value={item.code}>
                                    {item.name}
                                  </option>
                                ))}
                              </Input>
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
                                <Input
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
                                <Input
                                  type="number"
                                  name="quantity"
                                  id="quantity"
                                  value={quantity}
                                  onChange={handleChange}
                                  checked
                                />
                                {errors.quantity && (
                                  <div className="text-danger">
                                    {errors.quantity}
                                  </div>
                                )}
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
                              <span className="text-danger mandatory-field">
                                *
                              </span>
                            </Label>
                            <Col sm={8}>
                              <Input
                                type="number"
                                name="unitPrice"
                                id="price"
                                value={unitPrice}
                                onChange={handleChange}
                              />
                              {errors.unitPrice && (
                                <div className="text-danger">
                                  {errors.unitPrice}
                                </div>
                              )}
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label for="discount" sm={4}>
                              <FormattedMessage id="sys.discountPrice" />
                            </Label>
                            <Col sm={8}>
                              <Input
                                type="number"
                                name="discount"
                                id="discount"
                                value={discount}
                                onChange={handleChange}
                              />
                              {errors.discount && (
                                <div className="text-danger">
                                  {errors.discount}
                                </div>
                              )}
                            </Col>
                          </FormGroup>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
          </TabPane>
          <TabPane tabId="2">
            <Form>
              {status === 0 ? (
                <Alert color="danger">
                  <FormattedMessage id="sys.newFailed" />
                </Alert>
              ) : status === 1 ? (
                <Alert color="success">
                  <FormattedMessage id="sys.newSuccess" />
                </Alert>
              ) : null}
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
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {productAttributes.length > 0 ? (
                        productAttributes.map(attribute => {
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
                    onClick={this.onAddProductAttributeClick}
                  >
                    <MdAddCircleOutline />
                    &nbsp;
                    <FormattedMessage id="sys.addNew" />
                  </Button>
                </Col>
              </Row>
            </Form>
            <Modal
              isOpen={this.state.modal}
              toggle={this.modalToggle}
              zIndex="10000"
            >
              <ModalHeader toggle={this.modalToggle}>
                <FormattedMessage id="sys.addProductAttribute" />
              </ModalHeader>
              <ModalBody>
                <ProductAttributeForm storeId={storeId} />
              </ModalBody>
            </Modal>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

ProductForm.propTypes = {
  categories: PropTypes.array.isRequired,
  suppliers: PropTypes.array.isRequired,
  manufacturers: PropTypes.array.isRequired,
  productAttributes: PropTypes.array,
  productDetails: PropTypes.object,
  status: PropTypes.number,
  intl: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object,
  mode: PropTypes.string.isRequired,
  storeId: PropTypes.string.isRequired,
};

export default withRouter(
  connect(state => {
    const {
      productReducer: { productDetails, productAttributes, status },
      categoryReducer: { categories },
      manufacturerReducer: { manufacturers },
      supplierReducer: { suppliers },
    } = state;

    return {
      productDetails,
      productAttributes,
      categories: categories ? categories.data : [],
      suppliers: suppliers ? suppliers.data : [],
      manufacturers: manufacturers ? manufacturers.data : [],
      status,
    };
  })(injectIntl(ProductForm))
);
