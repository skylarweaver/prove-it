const axios = require('axios');
// Generate the API enpoint URL for all API requests
// proxy should be "/" in dev as React/node allows proxy to be set there during development (but not prod)
const proxy = process.env.REACT_APP_PROXY;

const loginChecker = async (currentCredentials) => {
  try {
    const res = await axios.post(`${proxy}/api/v1/auth/token`, currentCredentials);
    return res;
  } catch (error) {
    // set state of failedLogin if axios call fails
    return error;
  }
};

const getAgency = async (agencyId, auth) => {
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${auth}`,
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.get(`${proxy}/api/v1/agencies/${agencyId}`, axiosConfig);
    return res;
  } catch (error) {
    return error;
  }
};

export {
  loginChecker,
  getAgency,
};
