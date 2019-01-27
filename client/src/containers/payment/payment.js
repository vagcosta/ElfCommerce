import React, { Component } from 'react';
import { Table, Row, Col } from 'reactstrap';
import { FormattedMessage } from 'react-intl';

class Payment extends Component {
  render() {
    return (
      <div className="content-body">
        <h3>
          <FormattedMessage id="sys.payments" />
        </h3>
        <Row>
          <Col md={12}>
            <Table condensed responsive style={{ backgroundColor: '#fff' }}>
              <thead>
                <tr>
                  <th>
                    <FormattedMessage id="sys.name" />
                  </th>
                  <th>
                    <FormattedMessage id="sys.acctNo" />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    PayPal
                  </td>
                  <td>your.paypal@example.com</td>
                  <td />
                </tr>
                <tr>
                  <td>
                    Stripe
                  </td>
                  <td>your.paypal@example.com</td>
                  <td />
                </tr>
                <tr>
                  <td>
                    BitCoin
                  </td>
                  <td>your.paypal@example.com</td>
                  <td />
                </tr>
                <tr>
                  <td>
                    <img
                      src="https://www.wirecard.com/uploads/tx_neimagefinder/wirecard-logo-white-black-download-72dpi.png"
                      width="60"
                    />
                  </td>
                  <td>000-123456-1</td>
                  <td />
                </tr>
                <tr>
                  <td>Bank Transfer</td>
                  <td>000-123456-1</td>
                  <td />
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Payment;
