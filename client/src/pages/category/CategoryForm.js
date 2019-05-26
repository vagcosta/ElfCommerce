import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FormattedMessage } from 'react-intl';
import { Col, FormGroup, Label, Button, Input, Alert } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { MdSave } from 'react-icons/md';
import {
  fetchCategories,
  fetchCategoryDetails,
  submitCategory,
  clearCategoryDetails,
} from '../../modules/category';
import { Loader } from '../../components';

const categoryValidation = Yup.object().shape({
  name: Yup.string().required('Required'),
});

class CategoryForm extends Component {
  componentWillMount() {
    this.props.dispatch(clearCategoryDetails());
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

    dispatch(fetchCategories({ storeId, pageSize: 200, pageNo: 1 }));

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
    const { categories, categoryDetails, mode, done, error } = this.props;

    return mode === 'update' && !('code' in categoryDetails) ? (
      <Loader />
    ) : (
      <Formik
        enableReinitialize
        initialValues={{ ...categoryDetails }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          this.onSubmit(values);
          setSubmitting(false);
        }}
        validationSchema={categoryValidation}
      >
        {({
          values: { name = '', parentId = '' },
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
            ) : done ? (
              <Alert color="success">
                <FormattedMessage id="sys.newSuccess" />
              </Alert>
            ) : null}
            <FormGroup row>
              <Label for="name" sm={2}>
                <FormattedMessage id="sys.categoryName" />
                <span className="text-danger mandatory-field">*</span>
              </Label>
              <Col sm={10}>
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
              <Label for="parent-id" sm={2}>
                <FormattedMessage id="sys.parentCategory" />
              </Label>
              <Col sm={10}>
                <Input
                  type="select"
                  id="parent-id"
                  name="parentId"
                  value={parentId}
                  onChange={handleChange}
                  disabled={categoryDetails.level === 1 ? true : false}
                >
                  <option value="">--</option>
                  {categories
                    .filter(cat => cat.level === 1)
                    .map(cat => (
                      <option key={cat.code} value={cat.code}>
                        {cat.name}
                      </option>
                    ))}
                </Input>
              </Col>
            </FormGroup>
          </Form>
        )}
      </Formik>
    );
  }
}

CategoryForm.propTypes = {
  categories: PropTypes.array.isRequired,
  storeId: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  done: PropTypes.bool.isRequired,
  categoryDetails: PropTypes.object.isRequired,
  error: PropTypes.bool,
  match: PropTypes.object,
  mode: PropTypes.string.isRequired,
};

export default withRouter(
  connect(state => {
    return {
      categoryDetails: state.categoryReducer.categoryDetails,
      done: state.categoryReducer.done,
      error: state.categoryReducer.error,
      categories: state.categoryReducer.categories.data,
    };
  })(CategoryForm)
);
