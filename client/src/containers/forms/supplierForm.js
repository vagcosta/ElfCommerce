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
import { FiSave } from 'react-icons/fi';
import {
  fetchCountries,
  submitSupplier,
  fetchSupplierDetails,
  clearSupplierDetails,
  uploadFile,
} from '../../actions';
import { ProfileLoader } from '../../components';
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

class SupplierForm extends Component {
  componentWillMount() {
    const { dispatch } = this.props;

    dispatch(
      clearSupplierDetails()
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

    dispatch(fetchCountries());

    if (mode === 'update') {
      dispatch(
        fetchSupplierDetails({ storeId, supplierId: id })
      );
    }
  }

  onSubmit = data => {
    const {
      dispatch,
      storeId,
      mode,
      uploadedFile,
      match: {
        params: { id },
      },
    } = this.props;

    data.storeId = storeId;
    data.mode = mode;

    if (mode === 'update') {
      data.supplierId = id;
    }

    if (uploadedFile) {
      data.logo = uploadedFile.path;
    }

    dispatch(submitSupplier(data));
  };

  handleUpload = event => {
    const { dispatch } = this.props;

    dispatch(uploadFile(event.target.files[0]));
  }

  render() {
    const {
      handleSubmit,
      initialValues,
      countries,
      uploadedFile,
      mode,
      error,
      done,
      loaded,
    } = this.props;

    let logo = null;

    if (initialValues.logo) {
      logo = `${config.mediaFileDomain}/${initialValues.logo}`;
    }

    if (uploadedFile) {
      logo = `${config.mediaFileDomain}/${uploadedFile.path}`;
    }

    return (
      mode === 'update' && !loaded ?
        <ProfileLoader /> :
        <Form onSubmit={handleSubmit(data => this.onSubmit(data))}>
          <Button size="sm" color="primary" className="pull-right form-btn">
            <FiSave />
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
            <Col md={3}>
              <p className="lead"><FormattedMessage id="sys.logo" /></p>
              <img
                src={logo || require('../../assets/no_image.svg')}
                className="logo-lg"
              /><br /><br />
              <input
                type="file"
                name="logo"
                id="logo"
                onChange={this.handleUpload}
              />
            </Col>
            <Col md={9}>
              <Card>
                <CardHeader>
                  <FormattedMessage id="sys.basicInfo" />
                </CardHeader>
                <CardBody>
                  <FormGroup row>
                    <Label for="name" sm={3}>
                      <FormattedMessage id="sys.name" />
                      <span className="text-danger mandatory-field">*</span>
                    </Label>
                    <Col sm={9}>
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
                    <Label for="url" sm={3}>
                      <FormattedMessage id="sys.website" />
                    </Label>
                    <Col sm={9}>
                      <Field
                        component={renderField}
                        name="url"
                        className="form-control"
                        id="url"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="email" sm={3}>
                      <FormattedMessage id="sys.email" />
                    </Label>
                    <Col sm={9}>
                      <Field
                        component={renderField}
                        name="email"
                        className="form-control"
                        id="email"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="contact" sm={3}>
                      <FormattedMessage id="sys.contactNo" />
                      <span className="text-danger mandatory-field">*</span>
                    </Label>
                    <Col sm={9}>
                      <Field
                        component={renderField}
                        name="contact"
                        className="form-control"
                        id="contact"
                        validate={[required]}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="country-id" sm={3}>
                      <FormattedMessage id="sys.country" />
                      <span className="text-danger mandatory-field">*</span>
                    </Label>
                    <Col sm={9}>
                      <Field
                        component={renderSelect}
                        name="countryId"
                        id="country-id"
                        data={countries}
                        validate={[required]}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="address" sm={3}>
                      <FormattedMessage id="sys.address" />
                      <span className="text-danger mandatory-field">*</span>
                    </Label>
                    <Col sm={9}>
                      <Field
                        component={renderField}
                        name="address"
                        className="form-control"
                        id="address"
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

SupplierForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object,
  mode: PropTypes.string.isRequired,
  error: PropTypes.bool,
  done: PropTypes.bool.isRequired,
  loaded: PropTypes.bool.isRequired,
  storeId: PropTypes.string.isRequired,
  countries: PropTypes.array.isRequired,
  uploadedFile: PropTypes.object,
};

SupplierForm = reduxForm({
  form: 'supplierForm',
})(SupplierForm);

export default withRouter(
  connect(state => {
    return {
      initialValues: state.supplierReducer.supplierDetails,
      countries: state.publicReducer.countries,
      uploadedFile: state.publicReducer.uploadedFile,
      done: state.supplierReducer.done,
      loaded: state.supplierReducer.loaded,
      error: state.supplierReducer.error,
      enableReinitialize: true,
    };
  })(SupplierForm)
);
