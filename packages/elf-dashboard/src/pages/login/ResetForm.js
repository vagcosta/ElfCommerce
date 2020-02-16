import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Input, Button } from 'reactstrap';

const accountValidation = Yup.object().shape({
  username: Yup.string().required('Required'),
});

const ResetForm = props => {
  const {
    intl: { formatMessage },
  } = props;

  return (
    <Formik
      enableReinitialize
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        //TODO: send new password to email
        setSubmitting(false);
      }}
      validationSchema={accountValidation}
    >
      {({ handleChange, isSubmitting, errors }) => (
        <Form id="reset-form">
          <Input
            type="email"
            name="username"
            id="username"
            placeholder={formatMessage({ id: 'sys.email' })}
            onChange={handleChange}
          />
          {errors.username && (
            <div className="text-danger">{errors.username}</div>
          )}
          <br />
          <Button color="secondary" type="submit" block disabled={isSubmitting}>
            <FormattedMessage id="sys.send" />
          </Button>
        </Form>
      )}
    </Formik>
  );
};

ResetForm.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(ResetForm);
