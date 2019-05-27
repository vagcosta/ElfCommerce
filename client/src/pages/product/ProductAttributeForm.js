import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Button, Row, Col, Input, FormGroup, Label } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import numeral from 'numeral';
import { selectOrderProduct, addOrderProduct } from '../../modules/order';
import { searchProducts, clearSearchProducts } from '../../modules/product';

const productAttrValidation = Yup.object().shape({
  attributeName: Yup.string().required('Required'),
  category: Yup.string().required('Required'),
  varPrice: Yup.number().required('Required'),
  qty: Yup.number()
    .integer()
    .required('Required'),
});

class ProductAttributeForm extends Component {
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
    const { dispatch, reset } = this.props;
    dispatch(clearSearchProducts());
    dispatch(selectOrderProduct(item));

    reset();
  };

  onAddProductSubmit = item => {
    const { dispatch, reset } = this.props;
  };

  render() {
    const { categories } = this.props;

    return (
      <Formik
        enableReinitialize
        initialValues={{ search: '', qty: '1' }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          this.onAddProductSubmit(values);
          setSubmitting(false);
        }}
        validationSchema={productAttrValidation}
      >
        {({
          values: {
            attributeName = '',
            category = '',
            varPrice = '',
            qty = '',
          },
          handleChange,
          isSubmitting,
          errors,
        }) => (
          <Form>
            <Row>
              <Col md={10}>
                <FormGroup row>
                  <Label for="name" sm={5}>
                    <FormattedMessage id="sys.attributeName" />
                    <span className="text-danger mandatory-field">*</span>
                  </Label>
                  <Col md={7}>
                    <Input
                      name="attributeName"
                      id="attribute-name"
                      value={attributeName}
                      onChange={handleChange}
                    />
                    {errors.attributeName && (
                      <div className="text-danger">{errors.attributeName}</div>
                    )}
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="name" sm={5}>
                    <FormattedMessage id="sys.category" />
                    <span className="text-danger mandatory-field">*</span>
                  </Label>
                  <Col md={7}>
                    <Input
                      type="select"
                      name="category"
                      id="category"
                      value={category}
                      onChange={handleChange}
                    >
                      <option value="">--</option>
                      {categories.map(item => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </Input>
                    {errors.category && (
                      <div className="text-danger">{errors.category}</div>
                    )}
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="name" sm={5}>
                    <FormattedMessage id="sys.varPrice" />
                    <span className="text-danger mandatory-field">*</span>
                  </Label>
                  <Col md={7}>
                    <Input
                      name="varPrice"
                      id="var-price"
                      value={varPrice}
                      onChange={handleChange}
                    />
                    {errors.varPrice && (
                      <div className="text-danger">{errors.varPrice}</div>
                    )}
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="name" sm={5}>
                    <FormattedMessage id="sys.qty" />
                    <span className="text-danger mandatory-field">*</span>
                  </Label>
                  <Col md={7}>
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
                </FormGroup>
              </Col>
              <Col md={2} style={{ display: 'flex', alignItems: 'flex-end' }}>
                <Button color="success" type="submit" disabled={isSubmitting}>
                  <FormattedMessage id="sys.add" />
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    );
  }
}

ProductAttributeForm.propTypes = {
  storeId: PropTypes.string.isRequired,
  intl: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  reset: PropTypes.func,
  match: PropTypes.object,
  categories: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(
  connect(state => {
    return {
      categories: [],
    };
  })(injectIntl(ProductAttributeForm))
);
