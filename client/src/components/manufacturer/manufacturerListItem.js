import React from 'react';
import PropTypes from 'prop-types';
import { Button, Badge } from 'reactstrap';
import {
  MdEmail,
  MdMap,
  MdCall,
} from 'react-icons/md';
import { injectIntl, FormattedMessage } from 'react-intl';

const ManufacturerListItem = props => {
  const {
    logo,
    name,
    url,
    email,
    address,
    contact,
    status,
    onViewClick,
    onStatusUpdateClick,
    id,
    intl: { formatMessage } } = props;

  return (
    <tr>
      <td>
        <img src={logo || require('../../assets/no_image.svg')} className="thumbnail" />
      </td>
      <td>
        {name}<br /><br />
        {
          url ? <p>
            &#187; <a href={url} target="_blank" className="text-info">{formatMessage({ id: 'sys.website' })}</a>
          </p> : null
        }
      </td>
      <td style={{ fontSize: 14 }}>
        <div style={{ marginTop: 5 }}>
          <MdEmail />
          &nbsp;&nbsp;{email}
        </div>
        <div style={{ marginTop: 5 }}>
          <MdMap />
          &nbsp;&nbsp;{address}
        </div>
        <div style={{ marginTop: 5 }}>
          <MdCall />
          &nbsp;&nbsp;{contact}
        </div>
      </td>
      <td>
        <Badge color={status ? 'success' : 'secondary'}>
          {status
            ? formatMessage({ id: 'sys.active' })
            : formatMessage({ id: 'sys.archived' })}
        </Badge>
      </td>
      <td style={{ textAlign: 'right' }}>
        <Button size="sm" className="action-btn" onClick={() => onViewClick(id)}>
          <FormattedMessage id="sys.view" />
        </Button>
        <Button size="sm" className="action-btn" onClick={() => onStatusUpdateClick(id, status ? 0 : 1)}>
          {status
            ? formatMessage({ id: 'sys.archive' })
            : formatMessage({ id: 'sys.unarchive' })}
        </Button>
      </td>
    </tr>
  );
};

ManufacturerListItem.propTypes = {
  id: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  address: PropTypes.string,
  email: PropTypes.string.isRequired,
  contact: PropTypes.string.isRequired,
  status: PropTypes.number.isRequired,
  onViewClick: PropTypes.func.isRequired,
  onStatusUpdateClick: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(ManufacturerListItem);
