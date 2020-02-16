import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
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
import { FormContext } from '../contexts';
import config from '../../config';

const passwordValidation = Yup.object().shape({
  password: Yup.string().required('Required'),
});

const PasswordForm = props => {
  const { storeId, id } = useContext(FormContext);
  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState(false);
  const [values, setValues] = useState(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    async function submit() {
      try {
        const res = await axios({
          method: 'put',
          url: `${config.apiDomain}/stores/${storeId}/accounts/${id}`,
          headers: {
            authorization: localStorage.getItem(config.accessTokenKey),
            'Content-Type': 'application/json',
          },
          data: values,
        });
        setDone(true);
      } catch (e) {
        setError(true);
      } finally {
        setValues(null);
      }
    }

    if (submit && values) {
      submit();
    }
  }, [submit]);

  return (
    <Formik
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        setValues(values);
        setSubmit(true);
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
};

export default PasswordForm;
