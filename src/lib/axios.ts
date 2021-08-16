import axios from 'axios';

export const client = axios.create({
  baseURL:
    typeof window === 'undefined'
      ? process.env.NODE_ENV === 'development'
        ? 'http://localhost:4000/api'
        : process.env.NEXT_BASE_URL + '/api'
      : '/api',
  withCredentials: true
});

const methods = ['get', 'options'];

client.interceptors.request.use(async config => {
  if (config.method && !methods.includes(config.method)) {
    if (!config.headers['CSRF-Token']) {
      const res = await client.get('/auth/csrf');

      client.defaults.headers['CSRF-Token'] = res.data.token;
      config.headers['CSRF-Token'] = res.data.token;
    }
  }

  return config;
});
