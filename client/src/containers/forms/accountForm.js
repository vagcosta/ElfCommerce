import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
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
} from '../../actions';
import { Loader } from '../../components';

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

const renderSelect = ({ input, data, meta: { touched, error } }) => (
  <div>
    <select {...input} className="form-control">
      <option />
      {data.map(item => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </select>
    {touched && (error && <div><span className="text-danger">{error}</span></div>)}
  </div>
);

class AccountForm extends Component {
  constructor(props) {
    super(props);

    this.props.dispatch(
      clearAccountDetails()
    );
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
      dispatch(
        fetchAccountDetails({ storeId, accountId: id })
      );
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
    const {
      handleSubmit,
      accountDetails,
      mode,
      error,
      done,
    } = this.props;

    return (
      mode === 'update' && !('code' in accountDetails) ?
        <Loader /> :
        <Form onSubmit={handleSubmit(data => this.onSubmit(data))}>
          <Button size="sm" color="primary" className="pull-right form-btn">
            <MdSave />
            &nbsp;
            <FormattedMessage id="sys.save" />
          </Button>
          <br />
          <br />
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

          <Row>
            <Col md={12}>
              <Card>
                <CardHeader>
                  <FormattedMessage id="sys.basicInfo" />
                </CardHeader>
                <CardBody>
                  {
                    mode === 'update' ?
                      <span className="tab-content-title">
                        <FormattedMessage id="sys.joinedOn" />: <b>{accountDetails.joinedOn}</b><br /><br />
                      </span> : null
                  }
                  <FormGroup row>
                    <Label for="name" sm={2}>
                      <FormattedMessage id="sys.name" />
                      <span className="text-danger mandatory-field">*</span>
                    </Label>
                    <Col sm={10}>
                      <Field
                        component={renderField}
                        name="name"
                        className="form-control"
                        id="name"
                        validate={[required]}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="email" sm={2}>
                      <FormattedMessage id="sys.email" />
                    </Label>
                    <Col sm={10}>
                      <Field
                        component={renderField}
                        name="email"
                        className="form-control"
                        id="email"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="role" sm={2}>
                      <FormattedMessage id="sys.role" />
                      <span className="text-danger mandatory-field">*</span>
                    </Label>
                    <Col sm={10}>
                      <Field
                        component={renderSelect}
                        name="role"
                        id="role"
                        data={[{ id: 1, name: 'Admin' }, { id: 2, name: 'User' }]}
                        validate={[required]}
                      />
                    </Col>
                  </FormGroup>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Form>
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

AccountForm = reduxForm({
  form: 'accountForm',
})(AccountForm);

export default withRouter(
  connect(state => {
    return {
      initialValues: state.accountReducer.accountDetails,
      accountDetails: state.accountReducer.accountDetails,
      done: state.accountReducer.done,
      error: state.accountReducer.error,
      enableReinitialize: true,
    };
  })(AccountForm)
);
