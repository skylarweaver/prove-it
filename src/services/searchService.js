const axios = require('axios'); // promised based requests - like fetch()
// Generate the API enpoint URL for all API requests
// proxy should be "/" in dev as React/node allows proxy to be set there during development (but not prod)
const proxy = process.env.REACT_APP_PROXY;

const getSearchResults = async (query, auth) => {
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${auth}`,
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.get(`${proxy}/api/v1/subjects/search?q=${query}`, axiosConfig);
    return res;
  } catch (error) {
    return error;
  }
};

const getSearchDetails = async (queryString, clearanceDecisionId, auth) => {
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${auth}`,
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.get(`${proxy}/api/v1/subjects/${queryString}/clearancedetails/${clearanceDecisionId}`, axiosConfig);
    return res;
  } catch (error) {
    return error;
  }
};

const getClearanceHistory = async (queryString, clearanceDecisionId, auth) => {
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  };
  try {
    const res = await axios.get(`${proxy}/api/v1/subjects/${queryString}/clearancedecision/${clearanceDecisionId}/clearancehistory`, axiosConfig);
    return res;
  } catch (error) {
    return error;
  }
};

const getInquiries = async (queryString, auth) => {
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  };
  try {
    const res = await axios.get(`${proxy}/api/v1/queryrecords?=${queryString}`, axiosConfig);
    return res;
  } catch (error) {
    return error;
  }
};

const submitUpdateRequest = async (queryString, clearanceDecisionId, requestedStatusId, reasonCode, auth) => {
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${auth}`,
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.put(
      `${proxy}/api/v1/subjects/${queryString}/clearancedecision/${clearanceDecisionId}/status`,
      { requestedStatus: requestedStatusId, reasonCode },
      axiosConfig,
    );
    return res;
  } catch (error) {
    return error;
  }
};

const addToAccessList = async (clearanceDecisionId, auth) => {
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${auth}`,
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post(`${proxy}/api/v1/subjects/addtoaccesslist`, clearanceDecisionId, axiosConfig);
    return res;
  } catch (error) {
    return error;
  }
};

const removeFromAccessList = async (removalBody, auth) => {
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${auth}`,
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post(`${proxy}/api/v1/subjects/removefromaccesslist`, removalBody, axiosConfig);
    return res;
  } catch (error) {
    return error;
  }
};

const getClearanceVerification = async (queryString, clearanceDecisionId, auth) => {
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  };
  try {
    const res = await axios.get(`${proxy}/api/v1/subjects/${queryString}/clearancedetails/${clearanceDecisionId}/verify`, axiosConfig);
    return res;
  } catch (error) {
    return error;
  }
};

export {
  getSearchResults,
  getSearchDetails,
  getClearanceHistory,
  getInquiries,
  addToAccessList,
  removeFromAccessList,
  submitUpdateRequest,
  getClearanceVerification,
};
