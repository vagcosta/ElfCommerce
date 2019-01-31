import React from 'react';
import PropTypes from 'prop-types';
import { Button, Badge } from 'reactstrap';
import { injectIntl, FormattedMessage } from 'react-intl';

const OrderListItem = props => {
  const { formatMessage } = props.intl;
  const {
    number,
    customer,
    date,
    payment,
    status,
    onClick,
  } = props;


  return (
    <tr>
      <td>{number}</td>
      <td>{customer}</td>
      <td>{date}</td>
      <td>{payment}</td>
      <td>
        <Badge color={
          (status => {
            switch (status) {
              case 0:
                return 'light';
              case 1:
                return 'warning';
              case 2:
                return 'info';
              case 3:
                return 'success';
            }
          })(status)
        }>
          {
            (status => {
              switch (status) {
                case 0:
                  return formatMessage({ id: 'sys.inactive' });
                case 1:
                  return formatMessage({ id: 'sys.pending' });
                case 2:
                  return formatMessage({ id: 'sys.shipped' });
                case 3:
                  return formatMessage({ id: 'sys.completed' });
              }
            })(status)
          }
        </Badge>
      </td>
      <td style={{ textAlign: 'right' }}>
        <Button size="sm" className="action-btn" onClick={() => onClick(number)}>
          <FormattedMessage id="sys.view" />
        </Button>
        <Button size="sm" className="action-btn" onClick={() => onClick(number)}>
          <FormattedMessage id="sys.delete" />
        </Button>
      </td>
    </tr>
  );
};

OrderListItem.propTypes = {
  number: PropTypes.string.isRequired,
  customer: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  payment: PropTypes.string.isRequired,
  status: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(OrderListItem);
