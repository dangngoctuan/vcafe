import axios from 'axios';
const baseURL = 'http://localhost:3000/api/information';

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
