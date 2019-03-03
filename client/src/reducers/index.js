import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import orderReducer from './order';
import customerReducer from './customer';
import dashboardReducer from './dashboard';
import pathReducer from './path';
import reportReducer from './report';
import settingReducer from './setting';
import authReducer from './auth';
import manufacturerReducer from '../modules/manufacturer';
import supplierReducer from '../modules/supplier';
import productReducer from '../modules/product';
import publicReducer from './public';
import accountReducer from './account';
import categoryReducer from './category';

const rootReducer = combineReducers({
  form: formReducer,
  orderReducer,
  customerReducer,
  dashboardReducer,
  productReducer,
  categoryReducer,
  pathReducer,
  reportReducer,
  settingReducer,
  authReducer,
  manufacturerReducer,
  supplierReducer,
  publicReducer,
  accountReducer,
});

export default rootReducer;
