import React from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { Col } from 'reactstrap';
import {
  Login,
  Dashboard,
  OrderList,
  Order,
  ProductList,
  CategoryList,
  Payment,
  Setting,
  Category,
  Product,
  SalesReportList,
  SupplierList,
  Supplier,
  ManufacturerList,
  Manufacturer,
  AccountList,
  Account,
} from './pages';
import NavBar from './components/Navigation';
import SideBarContent from './components/SideBar';
import config from './config';

const routes = [
  {
    path: '/dashboard',
    exact: true,
    sidebar: () => <SideBarContent />,
    main: () => <Dashboard />,
  },
  {
    path: '/orders',
    exact: true,
    sidebar: () => <SideBarContent />,
    main: () => <OrderList />,
  },
  {
    path: '/orders/:id',
    sidebar: () => <SideBarContent />,
    main: () => <Order />,
  },
  {
    path: '/new-order',
    sidebar: () => <SideBarContent />,
    main: () => <Order />,
  },
  {
    path: '/categories',
    exact: true,
    sidebar: () => <SideBarContent />,
    main: () => <CategoryList />,
  },
  {
    path: '/categories/:id',
    sidebar: () => <SideBarContent />,
    main: () => <Category />,
  },
  {
    path: '/new-category',
    sidebar: () => <SideBarContent />,
    main: () => <Category />,
  },
  {
    path: '/customers',
    exact: true,
    sidebar: () => <SideBarContent />,
    main: () => <ProductList />,
  },
  {
    path: '/products',
    exact: true,
    sidebar: () => <SideBarContent />,
    main: () => <ProductList />,
  },
  {
    path: '/new-product',
    sidebar: () => <SideBarContent />,
    main: () => <Product />,
  },
  {
    path: '/products/:id',
    sidebar: () => <SideBarContent />,
    main: () => <Product />,
  },
  {
    path: '/suppliers',
    exact: true,
    sidebar: () => <SideBarContent />,
    main: () => <SupplierList />,
  },
  {
    path: '/new-supplier',
    exact: true,
    sidebar: () => <SideBarContent />,
    main: () => <Supplier />,
  },
  {
    path: '/suppliers/:id',
    exact: true,
    sidebar: () => <SideBarContent />,
    main: () => <Supplier />,
  },
  {
    path: '/manufacturers',
    exact: true,
    sidebar: () => <SideBarContent />,
    main: () => <ManufacturerList />,
  },
  {
    path: '/new-manufacturer',
    exact: true,
    sidebar: () => <SideBarContent />,
    main: () => <Manufacturer />,
  },
  {
    path: '/manufacturers/:id',
    exact: true,
    sidebar: () => <SideBarContent />,
    main: () => <Manufacturer />,
  },
  {
    path: '/payments',
    exact: true,
    sidebar: () => <SideBarContent />,
    main: () => <Payment />,
  },
  {
    path: '/sales-reports',
    exact: true,
    sidebar: () => <SideBarContent />,
    main: () => <SalesReportList />,
  },
  {
    path: '/settings',
    exact: true,
    sidebar: () => <SideBarContent />,
    main: () => <Setting />,
  },
  {
    path: '/accounts',
    exact: true,
    sidebar: () => <SideBarContent />,
    main: () => <AccountList />,
  },
  {
    path: '/new-account',
    exact: true,
    sidebar: () => <SideBarContent />,
    main: () => <Account />,
  },
  {
    path: '/accounts/:id',
    exact: true,
    sidebar: () => <SideBarContent />,
    main: () => <Account />,
  },
];

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Login} />
      {localStorage.getItem(config.accessTokenKey) ?
        <div className="dashboard-page">
          <Col md={2} className="sidebar">
            <div id="site-name">
              <a href="/dashboard" style={{ color: '#efefef' }}>ElfCommerce</a>
            </div>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.sidebar}
              />
            ))}
          </Col>
          <Col md={{ size: 10, offset: 2 }} style={{ padding: 0 }}>
            <NavBar />
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.main}
              />
            ))}
          </Col>
        </div> : <Redirect to='/' />
      }
    </div>
  </Router>
);

export default App;
