import axios from 'axios';
const baseURL = 'https://reqres.in/api';

export function _fetch (path) {
  return axios.get( `${baseURL}/${path}`, {
    params: { per_page: 10 }
  })
  .then((response) =>
    response.data.data
    );
}

export function fetchPosts (type) {
  return _fetch(`${type}`);
}
