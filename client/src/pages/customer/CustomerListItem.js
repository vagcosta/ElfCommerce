import React from 'react';
import { Button } from 'reactstrap';
import { FormattedMessage } from 'react-intl';

const CustomerListItem = props => (
  <tr>
    <td>{props.name}</td>
    <td>{props.email}</td>
    <td>{props.contact}</td>
    <td>
      <Button color="link">
        <FormattedMessage id="sys.view" />
      </Button>
    </td>
  </tr>
);

export default CustomerListItem;
