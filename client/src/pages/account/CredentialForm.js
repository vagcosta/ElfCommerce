import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
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
} from 'reactstrap';

const credentialValidation = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().required('Required'),
  contactNo: Yup.string().required('Required'),
});

const CredentialForm = props => {
  return (
    <Formik
      enableReinitialize
      initialValues={{}}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        this.onSubmit(values);
        setSubmitting(false);
      }}
      validationSchema={credentialValidation}
    >
      {({
        values: { name = '', email = '', contactNo = '' },
        handleChange,
        isSubmitting,
        errors,
      }) => (
        <Form>
          <Row>
            <Col md={6}>
              <Card>
                <CardHeader>
                  <FormattedMessage id="sys.basicInfo" />
                </CardHeader>
                <CardBody>
                  <FormGroup row>
                    <Label for="name" sm={3}>
                      <FormattedMessage id="sys.name" />
                    </Label>
                    <Col sm={9}>
                      <Input name="name" id="name" value={name} />
                      {errors.name && (
                        <div className="text-danger">{errors.name}</div>
                      )}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="email" sm={3}>
                      <FormattedMessage id="sys.email" />
                    </Label>
                    <Col sm={9}>
                      <Input name="email" id="email" readonly value={email} />
                      {errors.email && (
                        <div className="text-danger">{errors.name}</div>
                      )}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="contact-no" sm={3}>
                      <FormattedMessage id="sys.contactNo" />
                    </Label>
                    <Col sm={9}>
                      <Input
                        name="contactNo"
                        id="contact-no"
                        readonly
                        value={contactNo}
                      />
                      {errors.contactNo && (
                        <div className="text-danger">{errors.name}</div>
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
};

CredentialForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default CredentialForm;
