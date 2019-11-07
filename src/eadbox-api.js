const axios = require('axios');

exports.getTokenFromUserSlug = async (url, userSlug) => {
  
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
      course_slug: courseSlug;
    });
  } catch {
    return err;
  }
}
