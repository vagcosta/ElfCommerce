import React from 'react';
import PropTypes from 'prop-types';

const OrderInfoItem = props => {
  return (
    <div>
      <b>{props.title}</b>
      <br />
      <p className="text-muted">{props.content}</p>
    </div>
  );
};

OrderInfoItem.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default OrderInfoItem;
