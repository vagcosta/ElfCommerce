import { all } from 'redux-saga/effects';
import { manufacturerSagas } from './modules/manufacturer';
import { supplierSagas } from './modules/supplier';
import { productSagas } from './modules/product';
import { accountSagas } from './modules/account';
import { categorySagas } from './modules/category';
import { orderSagas } from './modules/order';
import { reportSagas } from './modules/report';
import { dashboardSagas } from './modules/dashboard';
import { settingSagas } from './modules/setting';
import { commonSagas } from './modules/common';

export default function* rootSaga() {
  yield all([
    commonSagas,
    settingSagas,
    dashboardSagas,
    orderSagas,
    categorySagas,
    accountSagas,
    productSagas,
    supplierSagas,
    manufacturerSagas,
    reportSagas,
  ]);
}
