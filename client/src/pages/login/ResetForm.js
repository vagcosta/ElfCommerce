import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { injectIntl, FormattedMessage } from 'react-intl';
import {
  Form,
  Input,
  Button,
} from 'reactstrap';

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

const ResetForm = props => {
  const { handleSubmit, intl: { formatMessage } } = props;

  return (
    <Form
      onSubmit={handleSubmit(data => this.onSubmit(data))}
      id="reset-form"
    >
      <Field
        component={renderField}
        type="email"
        name="username"
        id="username"
        placeholder={formatMessage({ id: 'sys.email' })}
        validate={[required]}
      /><br />
      <Button color="secondary" type="submit" block>
        <FormattedMessage id="sys.send" />
      </Button>
    </Form>
  );
};

ResetForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

export default reduxForm({
  form: 'resetForm',
})(injectIntl(ResetForm));
