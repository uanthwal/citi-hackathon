let protocol = location.protocol + '//' + location.host;

export var URL_CONFIG = {
  BASE_URL: getConfigs()['BASE_URL'],
  GET_ALL_DATA: ':8080/get-all-data',
  GET_DATA_FOR_RANGE: ':8080/get-data-for-range',
};

export function getConfigs() {
  if (protocol == 'http://localhost:4200') {
    return {
      BASE_URL: 'http://localhost',
      ADMIN_ICON: '../assets/admin.png',
    };
  } else {
    return {
      BASE_URL: '',
      ADMIN_ICON: '../assets/admin.png',
    };
  }
}
