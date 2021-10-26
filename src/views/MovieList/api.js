import axios from 'axios';

export function apiGetMovieList(action) {
  const url = '';
  const { page, search } = action;
  const params = { page, s: search };
  return axios
    .get(url, { params })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.daata || {};
    });
}
