import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Card, CardTitle, Table, Row, Col } from 'reactstrap';
import { injectIntl, FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import FeedItem from './dashboard/FeedItem';
import ShipTodayItem from './dashboard/ShipTodayItem';
import Tile from '../components/Tile';
import config from '../config';

const Dashboard = props => {
  const {
    history,
    intl: { formatMessage },
  } = props;

  const {
    data: { storeId },
  } = jwt.decode(localStorage.getItem(config.accessTokenKey));

  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const res = await axios({
          method: 'get',
          url: `${config.apiDomain}/stores/${storeId}/summary`,
          headers: {
            authorization: localStorage.getItem(config.accessTokenKey),
          },
        });

        setDashboard(res.data);
      } catch (e) {
        //TODO: error handling here
      }
    }
    fetchDashboardData();
  }, []);

  const clickShipToday = id => {
    history.push(`/orders/${id}`);
  };

  return (
    <div className="content-body">
      <Row style={{ marginTop: 15 }}>
        <Col md={9}>
          {/* <Row>
            <Col md={6} className="text-center">
              <div className="chart-container">
                <Line data={weeklySales} height={200} />
              </div>
            </Col>
            <Col md={6} className="text-center">
              <div className="chart-container">
                <Pie data={categoryProducts} height={200} />
              </div>
            </Col>
          </Row> */}
          <Row>
            <Col md={4}>
              <Tile
                title={`${
                  dashboard && dashboard.orderSummary.length
                    ? dashboard.orderSummary.reduce(
                        (sum, item) => sum + item.total,
                        0
                      )
                    : 0
                } ${formatMessage({ id: 'sys.orders' })}`}
                tileStyle={{ borderRadius: 0, borderTop: '3px solid orange' }}
                titleStyle={{ fontSize: 24, color: 'orange' }}
                description={
                  <p>
                    30 paid
                    <br />
                    170 pending
                  </p>
                }
              />
            </Col>
            <Col md={4}>
              <Tile
                title={`${
                  dashboard && dashboard.productSummary.length
                    ? dashboard.productSummary.reduce(
                        (sum, item) => sum + item.total,
                        0
                      )
                    : 0
                } ${formatMessage({ id: 'sys.products' })}`}
                tileStyle={{
                  borderRadius: 0,
                  borderTop: '3px solid #55d0e0',
                }}
                titleStyle={{ fontSize: 24, color: '#55d0e0' }}
                description={
                  <p>
                    $108,101.12
                    <br />
                    <br />
                  </p>
                }
              />
            </Col>
            <Col md={4}>
              <Tile
                title={`${
                  dashboard && dashboard.orderSummary.length
                    ? dashboard.orderSummary.reduce(
                        (sum, item) => sum + item.total,
                        0
                      )
                    : 0
                } ${formatMessage({ id: 'sys.shipments' })}`}
                tileStyle={{
                  borderRadius: 0,
                  borderTop: '3px solid #3bc633',
                }}
                titleStyle={{ fontSize: 24, color: '#3bc633' }}
                description={
                  <p>
                    10 in transit
                    <br />
                    40 in warehouses
                  </p>
                }
              />
            </Col>
          </Row>

          <FeedItem
            backgroundColor="#fff"
            fontColor="#333"
            title="A new product has been created."
            content="Your collegue John Doe has just created a new product: sdlfladsjf"
            datetime="2018-11-11 11:11:00"
          />
          <FeedItem
            backgroundColor="#fff"
            fontColor="#333"
            title="A new product has been created."
            content="Your collegue John Doe has just created a new product: asdfasdf sdf asdfasd"
            datetime="2018-11-01 11:11:00"
          />
          <FeedItem
            backgroundColor="#fff"
            fontColor="#333"
            title="A new product has been created."
            content="Your collegue John Doe has just created a new product: adsafs sadf asdfasdf sdf asdfasd"
            datetime="2018-10-11 11:11:00"
          />
        </Col>
        <Col md={3}>
          <Card
            body
            style={{
              borderTop: '2px solid red',
              padding: 0,
              borderRadius: 0,
            }}
          >
            <CardTitle style={{ padding: 10 }}>
              <FormattedMessage id="sys.shipToday" />
            </CardTitle>
            <Table hover style={{ marginBottom: 0 }}>
              <tbody>
                <ShipTodayItem
                  orderId="123456"
                  customerName="John Doe"
                  onClick={clickShipToday}
                />
                <ShipTodayItem
                  orderId="2342343"
                  customerName="Helen Will"
                  onClick={clickShipToday}
                />
                <ShipTodayItem
                  orderId="22343"
                  customerName="Jack Lee"
                  onClick={clickShipToday}
                />
                <ShipTodayItem
                  orderId="223423"
                  customerName="Leo"
                  onClick={clickShipToday}
                />
                <ShipTodayItem
                  orderId="223431"
                  customerName="Nick Chen"
                  onClick={clickShipToday}
                />
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

Dashboard.propTypes = {
  intl: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(injectIntl(Dashboard));
