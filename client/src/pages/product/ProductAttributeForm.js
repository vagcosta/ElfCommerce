import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { injectIntl, FormattedMessage } from 'react-intl';
import {
  Form,
  Button,
  Row,
  Col,
  Table,
  FormGroup,
  Label,
} from 'reactstrap';
import { withRouter } from 'react-router-dom';
import numeral from 'numeral';
import {
  selectOrderProduct,
  addOrderProduct,
} from '../../modules/order';
import {
  searchProducts,
  clearSearchProducts,
} from '../../modules/product';

const required = value => (value ? undefined : 'Required');

const renderField = ({ input, type, placeholder, className, style, meta: { touched, error } }) => (
  <div>
    <input {...input} placeholder={placeholder} type={type} className={className} style={style} />
    {touched && (error && <span className="text-danger">{error}</span>)}
  </div>
);

const renderSelect = ({ input, data, meta: { touched, error } }) => (
  <div>
    <select {...input} className="form-control">
      <option />
      {data.map(item => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </select>
    {touched && (error && <div><span className="text-danger">{error}</span></div>)}
  </div>
);

class ProductAttributeForm extends Component {
  onSearchChange = event => {
    const { dispatch, storeId } = this.props;

    // TODO: replace hardcoded page number and page size
    if (event.target.value.length >= 3) {
      dispatch(searchProducts({ storeId, keyword: event.target.value, pageNo: 1, pageSize: 200 }));
    } else {
      dispatch(clearSearchProducts());
    }
  };

  onItemClick = item => {
    const { dispatch, reset } = this.props;
    dispatch(clearSearchProducts());
    dispatch(selectOrderProduct(item));

    reset();
  }

  onAddProductSubmit = item => {
    const { dispatch, productSelected, reset } = this.props;

    dispatch(addOrderProduct({
      code: productSelected.code,
      name: productSelected.name,
      unitPrice: productSelected.unitPrice,
      quantity: parseInt(item.qty),
      amount: productSelected.unitPrice * parseInt(item.qty),
    }));

    reset();
  }

  render() {
    const {
      handleSubmit,
    } = this.props;

    return (
      <Form onSubmit={handleSubmit(data => this.onAddProductSubmit(data))}>
        <Row>
          <Col md={10}>
            <FormGroup row>
              <Label for="name" sm={5}>
                <FormattedMessage id="sys.attributeName" />
                <span className="text-danger mandatory-field">*</span>
              </Label>
              <Col md={7}>
                <Field
                  component={renderField}
                  name="attributeName"
                  className="form-control"
                  id="attribute-name"
                  validate={[required]}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="name" sm={5}>
                <FormattedMessage id="sys.category" />
                <span className="text-danger mandatory-field">*</span>
              </Label>
              <Col md={7}>
                <Field
                  component={renderSelect}
                  name="category"
                  className="form-control"
                  id="category"
                  data={[]}
                  validate={[required]}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="name" sm={5}>
                <FormattedMessage id="sys.varPrice" />
                <span className="text-danger mandatory-field">*</span>
              </Label>
              <Col md={7}>
                <Field
                  component={renderField}
                  name="varPrice"
                  className="form-control"
                  id="var-price"
                  validate={[required]}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="name" sm={5}>
                <FormattedMessage id="sys.qty" />
                <span className="text-danger mandatory-field">*</span>
              </Label>
              <Col md={7}>
                <Field
                  component={renderField}
                  name="qty"
                  id="qty"
                  type="number"
                  style={{ width: 60, padding: 2 }}
                  validate={[required]}
                />
              </Col>
            </FormGroup>
          </Col>
          <Col md={2} style={{ display: 'flex', alignItems: 'flex-end' }}>
            <Button color="success"><FormattedMessage id="sys.add" /></Button>
          </Col>
        </Row>
      </Form >
    );
  }
}

ProductAttributeForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  storeId: PropTypes.string.isRequired,
  intl: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  match: PropTypes.object,
  productSelected: PropTypes.object,
  history: PropTypes.object.isRequired,
  products: PropTypes.array.isRequired,
};

ProductAttributeForm = reduxForm({
  form: 'productAttributeForm',
})(ProductAttributeForm);

export default withRouter(
  connect(state => {
    return {
      initialValues: { search: '', qty: '1' },
      products: state.productReducer.products,
      productSelected: state.orderReducer.productSelected,
      enableReinitialize: true,
    };
  })(injectIntl(ProductAttributeForm))
);
