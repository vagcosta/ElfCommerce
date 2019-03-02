import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Form, Input, Button, Alert } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { submitLoginData } from '../../actions';
import config from '../../config';

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

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoading: false,
    };

    localStorage.removeItem(config.accessTokenKey);
  }

  componentDidUpdate() {
    const { auth, history } = this.props;

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
    const { handleSubmit, auth } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <Form
        onSubmit={handleSubmit(data => this.onSubmit(data))}
        id="login-form"
      >
        <Field
          component={renderField}
          type="email"
          name="username"
          id="username"
          placeholder={formatMessage({ id: 'sys.email' })}
          validate={[required]}
        /><br />
        <Field
          component={renderField}
          type="password"
          name="password"
          id="password"
          placeholder={formatMessage({ id: 'sys.pwd' })}
          validate={[required]}
        /><br />
        {
          this.state.showLoading && auth === null ?
            <img src={require('../../assets/coffee_loader.svg')} /> :
            <Button color="dark" type="submit" block>
              <FormattedMessage id="sys.signin" />
            </Button>
        }
        {auth === false ? (
          <Alert color="danger" style={{ marginTop: 20 }}>
            <FormattedMessage id="sys.invalidAuth" />
          </Alert>
        ) : null}
      </Form>
    );
  }
}

LoginForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  auth: PropTypes.any,
  history: PropTypes.object.isRequired,
};

LoginForm = reduxForm({
  form: 'loginForm',
})(injectIntl(LoginForm));

const mapStateToProps = state => {
  return {
    auth: state.authReducer.auth,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(LoginForm)
);
