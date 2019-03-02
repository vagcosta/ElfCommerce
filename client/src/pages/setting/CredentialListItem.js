import React from 'react';
import PropTypes from 'prop-types';

const CredentialListItem = props => {
  const { logo, apiKey, apiSecret } = props;
  return (
    <tr>
      <td>
        <img src={props.logo} className="thumbnail" />
      </td>
      <td>{props.apiKey}</td>
      <td>{props.apiSecret}</td>
    </tr>
  );
};

CredentialListItem.propTypes = {
  logo: PropTypes.string.isRequired,
  apiKey: PropTypes.string.isRequired,
  apiSecret: PropTypes.string.isRequired,
};

export default CredentialListItem;
