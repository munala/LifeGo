import axios from 'axios';

import { generateQuery } from '.';

const instance = axios.create();

instance.defaults.headers.common['Content-Type'] = 'application/json';
instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

const graphqlUrl = `${process.env.REACT_APP_API_HOST}/api/graphql`;

export const handleError = (error) => {
  if (error.response && error.response.data.message) {
    return {
      error: error.response.data.message,
      code: error.response.status,
    };
  }

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

const sendRequest = async ({ method, url, data }) => {
  instance.defaults.headers.common.token = localStorage.getItem('token');

  try {
    const response = await instance[method](url, data);

    if (response.data.message === `${data && data.name} is already in use`) {
      return handleError(response.data.message);
    }

    if (response.error) {
      return handleError(response.error);
    }

    if (response.data.errors) {
      return handleError(response.data.errors[0]);
    }

    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const sendGraphQLRequest = (queryData) => {
  const query = generateQuery(queryData);

  return sendRequest({
    method: 'post',
    url: graphqlUrl,
    data: { query },
  });
};

export default sendRequest;
