import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Card,
  CardTitle,
  Table,
  Row,
  Col,
} from 'reactstrap';
import { injectIntl, FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import {
  fetchDashboardData,
} from '../../actions';
import {
  FeedItem,
  ShipTodayItem,
  Tile,
} from '../../components';
import config from '../config';

class Dashboard extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const { data: { storeId } } = jwt.decode(localStorage.getItem(config.accessTokenKey));

    dispatch(fetchDashboardData(storeId));
  }

  onShipTodayItemClick = id => {
    const { history } = this.props;
    history.push(`/orders/${id}`);
  };

  render() {
    const {
      data: {
        orderSummary,
        productSummary,
      },
      intl: { formatMessage },
    } = this.props;

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
                  title={`${orderSummary.length > 0 ? orderSummary.reduce((sum, item) => sum + item.total, 0) : 0} ${formatMessage({ id: 'sys.orders' })}`}
                  tileStyle={{ borderRadius: 0, borderTop: '3px solid orange' }}
                  titleStyle={{ fontSize: 24, color: 'orange' }}
                  description={<p>30 paid<br />170 pending</p>}
                />
              </Col>
              <Col md={4}>
                <Tile
                  title={`${productSummary.length > 0 ? productSummary.reduce((sum, item) => sum + item.total, 0) : 0} ${formatMessage({ id: 'sys.products' })}`}
                  tileStyle={{ borderRadius: 0, borderTop: '3px solid #55d0e0' }}
                  titleStyle={{ fontSize: 24, color: '#55d0e0' }}
                  description={<p>$108,101.12<br /><br /></p>}
                />
              </Col>
              <Col md={4}>
                <Tile
                  title={`${orderSummary.length > 0 ? orderSummary.reduce((sum, item) => sum + item.total, 0) : 0} ${formatMessage({ id: 'sys.shipments' })}`}
                  tileStyle={{ borderRadius: 0, borderTop: '3px solid #3bc633' }}
                  titleStyle={{ fontSize: 24, color: '#3bc633' }}
                  description={<p>10 in transit<br />40 in warehouses</p>}
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
                    onClick={this.onShipTodayItemClick}
                  />
                  <ShipTodayItem
                    orderId="2342343"
                    customerName="Helen Will"
                    onClick={this.onShipTodayItemClick}
                  />
                  <ShipTodayItem
                    orderId="22343"
                    customerName="Jack Lee"
                    onClick={this.onShipTodayItemClick}
                  />
                  <ShipTodayItem
                    orderId="223423"
                    customerName="Leo"
                    onClick={this.onShipTodayItemClick}
                  />
                  <ShipTodayItem
                    orderId="223431"
                    customerName="Nick Chen"
                    onClick={this.onShipTodayItemClick}
                  />
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

Dashboard.propTypes = {
  data: PropTypes.object.isRequired,
  done: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  intl: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  data: state.dashboardReducer.data,
  done: state.dashboardReducer.done,
  error: state.dashboardReducer.error,
});

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(injectIntl(Dashboard))
);
