import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FormattedMessage } from 'react-intl';
import { Col, FormGroup, Label, Button, Input, Alert, Row } from 'reactstrap';
import { MdSave } from 'react-icons/md';
import { Loader } from '../../components';
import { FormContext } from '../contexts';
import config from '../../config';

const categoryValidation = Yup.object().shape({
  name: Yup.string().required('Required'),
});

const CategoryForm = props => {
  const { mode } = props;
  const { storeId, id } = useContext(FormContext);
  const [submit, setSubmit] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [itemDetails, setItemDetails] = useState(null);
  const [parentCategories, setParentCategories] = useState([]);

  useEffect(() => {
    async function fetchParentCategories() {
      try {
        const res = await axios({
          method: 'get',
          url: `${
            config.apiDomain
          }/stores/${storeId}/categories?page=1&size=200`,
          headers: {
            authorization: localStorage.getItem(config.accessTokenKey),
          },
        });

        setParentCategories(res.data.data);
      } catch (e) {
        //TODO: add error msg
      }
    }

    fetchParentCategories();
  }, []);

  useEffect(() => {
    async function fetchItemDetails() {
      try {
        const res = await axios({
          method: 'get',
          url: `${config.apiDomain}/stores/${storeId}/categories/${id}`,
          headers: {
            authorization: localStorage.getItem(config.accessTokenKey),
          },
        });

        setItemDetails(res.data);
      } catch (e) {
        //TODO: add error msg
      }
    }

    fetchItemDetails();
  }, []);

  useEffect(() => {
    async function submitForm() {
      try {
        const res = await axios({
          method: mode === 'new' ? 'post' : 'put',
          url: `${config.apiDomain}/stores/${storeId}/categories${
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

  return mode === 'update' && !itemDetails ? (
    <Loader />
  ) : (
    <Formik
      enableReinitialize
      initialValues={{ ...itemDetails }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        setItemDetails(values);
        setSubmit(true);
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
          <Row>
            <Col sm="12">
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
            </Col>
          </Row>
          {error ? (
            <Alert color="danger">
              <FormattedMessage id="sys.newFailed" />
            </Alert>
          ) : submitted ? (
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
              {errors.name && <div className="text-danger">{errors.name}</div>}
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
                disabled={itemDetails && itemDetails.level === 1 ? true : false}
              >
                <option value="">--</option>
                {parentCategories
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
};

CategoryForm.propTypes = {
  history: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired,
};

export default CategoryForm;
