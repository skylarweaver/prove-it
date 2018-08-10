const axios = require('axios'); // promised based requests - like fetch()
// Generate the API enpoint URL for all API requests
// proxy should be "/" in dev as React/node allows proxy to be set there during development (but not prod)
const proxy = process.env.REACT_APP_PROXY;

const getNotications = async (auth) => {
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  };
  try {
    const res = await axios.get(`${proxy}/api/v1/notifications`, axiosConfig);
    return res;
  } catch (error) {
    return error;
  }
};

const acknowledgeNotification = async (notificationId, agencyId, auth) => {
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  };
  const ackBody = {
    notificationId,
    agencyId,
  };
  try {
    const res = await axios.post(`${proxy}/api/v1/notifications/ack`, ackBody, axiosConfig);
    return res;
  } catch (error) {
    return error;
  }
};

const getHashSSN = async (clearanceID, auth) => {
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  };
  try {
    const res = await axios.get(`${proxy}/api/v1/clearancedecisions/${clearanceID}/hashofssn`, axiosConfig);
    return res;
  } catch (error) {
    return error;
  }
};

export {
  getNotications,
  acknowledgeNotification,
  // subscribeToNotications,
  getHashSSN,
};
