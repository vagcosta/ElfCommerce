export const FETCH_STORE_SETTINGS = 'FETCH_STORE_SETTINGS';
export const FETCH_STORE_SETTINGS_SUCCESS = 'FETCH_STORE_SETTINGS_SUCCESS';
export const FETCH_STORE_SETTINGS_FAILED = 'FETCH_STORE_SETTINGS_FAILED';

export const CLEAR_SETTINGS = 'CLEAR_SETTINGS';

export function fetchStoreSettings(data) {
  return { type: FETCH_STORE_SETTINGS, value: data };
}

export function fetchStoreSettingsSuccess(data) {
  return { type: FETCH_STORE_SETTINGS_SUCCESS, value: data };
}

export function fetchStoreSettingsFailed() {
  return { type: FETCH_STORE_SETTINGS_FAILED };
}

export function clearSettings() {
  return { type: CLEAR_SETTINGS };
}
