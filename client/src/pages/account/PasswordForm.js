import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import {
  Form,
  CardHeader,
  Input,
  Button,
  Card,
  CardBody,
  FormGroup,
  Label,
  Col,
  Alert,
} from 'reactstrap';
import {
  submitAccount,
} from '../../modules/account';

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

class PasswordForm extends Component {
  onSubmit = data => {
    const {
      dispatch,
      storeId,
      accountId,
    } = this.props;

    data.storeId = storeId;
    data.mode = 'update';
    data.accountId = accountId;

    dispatch(submitAccount(data));
  };

  render() {
    const {
      handleSubmit,
      error,
      done,
    } = this.props;

    return (
      <Form onSubmit={handleSubmit(data => this.onSubmit(data))} id="reset-pwd-form">
        <Card>
          <CardHeader>
            <FormattedMessage id="sys.resetPwd" />
          </CardHeader>
          <CardBody>
            <FormGroup row>
              <Label for="current-pwd" sm={4}>
                <FormattedMessage id="sys.newPwd" />
                <span className="text-danger mandatory-field">*</span>
              </Label>
              <Col sm={8}>
                <Field
                  component={renderField}
                  type="password"
                  name="password"
                  className="form-control"
                  id="password"
                  validate={[required]}
                />
              </Col>
            </FormGroup>
            <Button color="primary" style={{ marginTop: 10 }}>
              <FormattedMessage id="sys.save" />
            </Button><br /><br />
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
          </CardBody>
        </Card>
      </Form>
    );
  }
}

PasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  storeId: PropTypes.string.isRequired,
  accountId: PropTypes.string.isRequired,
  error: PropTypes.bool,
  done: PropTypes.bool.isRequired,
};

PasswordForm = reduxForm({
  form: 'passwordForm',
})(PasswordForm);

export default withRouter(
  connect(state => {
    return {
      initialValues: state.accountReducer.accountDetails,
      done: state.accountReducer.done,
      error: state.accountReducer.error,
      enableReinitialize: true,
    };
  })(PasswordForm)
);
