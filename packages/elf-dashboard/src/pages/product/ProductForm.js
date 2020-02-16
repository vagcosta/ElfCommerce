import React, { useState, useEffect, useContext, Fragment } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
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
import classnames from 'classnames';
import ProductAttributeForm from './ProductAttributeForm';
import ProductAttributeListItem from './ProductAttributeListItem';
import { ParallelLoader } from '../../components';
import { FormContext } from '../contexts';
import config from '../../config';

const { mediaFileDomain, saveMediaFileLocal } = config;

const productValidation = Yup.object().shape({
  name: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  sku: Yup.string().required('Required'),
  categoryId: Yup.string().required('Required'),
  cost: Yup.number().required('Required'),
  quantity: Yup.number().integer(),
  unitPrice: Yup.number().required('Required'),
  discount: Yup.number(),
});

const ProductForm = props => {
  const { storeId, id } = useContext(FormContext);
  const { mode } = props;
  const [activeTab, setActiveTab] = useState('1');
  const [modal, setModal] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [itemDetails, setItemDetails] = useState(null);
  const [itemAttributes, setItemAttributes] = useState([]);
  const status = false;

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await axios({
          method: 'get',
          url: `${
            config.apiDomain
          }/stores/${storeId}/categories?page=1&size=200&activeOnly=true`,
          headers: {
            authorization: localStorage.getItem(config.accessTokenKey),
          },
        });

        setCategories(res.data.data);
      } catch (e) {
        //TODO: add error msg
      }
    }

    fetchCategories();
  }, []);

  useEffect(() => {
    //TODO: Better way to handle pagesize
    async function fetchSuppliers() {
      try {
        const res = await axios({
          method: 'get',
          url: `${
            config.apiDomain
          }/stores/${storeId}/suppliers?page=1&size=200&activeOnly=true`,
          headers: {
            authorization: localStorage.getItem(config.accessTokenKey),
          },
        });

        setSuppliers(res.data.data);
      } catch (e) {
        //TODO: add error msg
      }
    }

    fetchSuppliers();
  }, []);

  useEffect(() => {
    async function fetchManufacturers() {
      try {
        const res = await axios({
          method: 'get',
          url: `${
            config.apiDomain
          }/stores/${storeId}/manufacturers?page=1&size=200&activeOnly=true`,
          headers: {
            authorization: localStorage.getItem(config.accessTokenKey),
          },
        });

        setManufacturers(res.data.data);
      } catch (e) {
        //TODO: add error msg
      }
    }

    fetchManufacturers();
  }, []);

  useEffect(() => {
    async function fetchProductDetails() {
      try {
        const res = await axios({
          method: 'get',
          url: `${config.apiDomain}/stores/${storeId}/products/${id}`,
          headers: {
            authorization: localStorage.getItem(config.accessTokenKey),
          },
        });

        setItemDetails(res.data);
      } catch (e) {
        //TODO: add error msg
      }
    }

    if (mode === 'update') {
      fetchProductDetails();
    }
  }, []);

  useEffect(() => {
    async function fetchProductAttributes() {
      try {
        const res = await axios({
          method: 'get',
          url: `${
            config.apiDomain
          }/stores/${storeId}/products/${id}/attributes`,
          headers: {
            authorization: localStorage.getItem(config.accessTokenKey),
          },
        });

        setItemAttributes(res.data);
      } catch (e) {
        //TODO: add error msg
      }
    }

    if (mode === 'update') {
      fetchProductAttributes();
    }
  }, []);

  useEffect(() => {
    async function submitForm() {
      try {
        if (mode === 'update') {
          itemDetails.productId = id;
        }

        if (itemDetails.allowQuantity === undefined) {
          itemDetails.allowQuantity = false;
        }

        const res = await axios({
          method: mode === 'new' ? 'post' : 'put',
          url: `${config.apiDomain}/stores/${storeId}/products${
            mode === 'new' ? '' : '/' + id
          }`,
          headers: {
            authorization: localStorage.getItem(config.accessTokenKey),
            'Content-Type': 'application/json',
          },
          data: itemDetails,
        });

        setSubmitted(true);
      } catch (e) {
        setError(true);
      } finally {
        setSubmit(false);
      }
    }

    if (submit && itemDetails) {
      submitForm();
    }
  }, [submit]);

  const toggle = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const modalToggle = () => {
    setModal(!modal);
  };

  const addProductAttribute = () => {
    setModal(!modal);
  };

  const onAttributeDeleteClick = () => {};

  return mode === 'update' && !itemDetails ? (
    <ParallelLoader />
  ) : (
    <Fragment>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === '1',
            })}
            onClick={() => {
              toggle('1');
            }}
          >
            <FormattedMessage id="sys.productDetails" />
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === '2',
            })}
            onClick={() => {
              toggle('2');
            }}
          >
            <FormattedMessage id="sys.productAttributes" />
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab} className="table-content">
        <TabPane tabId="1">
          <Formik
            enableReinitialize
            initialValues={{ ...itemDetails }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              setItemDetails(values);
              setSubmit(true);
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
                {error ? (
                  <Alert color="danger">
                    <FormattedMessage id="sys.newFailed" />
                  </Alert>
                ) : submitted ? (
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
                              onChange={handleChange}
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
                              onChange={handleChange}
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
                              onChange={handleChange}
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
                    {itemAttributes.length ? (
                      itemAttributes.map(item => {
                        return (
                          <ProductAttributeListItem
                            key={item.code}
                            code={item.code}
                            name={item.attributeName}
                            varPrice={item.varPrice}
                            quantity={item.quantity}
                            category={item.productAttributeCategoryName}
                            status={item.status}
                            currencySign="$"
                            onDeleteClick={onAttributeDeleteClick}
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
                  onClick={addProductAttribute}
                >
                  <MdAddCircleOutline />
                  &nbsp;
                  <FormattedMessage id="sys.addNew" />
                </Button>
              </Col>
            </Row>
          </Form>
          <Modal isOpen={modal} toggle={modalToggle} zIndex="10000">
            <ModalHeader toggle={modalToggle}>
              <FormattedMessage id="sys.addProductAttribute" />
            </ModalHeader>
            <ModalBody>
              <ProductAttributeForm />
            </ModalBody>
          </Modal>
        </TabPane>
      </TabContent>
    </Fragment>
  );
};

ProductForm.propTypes = {
  intl: PropTypes.object.isRequired,
  match: PropTypes.object,
  mode: PropTypes.string.isRequired,
};

export default injectIntl(ProductForm);
