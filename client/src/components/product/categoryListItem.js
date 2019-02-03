import React from 'react';
import PropTypes from 'prop-types';
import { Button, Badge } from 'reactstrap';
import { injectIntl, FormattedMessage } from 'react-intl';

const CategoryListItem = props => {
  const {
    name,
    status,
    id,
    onViewClick,
    onStatusUpdateClick,
    childCats,
    intl: { formatMessage },
  } = props;

  return (
    <tbody>
      <tr>
        <td>{name}</td>
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
      {childCats.map(cat => (
        <tr key={cat.code}>
          <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{cat.name}</td>
          <td>
            <Badge color={cat.status ? 'success' : 'secondary'}>
              {cat.status
                ? formatMessage({ id: 'sys.active' })
                : formatMessage({ id: 'sys.archived' })}
            </Badge>
          </td>
          <td style={{ textAlign: 'right' }}>
            <Button size="sm" className="action-btn" onClick={() => onViewClick(cat.code)}>
              <FormattedMessage id="sys.view" />
            </Button>
            <Button size="sm" className="action-btn" onClick={() => onStatusUpdateClick(cat.code, cat.status ? 0 : 1)}>
              {cat.status
                ? formatMessage({ id: 'sys.archive' })
                : formatMessage({ id: 'sys.unarchive' })}
            </Button>
          </td>
        </tr>
      ))
      }
    </tbody>
  );
};

CategoryListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  childCats: PropTypes.array,
  status: PropTypes.number.isRequired,
  onViewClick: PropTypes.func.isRequired,
  onStatusUpdateClick: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(CategoryListItem);
