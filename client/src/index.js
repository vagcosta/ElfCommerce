import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { IntlProvider, addLocaleData } from 'react-intl';
import locale_en from 'react-intl/locale-data/en';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from './store';
import registerServiceWorker from './registerServiceWorker';
import './App.css';
import messages_en from './utils/translations/en.json';

addLocaleData([...locale_en]);

const ElfCommerce = () => (
  // TODO: language setting should be dynamic
  <Provider store={store}>
    <IntlProvider locale="en" messages={messages_en}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </IntlProvider>
  </Provider>
);
ReactDOM.render(<ElfCommerce />, document.getElementById('root'));
registerServiceWorker();
