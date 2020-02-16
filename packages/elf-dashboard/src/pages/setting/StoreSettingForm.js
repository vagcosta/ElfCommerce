import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FormattedMessage } from 'react-intl';
import {
  Col,
  Row,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap';
import { MdSave } from 'react-icons/md';
import { ParallelLoader } from '../../components/Loader';
import { FormContext } from '../contexts';
import config from '../../config';

const storeSettingValidation = Yup.object().shape({
  name: Yup.string().required('Required'),
  currencyId: Yup.number().required('Required'),
  countryId: Yup.number().required('Required'),
  language: Yup.string().required('Required'),
});

const StoreSettingForm = props => {
  const { storeId, id } = useContext(FormContext);
  const [countries, setCountries] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [itemDetails, setItemDetails] = useState(null);

  useEffect(() => {
    async function fetchCountries() {
      try {
        const res = await axios.get(`${config.apiDomain}/countries`, {
          headers: {
            authorization: localStorage.getItem(config.accessTokenKey),
          },
        });

        setCountries(res.data);
      } catch (e) {}
    }

    fetchCountries();
  }, []);

  useEffect(() => {
    async function fetchCurrencies() {
      try {
        const res = await axios.get(`${config.apiDomain}/currencies`, {
          headers: {
            authorization: localStorage.getItem(config.accessTokenKey),
          },
        });

        setCurrencies(res.data);
      } catch (e) {}
    }

    fetchCurrencies();
  }, []);

  useEffect(() => {
    async function fetchItemDetails() {
      try {
        const res = await axios.get(`${config.apiDomain}/stores/${storeId}`, {
          headers: {
            authorization: localStorage.getItem(config.accessTokenKey),
          },
        });

        setItemDetails(res.data);
      } catch (e) {}
    }

    fetchItemDetails();
  }, []);

  return !itemDetails ? (
    <ParallelLoader />
  ) : (
    <Formik
      enableReinitialize
      initialValues={{ ...itemDetails }}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
      }}
      validationSchema={storeSettingValidation}
    >
      {({
        values: {
          name = '',
          description = '',
          currencyId = '',
          countryId = '',
          language = '',
          facebook = '',
          twitter = '',
        },
        handleChange,
        isSubmitting,
        errors,
      }) => (
        <Form>
          <Row>
            <Col sm="12">
              <Button
                type="submit"
                size="sm"
                color="primary"
                className="pull-right"
                disabled={isSubmitting}
              >
                <MdSave />
                &nbsp;
                <FormattedMessage id="sys.save" />
              </Button>
              <br />
              <br />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Card>
                <CardHeader>
                  <FormattedMessage id="sys.basicInfo" />
                </CardHeader>
                <CardBody>
                  <FormGroup row>
                    <Label for="name" sm={3}>
                      <FormattedMessage id="sys.storeName" />
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
                    <Label for="description" sm={3}>
                      <FormattedMessage id="sys.desc" />
                    </Label>
                    <Col sm={9}>
                      <Input
                        type="textarea"
                        name="description"
                        id="description"
                        value={description}
                        onChange={handleChange}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="currencyId" sm={3}>
                      <FormattedMessage id="sys.currency" />
                      <span className="text-danger mandatory-field">*</span>
                    </Label>
                    <Col sm={9}>
                      <Input
                        type="select"
                        name="currencyId"
                        id="currency-id"
                        onChange={handleChange}
                        value={currencyId}
                      >
                        <option value="">--</option>
                        {currencies.map(currency => (
                          <option key={currency.id} value={currency.id}>
                            {currency.name}
                          </option>
                        ))}
                      </Input>
                      {errors.currencyId && (
                        <div className="text-danger">{errors.currencyId}</div>
                      )}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="countryId" sm={3}>
                      <FormattedMessage id="sys.country" />
                      <span className="text-danger mandatory-field">*</span>
                    </Label>
                    <Col sm={9}>
                      <Input
                        type="select"
                        name="countryId"
                        id="country-id"
                        onChange={handleChange}
                        value={countryId}
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
                    <Label for="language" sm={3}>
                      <FormattedMessage id="sys.lang" />
                      <span className="text-danger mandatory-field">*</span>
                    </Label>
                    <Col sm={9}>
                      <Input
                        type="select"
                        name="language"
                        id="language"
                        onChange={handleChange}
                        value={language}
                      >
                        {[{ id: 'en', name: 'English' }].map(lang => (
                          <option key={lang.id} value={lang.id}>
                            {lang.name}
                          </option>
                        ))}
                      </Input>
                      {errors.language && (
                        <div className="text-danger">{errors.language}</div>
                      )}
                    </Col>
                  </FormGroup>
                </CardBody>
              </Card>
            </Col>
            <Col md={6}>
              <Card>
                <CardHeader>
                  <FormattedMessage id="sys.socialMedia" />
                </CardHeader>
                <CardBody>
                  <FormGroup row>
                    <Label for="facebook" sm={3}>
                      <FormattedMessage id="sys.facebook" />
                    </Label>
                    <Col sm={9}>
                      <Input
                        name="facebook"
                        id="facebook"
                        onChange={handleChange}
                        value={facebook}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="twitter" sm={3}>
                      <FormattedMessage id="sys.twitter" />
                    </Label>
                    <Col sm={9}>
                      <Input
                        name="twitter"
                        id="twitter"
                        onChange={handleChange}
                        value={twitter}
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
};

export default StoreSettingForm;
