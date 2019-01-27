import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { Col, Form, FormGroup, Label, Button, Input, Alert } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { MdSave } from 'react-icons/md';
import {
  fetchParentCategories,
  fetchCategoryDetails,
  submitCategory,
  clearCategoryDetails,
} from '../../actions';
import { Loader } from '../../components';

const required = value => (value ? undefined : 'Required');

const renderField = ({
  input,
  placeholder,
  type,
  meta: { touched, error },
}) => (
    <div>
      <Input {...input} placeholder={placeholder} type={type} />
      {touched && (error && <span className="text-danger">{error}</span>)}
    </div>
  );

const renderSelect = ({ input, type, data, meta: { touched, error } }) => (
  <div>
    <select {...input} className="form-control">
      <option />
      {data.map(cat => (
        <option key={cat.code} value={cat.code}>
          {cat.name}
        </option>
      ))}
    </select>
    {touched && (error && <div><span className="text-danger">{error}</span></div>)}
  </div>
);

class CategoryForm extends Component {
  componentWillMount() {
    this.props.dispatch(
      clearCategoryDetails()
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

    dispatch(fetchParentCategories({ storeId, pageSize: 200, pageNo: 1 }));

    if (mode === 'update') {
      dispatch(
        fetchCategoryDetails({
          storeId,
          categoryId: id,
        })
      );
    }
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
    data.mode = mode;

    if (mode === 'update') {
      data.categoryId = id;
    }

    dispatch(submitCategory(data));
  };

  render() {
    const {
      handleSubmit,
      categories,
      mode,
      done,
      loaded,
      error,
    } = this.props;

    return (
      mode === 'update' && !loaded ?
        <Loader /> :
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
          <FormGroup row>
            <Label for="name" sm={2}>
              <FormattedMessage id="sys.categoryName" />
              <span className="text-danger mandatory-field">*</span>
            </Label>
            <Col sm={10}>
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
            <Label for="parent-id" sm={2}>
              <FormattedMessage id="sys.parentCategory" />
            </Label>
            <Col sm={10}>
              <Field
                component={renderSelect}
                id="parent-id"
                name="parentId"
                data={categories.filter(cat => !cat.parentId)}
              >
              </Field>
            </Col>
          </FormGroup>
        </Form>
    );
  }
}

CategoryForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  storeId: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  done: PropTypes.bool.isRequired,
  loaded: PropTypes.bool.isRequired,
  error: PropTypes.bool,
  match: PropTypes.object,
  mode: PropTypes.string.isRequired,
};

CategoryForm = reduxForm({
  form: 'categoryForm',
})(CategoryForm);

export default withRouter(
  connect(state => {
    return {
      initialValues: state.categoryReducer.categoryDetails,
      done: state.categoryReducer.done,
      loaded: state.categoryReducer.loaded,
      error: state.categoryReducer.error,
      categories: state.categoryReducer.categories.data,
      enableReinitialize: true,
    };
  })(CategoryForm)
);
