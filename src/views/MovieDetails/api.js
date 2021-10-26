import axios from 'axios';

export function apiGetMovieDetail(action) {
  const url = '';
  const { id } = action;
  const params = { i: id };
  return axios
    .get(url, { params })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.daata || {};
    });
}
