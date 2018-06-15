export default error => {
  if (error.response && error.response.status === 401) {
    return {
      error: 'Unauthorised',
      code: error.response.status
    };
  }
  if (error.response && error.response.status === 409) {
    return {
      error: error.response.data.message,
      code: error.response.status
    };
  }
  return {
    error: error.message || error,
    code: 0
  };
};
