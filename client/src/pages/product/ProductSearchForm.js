import React, { Component } from 'react';
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

const searchValidation = Yup.object().shape({
  qty: Yup.number()
    .integer()
    .required('Required'),
});

class ProductSearchForm extends Component {
  onSearchChange = event => {
    const { dispatch, storeId } = this.props;

    // TODO: replace hardcoded page number and page size
    if (event.target.value.length >= 3) {
      dispatch(
        searchProducts({
          storeId,
          keyword: event.target.value,
          pageNo: 1,
          pageSize: 200,
        })
      );
    } else {
      dispatch(clearSearchProducts());
    }
  };

  onItemClick = item => {
    const { dispatch } = this.props;
    dispatch(clearSearchProducts());
    dispatch(selectOrderProduct(item));
  };

  onAddProductSubmit = item => {
    const { dispatch, productSelected } = this.props;
    // TODO: Check quantity input is smaller than available quantity
    dispatch(
      addOrderProduct({
        code: productSelected.code,
        name: productSelected.name,
        unitPrice: productSelected.unitPrice,
        quantity: parseInt(item.qty),
        amount: productSelected.unitPrice * parseInt(item.qty),
      })
    );
  };

  render() {
    const {
      products,
      productSelected,
      intl: { formatMessage },
    } = this.props;

    return (
      <Formik
        enableReinitialize
        initialValues={{ search: '', qty: '1' }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          this.onAddProductSubmit(values);
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
                  onChange={this.onSearchChange}
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
                        const {
                          code,
                          name,
                          sku,
                          unitPrice,
                          quantity,
                        } = product;
                        return (
                          <tr
                            style={{ cursor: 'pointer' }}
                            key={code}
                            onClick={() =>
                              this.onItemClick({
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
  }
}

ProductSearchForm.propTypes = {
  storeId: PropTypes.string.isRequired,
  intl: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object,
  productSelected: PropTypes.object,
  history: PropTypes.object.isRequired,
  products: PropTypes.array,
};

export default withRouter(
  connect(state => {
    return {
      products: state.productReducer.products
        ? state.productReducer.products.data
        : [],
      productSelected: state.orderReducer.productSelected,
    };
  })(injectIntl(ProductSearchForm))
);
