const axios = require('axios');

const makeLoginFromEmailAndPassword = async (url, userEmailPassword) => {
  try {
    return (await axios.post(url + '/api/login', userEmailPassword)).data;
  } catch (error) {
    return err;
  }
}

exports.getAuthTokenFromLogin = async (url, userEmailPassword) => {
  try {
    return (await makeLoginFromEmailAndPassword(url, userEmailPassword)).authentication_token;
  } catch (err) {
    return err;
  }
}

exports.registerUser = async (url, userObject) => {
  try {
    return await axios.post(url + '/api/signup', userObject);
  } catch (err) {
    return err;
  }
}

exports.giveCourseForUser = async (url, courseSlug, userSlug) => {
  try {
    return await axios.post(url + '/api/user/subscriptions?auth_token=' + token, {
      course_slug: courseSlug
    });
  } catch {
    return err;
  }
}
