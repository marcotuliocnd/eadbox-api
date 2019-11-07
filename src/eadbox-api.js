const axios = require('axios');

const makeLoginFromEmailAndPassword = async (url, userEmailPassword) => {
  try {
    return (await axios.post(url + '/api/login', userEmailPassword)).data;
  } catch (error) {
    return err;
  }
}

exports.getUserAuthTokenFromLogin = async (url, userEmailPassword) => {
  try {
    return (await makeLoginFromEmailAndPassword(url, userEmailPassword)).authentication_token;
  } catch (err) {
    return err;
  }
}

exports.createNewUser = async (url, userObject) => {
  try {
    return (await axios.post(url + '/api/signup', userObject)).data;
  } catch (err) {
    return err;
  }
}

exports.addCourseForUser = async (url, courseSlug, userAuthToken) => {
  try {
    return (await axios.post(url + '/api/user/subscriptions?auth_token=' + userAuthToken, { course_slug: courseSlug })).data;
  } catch {
    return err;
  }
}
