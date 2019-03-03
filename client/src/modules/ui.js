const PRODUCT_MENU_OPEN = 'app.ui.productMenuOpen';
const PRODUCT_MENU_CLOSE = 'app.ui.productMenuClose';
const REPORT_MENU_OPEN = 'app.ui.reportMenuOpen';
const REPORT_MENU_CLOSE = 'app.ui.reportMenuClose';

const initialState = {
  productMenu: false,
  reportMenu: false,
};

export default function uiReducer(state = initialState, action) {
  switch (action.type) {
    case PRODUCT_MENU_OPEN:
      return { ...state, productMenu: true };
    case PRODUCT_MENU_CLOSE:
      return { ...state, productMenu: false };
    case REPORT_MENU_OPEN:
      return { ...state, reportMenu: true };
    case REPORT_MENU_CLOSE:
      return { ...state, reportMenu: false };
    default:
      return state;
  }
}

export function productMenuOpen() {
  return { type: PRODUCT_MENU_OPEN };
}

export function productMenuClose() {
  return { type: PRODUCT_MENU_CLOSE };
}

export function reportMenuOpen() {
  return { type: REPORT_MENU_OPEN };
}

export function reportMenuClose() {
  return { type: REPORT_MENU_CLOSE };
}
