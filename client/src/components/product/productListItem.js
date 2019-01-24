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
    onClick,
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
      <td>{quantity}</td>
      <td>
        <Badge color={
          (status => {
            switch (status) {
              case 0:
                return 'light';
              case 1:
                return 'success';
              case 2:
                return 'warning';
            }
          })(status)
        }>
          {
            (status => {
              switch (status) {
                case 0:
                  return formatMessage({ id: 'sys.inactive' });
                case 1:
                  return formatMessage({ id: 'sys.normal' });
                case 2:
                  return formatMessage({ id: 'sys.noStock' });
              }
            })(status)
          }
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
  status: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(ProductListItem);
