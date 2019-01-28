import React from 'react';
import PropTypes from 'prop-types';
import { Button, Badge } from 'reactstrap';
import { injectIntl, FormattedMessage } from 'react-intl';

const CategoryListItem = props => {
  const {
    name,
    status,
    id,
    onClick,
    childCats,
    intl: { formatMessage },
  } = props;

  return (
    <tbody>
      <tr>
        <td>{name}</td>
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
      </tr>
      {childCats.map(cat => (
        <tr key={cat.code}>
          <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{cat.name}</td>
          <td>
            <Badge color={cat.status ? 'success' : 'danger'}>
              {cat.status
                ? formatMessage({ id: 'sys.active' })
                : formatMessage({ id: 'sys.inactive' })}
            </Badge>
          </td>
          <td style={{ textAlign: 'right' }}>
            <Button size="sm" className="action-btn" onClick={() => onClick(cat.code)}>
              <FormattedMessage id="sys.view" />
            </Button>
            <Button size="sm" className="action-btn" onClick={() => onClick(cat.code)}>
              <FormattedMessage id="sys.delete" />
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
  onClick: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(CategoryListItem);
