const handleError = (error: any) => {
  if (error.status == 200) {
    return error.data;
  } else if (error.response.status == 404) {
    return error.message;
  } else if (error.response.status == 500) {
    return error.message;
  }
};

export { handleError };
