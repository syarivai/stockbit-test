export function setupAxios(httpClient) {
  httpClient.interceptors.request.use(
    (config) => {
      const axiosConfig = config;
      axiosConfig.baseURL = 'http://www.omdbapi.com/?apikey=3d70e8f';
      // if (authToken) {
      //   axiosConfig.headers.Authorization = `Bearer ${authToken}`;
      // }

      return axiosConfig;
    },
    (err) => Promise.reject(err),
  );
}
