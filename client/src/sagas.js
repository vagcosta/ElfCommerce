import { all } from 'redux-saga/effects';
import { manufacturerSagas } from './modules/manufacturer';
import { supplierSagas } from './modules/supplier';
import { productSagas } from './modules/product';
import { accountSagas } from './modules/account';
import { orderSagas } from './modules/order';
import { reportSagas } from './modules/report';
import { settingSagas } from './modules/setting';
import { commonSagas } from './modules/common';

export default function* rootSaga() {
  yield all([
    commonSagas,
    settingSagas,
    orderSagas,
    accountSagas,
    productSagas,
    supplierSagas,
    manufacturerSagas,
    reportSagas,
  ]);
}
