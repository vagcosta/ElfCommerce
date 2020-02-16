import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Input, Button, Alert } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import config from '../../config';

const LoginForm = props => {
  const {
    intl: { formatMessage },
  } = props;

  const [showLoading, setLoading] = useState(false);
  const [values, setValues] = useState(null);
  const [auth, setAuth] = useState(null);

  localStorage.removeItem(config.accessTokenKey);

  useEffect(() => {
    async function login() {
      try {
        if (showLoading) {
          const res = await axios.post(`${config.apiDomain}/auth`, {
            username: values.username,
            password: values.password,
            grantType: 'password',
            scope: 'profile',
          });

          if (res.status === 200) {
            localStorage.setItem(config.accessTokenKey, res.data.accessToken);
            window.location.href = '/dashboard';
          }
        }
      } catch (e) {
        setLoading(false);
        setAuth(false);
      }
    }

    login();
  });

  return (
    <Formik
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        setValues(values);
        setLoading(true);
        setSubmitting(false);
      }}
    >
      {({ handleChange, isSubmitting, errors }) => {
        return (
          <Form id="login-form">
            <Input
              type="email"
              name="username"
              id="username"
              placeholder={formatMessage({ id: 'sys.email' })}
              onChange={handleChange}
            />
            {errors.username && (
              <div className="text-danger">{errors.username}</div>
            )}
            <br />
            <Input
              type="password"
              name="password"
              id="password"
              placeholder={formatMessage({ id: 'sys.pwd' })}
              onChange={handleChange}
            />
            {errors.password && (
              <div className="text-danger">{errors.password}</div>
            )}
            <br />
            {showLoading && auth === null ? (
              <img src={require('../../assets/coffee_loader.svg')} />
            ) : (
              <Button color="dark" type="submit" block disabled={isSubmitting}>
                <FormattedMessage id="sys.signin" />
              </Button>
            )}
            {auth === false ? (
              <Alert color="danger" style={{ marginTop: 20 }}>
                <FormattedMessage id="sys.invalidAuth" />
              </Alert>
            ) : null}
          </Form>
        );
      }}
    </Formik>
  );
};

LoginForm.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default withRouter(injectIntl(LoginForm));
