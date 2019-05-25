import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import {
  Col,
  Row,
  Form,
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
    const { handleSubmit, accountDetails, mode, error, done } = this.props;

    return mode === 'update' && !('code' in accountDetails) ? (
      <Loader />
    ) : (
      <Formik initialValues={{ ...accountDetails }}>
        {({
          values: { name, email },
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <Form onSubmit={handleSubmit(data => this.onSubmit(data))}>
            <Button size="sm" color="primary" className="pull-right form-btn">
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
                          className="form-control"
                          id="name"
                          value={name}
                        />
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
                          className="form-control"
                          id="email"
                          readonly={mode === 'update' ? true : false}
                          value={email}
                        />
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
                            className="form-control"
                            id="password"
                          />
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
                          data={[
                            { id: 1, name: 'Admin' },
                            { id: 2, name: 'User' },
                          ]}
                        />
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
  handleSubmit: PropTypes.func.isRequired,
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
      enableReinitialize: true,
    };
  })(AccountForm)
);
