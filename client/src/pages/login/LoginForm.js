import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Input, Button, Alert } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { submitLoginData } from '../../modules/auth';
import config from '../../config';

const loginValidation = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoading: false,
    };

    localStorage.removeItem(config.accessTokenKey);
  }

  componentDidUpdate() {
    const { auth } = this.props;

    if (auth) {
      window.location.href = '/dashboard';
    }
  }

  onSubmit = data => {
    this.setState({ showLoading: true }, () => {
      const { dispatch } = this.props;
      dispatch(submitLoginData(data));
    });
  };

  render() {
    const {
      intl: { formatMessage },
      auth,
    } = this.props;

    return (
      <Formik
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          this.onSubmit(values);
          setSubmitting(false);
        }}
        validationSchema={loginValidation}
      >
        {({ handleChange, isSubmitting, errors }) => (
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
            {this.state.showLoading && auth === null ? (
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
        )}
      </Formik>
    );
  }
}

LoginForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  auth: PropTypes.any,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    auth: state.authReducer.auth,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(injectIntl(LoginForm))
);
