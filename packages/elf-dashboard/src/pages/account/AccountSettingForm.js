import React from 'react';
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
  Button,
} from 'reactstrap';
import { MdSave } from 'react-icons/md';

const accountSettingValidation = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().required('Required'),
  contactNo: Yup.string().required('Required'),
});

const AccountSettingForm = props => {
  return (
    <Formik
      enableReinitialize
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        this.onSubmit(values);
        setSubmitting(false);
      }}
      validationSchema={accountSettingValidation}
    >
      {({
        values: { name = '', email = '', contactNo = '' },
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
                    <Label for="email" sm={3}>
                      <FormattedMessage id="sys.email" />
                      <span className="text-danger mandatory-field">*</span>
                    </Label>
                    <Col sm={9}>
                      <Input
                        name="email"
                        id="email"
                        value={email}
                        onChange={handleChange}
                        readOnly
                      />
                      {errors.email && (
                        <div className="text-danger">{errors.email}</div>
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
                        value={contactNo}
                        onChange={handleChange}
                        readOnly
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

export default AccountSettingForm;
