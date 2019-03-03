import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';

const SalesReportListProductItem = props => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.sku}</td>
      <td>{props.currencySign + numeral(props.price).format('0,0.00')}</td>
      <td>{props.quantity}</td>
      <td>{props.currencySign + numeral(props.amount).format('0,0.00')}</td>
      <td>{props.currencySign + numeral(props.profit).format('0,0.00')}</td>
    </tr>
  );
};

SalesReportListProductItem.propTypes = {
  name: PropTypes.string.isRequired,
  sku: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  currency: PropTypes.string,
  currencySign: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  profit: PropTypes.number.isRequired,
};

export default SalesReportListProductItem;
