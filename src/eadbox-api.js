const axios = require('axios');

exports.makeLoginFromEmailAndPassword = async (url, userEmailPassword) => {
  try {
    return (await axios.post(url + '/api/login', userEmailPassword)).data;
  } catch (error) {
    return err;
  }
}

exports.getUserAuthTokenFromLogin = async (url, userEmailPassword) => {
  try {
    return (await this.makeLoginFromEmailAndPassword(url, userEmailPassword)).authentication_token;
  } catch (err) {
    return err;
  }
}

exports.getUserIdFromLogin = async (url, userEmailPassword) => {
  try {
    return (await this.makeLoginFromEmailAndPassword(url, userEmailPassword)).user.user_id;
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

exports.addCourseForUser = async (url, courseSlug, adminAuthToken) => {
  try {
    return (await axios.post(url + '/api/admin/subscriptions/' + '1' + '?auth_token=' + adminAuthToken, { course_slug: courseSlug })).data;
  } catch (err) {
    return err;
  }
}
