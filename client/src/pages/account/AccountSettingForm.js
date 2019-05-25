import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
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
} from 'reactstrap';
import { MdSave } from 'react-icons/md';

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

class AccountSettingForm extends Component {
  render() {
    const { handleSubmit } = this.props;

    return (
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col sm="12">
            <Button size="sm" color="primary" className="pull-right">
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
                  <Label for="email" sm={3}>
                    <FormattedMessage id="sys.email" />
                    <span className="text-danger mandatory-field">*</span>
                  </Label>
                  <Col sm={9}>
                    <Field
                      component={renderField}
                      name="email"
                      className="form-control"
                      id="email"
                      readonly
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="contact-no" sm={3}>
                    <FormattedMessage id="sys.contactNo" />
                  </Label>
                  <Col sm={9}>
                    <Field
                      component={renderField}
                      name="contactNo"
                      className="form-control"
                      id="contact-no"
                      readonly
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

AccountSettingForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'accountSettingForm',
})(AccountSettingForm);
