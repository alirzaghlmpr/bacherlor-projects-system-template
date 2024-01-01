const serializeFormQuery = (form) => {
  const queryParams = {};
  const formData = new FormData(form);

  for (const [key, value] of formData.entries()) {
    queryParams[key] = value;
  }

  return queryParams;
};

export default serializeFormQuery;
