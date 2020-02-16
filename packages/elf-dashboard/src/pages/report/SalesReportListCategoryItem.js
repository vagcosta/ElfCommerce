import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';

const SalesReportListCategoryItem = props => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.quantity}</td>
      <td>{props.currencySign + numeral(props.amount).format('0,0.00')}</td>
      <td>{props.currencySign + numeral(props.profit).format('0,0.00')}</td>
    </tr>
  );
};

SalesReportListCategoryItem.propTypes = {
  name: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  currency: PropTypes.string,
  currencySign: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  profit: PropTypes.number.isRequired,
};

export default SalesReportListCategoryItem;
