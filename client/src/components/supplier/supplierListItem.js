import React from 'react';
import PropTypes from 'prop-types';
import { Button, Badge } from 'reactstrap';
import { injectIntl, FormattedMessage } from 'react-intl';
import { FaGlobe, FaAt, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

const SupplierListItem = props => {
  const {
    logo,
    name,
    url,
    email,
    address,
    contact,
    status,
    onClick,
    id,
    intl: { formatMessage } } = props;

  return (
    <tr>
      <td>
        <img src={logo || require('../../assets/no_image.svg')} className="thumbnail" />
      </td>
      <td>{name}</td>
      <td style={{ fontSize: 14 }}>
        <div>
          <FaGlobe color="#555" />
          &nbsp;&nbsp;{url}
        </div>
        <div style={{ marginTop: 5 }}>
          <FaAt color="#e22b46" />
          &nbsp;&nbsp;{email}
        </div>
        <div style={{ marginTop: 5 }}>
          <FaMapMarkerAlt color="#2e66c1" />
          &nbsp;&nbsp;{address}
        </div>
        <div style={{ marginTop: 5 }}>
          <FaPhone color="#26ad72" />
          &nbsp;&nbsp;{contact}
        </div>
      </td>
      <td>
        <Badge color={status ? 'success' : 'danger'}>
          {status
            ? formatMessage({ id: 'sys.active' })
            : formatMessage({ id: 'sys.inactive' })}
        </Badge>
      </td>
      <td style={{ textAlign: 'right' }}>
        <Button size="sm" className="action-btn" onClick={() => onClick(id)}>
          <FormattedMessage id="sys.view" />
        </Button>
        <Button size="sm" className="action-btn" onClick={() => onClick(id)}>
          <FormattedMessage id="sys.delete" />
        </Button>
      </td>
    </tr >
  );
};

SupplierListItem.propTypes = {
  id: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  address: PropTypes.string,
  email: PropTypes.string.isRequired,
  contact: PropTypes.string.isRequired,
  status: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(SupplierListItem);
