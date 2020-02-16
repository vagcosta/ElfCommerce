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
import { fetchCountries, uploadFile } from '../../modules/common';
import {
  fetchManufacturerDetails,
  clearManufacturerDetails,
  submitManufacturer,
} from '../../modules/manufacturer';
import { ProfileLoader } from '../../components';
import config from '../../config';

const { mediaFileDomain, saveMediaFileLocal } = config;
const manufactureValidation = Yup.object().shape({
  name: Yup.string().required('Required'),
  contact: Yup.string().required('Required'),
  countryId: Yup.number().required('Required'),
  address: Yup.string().required('Required'),
});

class ManufacturerForm extends Component {
  constructor(props) {
    super(props);

    this.props.dispatch(clearManufacturerDetails());
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
      dispatch(fetchManufacturerDetails({ storeId, manufacturerId: id }));
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
      data.manufacturerId = id;
    }

    if (uploadedFile) {
      data.logo = uploadedFile.path;
    }

    dispatch(submitManufacturer(data));
  };

  handleUpload = event => {
    const { dispatch } = this.props;

    dispatch(uploadFile(event.target.files[0]));
  };

  render() {
    const {
      manufacturerDetails,
      countries,
      uploadedFile,
      mode,
      status,
    } = this.props;

    let logo = null;

    if (manufacturerDetails && manufacturerDetails.logo) {
      logo = `${
        manufacturerDetails.logo.indexOf('http') !== -1
          ? ''
          : mediaFileDomain + '/'
      }${manufacturerDetails.logo}`;
    }

    if (uploadedFile && saveMediaFileLocal) {
      logo = `${mediaFileDomain}/${uploadedFile.path}`;
    }

    return mode === 'update' && !manufacturerDetails ? (
      <ProfileLoader />
    ) : (
      <Formik
        enableReinitialize
        initialValues={{ ...manufacturerDetails }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          this.onSubmit(values);
          setSubmitting(false);
        }}
        validationSchema={manufactureValidation}
      >
        {({
          values: {
            logo = '',
            name = '',
            url = '',
            email = '',
            contact = '',
            countryId = '',
            address = '',
          },
          handleChange,
          isSubmitting,
          errors,
        }) => (
          <Form>
            <Button
              type="submit"
              size="sm"
              color="primary"
              className="pull-right form-btn"
              disabled={isSubmitting}
            >
              <MdSave />
              &nbsp;
              <FormattedMessage id="sys.save" />
            </Button>
            <br />
            <br />
            {status === 0 ? (
              <Alert color="danger">
                <FormattedMessage id="sys.newFailed" />
              </Alert>
            ) : status === 1 ? (
              <Alert color="success">
                <FormattedMessage id="sys.newSuccess" />
              </Alert>
            ) : null}

            <Row>
              <Col md={4}>
                <p className="lead">
                  <FormattedMessage id="sys.logo" />
                </p>
                <img
                  src={logo || require('../../assets/no_image.svg')}
                  className="logo-lg"
                />
                <br />
                <br />
                {saveMediaFileLocal ? (
                  <input
                    type="file"
                    name="logo"
                    id="logo"
                    onChange={this.handleUpload}
                  />
                ) : (
                  <div>
                    <FormattedMessage id="sys.pasteImageUrl" />
                    <br />
                    <Input
                      name="logo"
                      id="logo"
                      value={logo}
                      onChange={handleChange}
                    />
                  </div>
                )}
              </Col>
              <Col md={8}>
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
                      <Label for="url" sm={3}>
                        <FormattedMessage id="sys.website" />
                      </Label>
                      <Col sm={9}>
                        <Input
                          name="url"
                          id="url"
                          value={url}
                          onChange={handleChange}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="email" sm={3}>
                        <FormattedMessage id="sys.email" />
                      </Label>
                      <Col sm={9}>
                        <Input
                          name="email"
                          id="email"
                          value={email}
                          onChange={handleChange}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="contact" sm={3}>
                        <FormattedMessage id="sys.contactNo" />
                        <span className="text-danger mandatory-field">*</span>
                      </Label>
                      <Col sm={9}>
                        <Input
                          name="contact"
                          id="contact"
                          value={contact}
                          onChange={handleChange}
                        />
                        {errors.contact && (
                          <div className="text-danger">{errors.contact}</div>
                        )}
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="country-id" sm={3}>
                        <FormattedMessage id="sys.country" />
                        <span className="text-danger mandatory-field">*</span>
                      </Label>
                      <Col sm={9}>
                        <Input
                          type="select"
                          name="countryId"
                          id="country-id"
                          value={countryId}
                          onChange={handleChange}
                        >
                          <option value="">--</option>
                          {countries.map(country => (
                            <option key={country.id} value={country.id}>
                              {country.name}
                            </option>
                          ))}
                        </Input>
                        {errors.countryId && (
                          <div className="text-danger">{errors.countryId}</div>
                        )}
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="address" sm={3}>
                        <FormattedMessage id="sys.address" />
                        <span className="text-danger mandatory-field">*</span>
                      </Label>
                      <Col sm={9}>
                        <Input
                          name="address"
                          id="address"
                          value={address}
                          onChange={handleChange}
                        />
                        {errors.address && (
                          <div className="text-danger">{errors.address}</div>
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

ManufacturerForm.propTypes = {
  manufacturerDetails: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object,
  mode: PropTypes.string.isRequired,
  status: PropTypes.number,
  storeId: PropTypes.string.isRequired,
  countries: PropTypes.array.isRequired,
  uploadedFile: PropTypes.object,
};

export default withRouter(
  connect(state => {
    const {
      manufacturerReducer: { manufacturerDetails, status },
      publicReducer: { countries, uploadedFile },
    } = state;
    return {
      manufacturerDetails,
      countries,
      uploadedFile,
      status,
    };
  })(ManufacturerForm)
);
