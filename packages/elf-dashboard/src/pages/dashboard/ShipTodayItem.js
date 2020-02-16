import React from 'react';
import PropTypes from 'prop-types';

const ShipTodayItem = props => {
  const { orderId, customerName, onClick } = props;
  return (
    <tr style={{ cursor: 'pointer' }} onClick={() => onClick(orderId)}>
      <td>{orderId}</td>
      <td>{customerName}</td>
    </tr>
  );
};

ShipTodayItem.propTypes = {
  orderId: PropTypes.string.isRequired,
  customerName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ShipTodayItem;
