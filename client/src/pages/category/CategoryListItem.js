import React from 'react';
import PropTypes from 'prop-types';
import { Button, Badge } from 'reactstrap';
import { injectIntl, FormattedMessage } from 'react-intl';

const CategoryListItem = props => {
  const {
    name,
    level,
    status,
    id,
    onViewClick,
    onStatusUpdateClick,
    intl: { formatMessage },
  } = props;

  return (
    <tbody>
      <tr>
        <td>{
          level === 1 ? name : <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{name}</span>
        }</td>
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
    </tbody>
  );
};

CategoryListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  childCats: PropTypes.array,
  status: PropTypes.number.isRequired,
  onViewClick: PropTypes.func.isRequired,
  onStatusUpdateClick: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(CategoryListItem);
