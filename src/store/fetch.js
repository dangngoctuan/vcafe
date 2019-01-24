import axios from 'axios';
const baseURL = 'https://evening-eyrie-68414.herokuapp.com/api/information';

export function _fetch (path, params) {
  return axios.get( `${baseURL}/${path}`, {
    params: params
  })
  .then((response) =>
    response.data
    );
}

export function fetchDatum (type, params) {
  return _fetch(`${type}`, params);
}
