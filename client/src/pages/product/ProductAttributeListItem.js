import React from 'react';
import PropTypes from 'prop-types';
import { Button, Badge } from 'reactstrap';
import { injectIntl, FormattedMessage } from 'react-intl';
import numeral from 'numeral';

const ProductAttributeListItem = props => {
  const {
    code,
    name,
    category,
    currencySign,
    varPrice,
    quantity,
    status,
    onClick,
    intl: { formatMessage },
  } = props;

  return (
    <tr>
      <td>{name}</td>
      <td>{category}</td>
      <td>{currencySign + numeral(varPrice).format('0,0.00')}</td>
      <td>{quantity}</td>
      <td>
        <Badge color={status ? 'success' : 'danger'}>
          {status
            ? formatMessage({ id: 'sys.active' })
            : formatMessage({ id: 'sys.inactive' })}
        </Badge>
      </td>
      <td style={{ textAlign: 'right' }}>
        <Button size="sm" className="action-btn" onClick={() => onClick(code)}>
          <FormattedMessage id="sys.view" />
        </Button>
        <Button size="sm" className="action-btn" onClick={() => onClick(code)}>
          <FormattedMessage id="sys.delete" />
        </Button>
      </td>
    </tr>
  );
};

ProductAttributeListItem.propTypes = {
  code: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  varPrice: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  currencySign: PropTypes.string.isRequired,
  status: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(ProductAttributeListItem);
