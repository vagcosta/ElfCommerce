import React from 'react';
import PropTypes from 'prop-types';
import { Button, Badge } from 'reactstrap';
import {
  MdEmail,
  MdMap,
  MdCall,
} from 'react-icons/md';
import { injectIntl, FormattedMessage } from 'react-intl';

const AccountListItem = props => {
  const {
    name,
    email,
    joinedOn,
    role,
    status,
    onViewClick,
    onStatusUpdateClick,
    id,
    intl: { formatMessage } } = props;

  return (
    <tr>
      <td>
        {name}
      </td>
      <td>
        {email}
      </td>
      <td>
        {role === 1 ? formatMessage({ id: 'sys.admin' }) : formatMessage({ id: 'sys.user' })}
      </td>
      <td>
        <Badge color={status ? 'success' : 'secondary'}>
          {status
            ? formatMessage({ id: 'sys.active' })
            : formatMessage({ id: 'sys.revoked' })}
        </Badge>
      </td>
      <td style={{ textAlign: 'right' }}>
        <Button size="sm" className="action-btn" onClick={() => onViewClick(id)}>
          <FormattedMessage id="sys.view" />
        </Button>
        <Button size="sm" className="action-btn" onClick={() => onStatusUpdateClick(id, status ? 0 : 1)}>
          {status
            ? formatMessage({ id: 'sys.revoke' })
            : formatMessage({ id: 'sys.activate' })}
        </Button>
      </td>
    </tr>
  );
};

AccountListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  role: PropTypes.number.isRequired,
  status: PropTypes.number.isRequired,
  onViewClick: PropTypes.func.isRequired,
  onStatusUpdateClick: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(AccountListItem);
