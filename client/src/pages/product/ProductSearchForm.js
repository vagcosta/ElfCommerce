import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Button, Row, Col, Table, Input } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import numeral from 'numeral';
import { selectOrderProduct, addOrderProduct } from '../../modules/order';
import { searchProducts, clearSearchProducts } from '../../modules/product';
import { FormContext } from '../contexts';
import config from '../../config';

const searchValidation = Yup.object().shape({
  qty: Yup.number()
    .integer()
    .required('Required'),
});

const ProductSearchForm = props => {
  const {
    intl: { formatMessage },
  } = props;
  const { storeId, id } = useContext(FormContext);
  const [products, setProducts] = useState([]);
  const [productSelected, setProductSelected] = useState(null);
  const [submit, setSubmit] = useState(false);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    async function searchProduct() {
      const res = await axios({
        method: 'get',
        url: `${
          config.apiDomain
        }/stores/${storeId}/products?q=${keyword}&page=1&size=200`,
        headers: {
          authorization: localStorage.getItem(config.accessTokenKey),
        },
      });

      setProducts(res.data.products);
    }

    if (submit) {
      searchProduct();
    }
  }, [submit]);

  const searchChange = event => {
    if (event.target.value.length >= 3) {
      setKeyword(event.target.value);
      setSubmit(true);
    }
  };

  const clickItem = item => {
    setProductSelected(item);
  };

  const submitProduct = item => {
    // TODO: Check quantity input is smaller than available quantity
    productSelected.quantity = parseInt(item.qty);
    productSelected.amount = productSelected.unitPrice * parseInt(item.qty);
    const newProductList = [...products];

    newProductList.forEach(product => {
      if (product.code === productSelected.code) {
        product.quantity = product.quantity + productSelected.quantity;
        product.amount = product.amount + productSelected.amount;
        setProductSelected(null);
      }
    });

    if (productSelected) {
      newProductList.push(productSelected);
    }

    setProducts(newProductList);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{ search: '', qty: '1' }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        submitProduct(values);
        setSubmitting(false);
      }}
      validationSchema={searchValidation}
    >
      {({
        values: { qty = 1, search = '' },
        handleChange,
        isSubmitting,
        errors,
      }) => (
        <Form>
          <Row>
            <Col md={12}>
              <Input
                name="search"
                id="search"
                placeholder={formatMessage({ id: 'sys.searchProducts' })}
                onChange={searchChange}
              />
              {products.length ? (
                <Table hover size="sm" className="search-result">
                  <thead>
                    <tr>
                      <th>
                        <FormattedMessage id="sys.productName" />
                      </th>
                      <th>
                        <FormattedMessage id="sys.sku" />
                      </th>
                      <th>
                        <FormattedMessage id="sys.unitPrice" />
                      </th>
                      <th>
                        <FormattedMessage id="sys.qty" />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(product => {
                      const { code, name, sku, unitPrice, quantity } = product;
                      return (
                        <tr
                          style={{ cursor: 'pointer' }}
                          key={code}
                          onClick={() =>
                            clickItem({
                              code,
                              name,
                              sku,
                              unitPrice,
                              quantity,
                            })
                          }
                        >
                          <td>{product.name}</td>
                          <td>{product.sku}</td>
                          <td>
                            ${numeral(product.unitPrice).format('0,0.00')}
                          </td>
                          <td>{quantity}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              ) : null}
            </Col>
          </Row>
          <br />
          {productSelected.code ? (
            <Row>
              <Col md={10} style={{ fontSize: 13 }}>
                <Row>
                  <Col md={4}>
                    <FormattedMessage id="sys.productName" />:
                  </Col>
                  <Col md={8}>{productSelected.name}</Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <FormattedMessage id="sys.sku" />:
                  </Col>
                  <Col md={8}>{productSelected.sku}</Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <FormattedMessage id="sys.unitPrice" />:
                  </Col>
                  <Col md={8}>
                    ${numeral(productSelected.unitPrice).format('0,0.00')}
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <FormattedMessage id="sys.qty" />:
                  </Col>
                  <Col md={8}>
                    <Input
                      name="qty"
                      id="qty"
                      type="number"
                      style={{ width: 60, padding: 2 }}
                      value={qty}
                      onChange={handleChange}
                    />
                    {errors.qty && (
                      <div className="text-danger">{errors.qty}</div>
                    )}
                  </Col>
                </Row>
              </Col>
              <Col md={2} style={{ display: 'flex', alignItems: 'flex-end' }}>
                <Button type="submit" color="success" disabled={isSubmitting}>
                  <FormattedMessage id="sys.add" />
                </Button>
              </Col>
            </Row>
          ) : null}
        </Form>
      )}
    </Formik>
  );
};

ProductSearchForm.propTypes = {
  intl: PropTypes.object.isRequired,
  match: PropTypes.object,
  productSelected: PropTypes.object,
};

export default injectIntl(ProductSearchForm);
