import React from 'react';
import PropTypes from 'prop-types';
import { Button, Badge } from 'reactstrap';
import { injectIntl, FormattedMessage } from 'react-intl';
import numeral from 'numeral';

const ProductListItem = props => {
  const {
    coverImage,
    name,
    sku,
    currencySign,
    price,
    quantity,
    status,
    id,
    onViewClick,
    onStatusUpdateClick,
    intl: { formatMessage },
  } = props;

  return (
    <tr>
      <td>
        <img src={coverImage || require('../../assets/no_image.svg')} className="thumbnail" />
      </td>
      <td>{name}</td>
      <td>{sku}</td>
      <td>{currencySign + numeral(price).format('0,0.00')}</td>
      <td>
        {
          !quantity ?
            <Badge color={'danger'}>
              <FormattedMessage id="sys.noStock" />
            </Badge> : quantity
        }
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

ProductListItem.propTypes = {
  id: PropTypes.string.isRequired,
  coverImage: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  sku: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  currency: PropTypes.string,
  currencySign: PropTypes.string.isRequired,
  status: PropTypes.number.isRequired,
  onViewClick: PropTypes.func.isRequired,
  onStatusUpdateClick: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(ProductListItem);
