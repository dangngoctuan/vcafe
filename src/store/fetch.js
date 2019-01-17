const baseURL = 'https://atmarkcafe.org';

export function _fetch (path) {
  return fetch({
    method: 'GET',
    url: `${baseURL}/${path}`
  })
  .then((response) => response.json());
}

export function fetchPosts (type) {
  return _fetch(`${type}`);
}
