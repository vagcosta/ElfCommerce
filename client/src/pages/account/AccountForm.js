import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import {
  Col,
  Row,
  FormGroup,
  Label,
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Alert,
} from 'reactstrap';
import { MdSave } from 'react-icons/md';
import { Loader } from '../../components';
import config from '../../config';

const accountValidation = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().required('Required'),
  role: Yup.number().required('Required'),
});

const AccountForm = props => {
  const {
    mode,
    storeId,
    match: {
      params: { id },
    },
  } = props;

  const [submit, setSubmit] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [accountDetails, setAccountDetails] = useState(null);

  useEffect(() => {
    async function fetchAccountDetails({ storeId, id }) {
      try {
        const res = await axios.get(
          `${config.apiDomain}/stores/${storeId}/accounts/${id}`,
          {
            headers: {
              authorization: localStorage.getItem(config.accessTokenKey),
            },
          }
        );

        setAccountDetails(res.data);
      } catch (e) {
        setError(true);
      }
    }

    if (mode === 'update') {
      fetchAccountDetails({ storeId, id });
    }
  }, []);

  useEffect(() => {
    async function submitForm() {
      try {
        if (mode === 'new') {
          accountDetails.password = accountDetails.password || '123';
        }
        const res = await axios({
          method: mode === 'new' ? 'post' : 'put',
          url: `${config.apiDomain}/stores/${storeId}/accounts${
            mode === 'new' ? '' : '/' + id
          }`,
          headers: {
            authorization: localStorage.getItem(config.accessTokenKey),
            'Content-Type': 'application/json',
          },
          data: accountDetails,
        });

        setSubmitted(true);
      } catch (e) {
        setError(true);
      } finally {
        setSubmit(false);
      }
    }
    if (submit && accountDetails) {
      submitForm();
    }
  }, [submit]);

  return mode === 'update' && !accountDetails ? (
    <Loader />
  ) : (
    <Formik
      enableReinitialize
      initialValues={{ ...accountDetails }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        setAccountDetails(values);
        setSubmit(true);
        setSubmitting(false);
      }}
      validationSchema={accountValidation}
    >
      {({
        values: { name = '', email = '', role = '' },
        handleChange,
        isSubmitting,
        errors,
      }) => (
        <Form>
          <Row>
            <Col sm="12">
              <Button
                size="sm"
                color="primary"
                type="submit"
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
          <Row>
            <Col md={12}>
              <Card>
                <CardHeader>
                  <FormattedMessage id="sys.basicInfo" />
                </CardHeader>
                <CardBody>
                  <FormGroup row>
                    <Label for="name" sm={2}>
                      <FormattedMessage id="sys.name" />
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
                    <Label for="email" sm={2}>
                      <FormattedMessage id="sys.email" />
                      <span className="text-danger mandatory-field">*</span>
                    </Label>
                    <Col sm={10}>
                      <Input
                        type="email"
                        name="email"
                        id="email"
                        onChange={handleChange}
                        readOnly={mode === 'update' ? true : false}
                        value={email}
                      />
                      {errors.email && (
                        <div className="text-danger">{errors.email}</div>
                      )}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="role" sm={2}>
                      <FormattedMessage id="sys.role" />
                      <span className="text-danger mandatory-field">*</span>
                    </Label>
                    <Col sm={10}>
                      <Input
                        type="select"
                        name="role"
                        id="role"
                        value={role}
                        onChange={handleChange}
                      >
                        <option value="">--</option>
                        {[
                          { id: 1, name: 'Admin' },
                          { id: 2, name: 'User' },
                        ].map(role => (
                          <option key={role.id} value={role.id}>
                            {role.name}
                          </option>
                        ))}
                      </Input>
                      {errors.role && (
                        <div className="text-danger">{errors.role}</div>
                      )}
                    </Col>
                  </FormGroup>
                  {mode === 'new' ? (
                    <FormGroup row>
                      <Label for="password" sm={2}>
                        <FormattedMessage id="sys.pwd" />
                        <br />
                        <small className="text-info">
                          <FormattedMessage id="sys.defaultPwd" />
                        </small>
                      </Label>
                      <Col sm={10}>
                        <Input
                          name="password"
                          id="password"
                          type="password"
                          onChange={handleChange}
                        />
                        {errors.password && (
                          <div className="text-danger">{errors.password}</div>
                        )}
                      </Col>
                    </FormGroup>
                  ) : null}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

AccountForm.propTypes = {
  match: PropTypes.object,
  mode: PropTypes.string.isRequired,
  storeId: PropTypes.string.isRequired,
};

export default withRouter(AccountForm);
