import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

const OrderShippingItem = props => {
  const { formatMessage } = props.intl;
  return (
    <div>
      <p>
        {formatMessage({ id: 'sys.handledBy' })}&nbsp;<b>{props.courier}</b>
        &nbsp;&nbsp;-&nbsp;&nbsp;
        <span style={{ color: props.statusColor || '#000' }}>
          <b>{props.status}</b>
        </span>
      </p>
      <p className="text-muted">
        {formatMessage({ id: 'sys.trackingId' })}:&nbsp;{props.trackingId}
      </p>
      <p className="text-muted">
        {props.location},&nbsp;{props.datetime}
      </p>
      <br />
    </div>
  );
};

OrderShippingItem.propTypes = {
  courier: PropTypes.string.isRequired,
  datetime: PropTypes.string.isRequired,
  trackingId: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  statusColor: PropTypes.string,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(OrderShippingItem);
