import React, { Component } from 'react';
import { connect } from 'react-redux';
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
import {
  submitAccount,
  fetchAccountDetails,
  clearAccountDetails,
} from '../../modules/account';
import { Loader } from '../../components';

const accountValidation = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
  role: Yup.number().required('Required'),
});

class AccountForm extends Component {
  constructor(props) {
    super(props);

    this.props.dispatch(clearAccountDetails());
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

    if (mode === 'update') {
      dispatch(fetchAccountDetails({ storeId, accountId: id }));
    }
  }

  onSubmit = data => {
    const {
      dispatch,
      storeId,
      mode,
      match: {
        params: { id },
      },
    } = this.props;

    data.storeId = storeId;
    data.mode = mode;

    if (mode === 'update') {
      data.accountId = id;
    }

    dispatch(submitAccount(data));
  };

  render() {
    const { accountDetails, mode, error, done } = this.props;

    return mode === 'update' && !('code' in accountDetails) ? (
      <Loader />
    ) : (
      <Formik
        enableReinitialize
        initialValues={{ ...accountDetails }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          this.onSubmit(values);
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
            {error ? (
              <Alert color="danger">
                <FormattedMessage id="sys.newFailed" />
              </Alert>
            ) : done ? (
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
                    {mode === 'update' ? (
                      <span className="tab-content-title">
                        <FormattedMessage id="sys.joinedOn" />:{' '}
                        <b>{accountDetails.joinedOn}</b>
                        <br />
                        <br />
                      </span>
                    ) : null}
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
                          value={email || ''}
                        />
                        {errors.email && (
                          <div className="text-danger">{errors.email}</div>
                        )}
                      </Col>
                    </FormGroup>
                    {mode === 'new' ? (
                      <FormGroup row>
                        <Label for="password" sm={2}>
                          <FormattedMessage id="sys.pwd" />
                          <span className="text-danger mandatory-field">*</span>
                        </Label>
                        <Col sm={10}>
                          <Input
                            name="password"
                            type="password"
                            onChange={handleChange}
                            id="password"
                          />
                          {errors.password && (
                            <div className="text-danger">{errors.password}</div>
                          )}
                        </Col>
                      </FormGroup>
                    ) : null}
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
                          onChange={handleChange}
                          value={role}
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
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    );
  }
}

AccountForm.propTypes = {
  accountDetails: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object,
  mode: PropTypes.string.isRequired,
  error: PropTypes.bool,
  done: PropTypes.bool.isRequired,
  storeId: PropTypes.string.isRequired,
};

export default withRouter(
  connect(state => {
    return {
      accountDetails: state.accountReducer.accountDetails,
      done: state.accountReducer.done,
      error: state.accountReducer.error,
    };
  })(AccountForm)
);
