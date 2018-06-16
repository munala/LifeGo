import axios from 'axios';

const instance = axios.create();

instance.defaults.headers.common['Content-Type'] = 'application/json';
instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export const handleError = (error) => {
  if (error.response && error.response.status === 401) {
    return {
      error: 'Unauthorised',
      code: error.response.status,
    };
  }

  if (error.response && error.response.status === 409) {
    return {
      error: error.response.data.message,
      code: error.response.status,
    };
  }

  return {
    error: error.message || error,
    code: 0,
  };
};

export default async ({ method, url, data }) => {
  instance.defaults.headers.common.token = localStorage.getItem('token');

  try {
    const response = await instance[method](url, data);

    if (response.data.message === `${data && data.name} is already in use`) {
      return handleError(response.data.message);
    }

    if (response.error) {
      return handleError(response.error);
    }

    return response.data;
  } catch (error) {
    return handleError(error);
  }
};
