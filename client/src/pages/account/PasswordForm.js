import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import {
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
import { submitAccount } from '../../modules/account';

const passwordValidation = Yup.object().shape({
  password: Yup.string().required('Required'),
});

class PasswordForm extends Component {
  onSubmit = data => {
    const { dispatch, storeId, accountId } = this.props;

    data.storeId = storeId;
    data.mode = 'update';
    data.accountId = accountId;

    dispatch(submitAccount(data));
  };

  render() {
    const { error, done } = this.props;

    return (
      <Formik
        enableReinitialize
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          this.onSubmit(values);
          setSubmitting(false);
        }}
        validationSchema={passwordValidation}
      >
        {({ handleChange, isSubmitting, errors }) => (
          <Form id="reset-pwd-form">
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
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      onChange={handleChange}
                    />
                    {errors.password && (
                      <div className="text-danger">{errors.password}</div>
                    )}
                  </Col>
                </FormGroup>
                <Button
                  color="primary"
                  style={{ marginTop: 10 }}
                  type="submit"
                  disabled={isSubmitting}
                >
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
              </CardBody>
            </Card>
          </Form>
        )}
      </Formik>
    );
  }
}

PasswordForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  storeId: PropTypes.string.isRequired,
  accountId: PropTypes.string.isRequired,
  error: PropTypes.bool,
  done: PropTypes.bool.isRequired,
};

export default withRouter(
  connect(state => {
    return {
      done: state.accountReducer.done,
      error: state.accountReducer.error,
    };
  })(PasswordForm)
);
