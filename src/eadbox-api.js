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

exports.getAllCoursesSlugs = async (url, adminAuthToken) => {
  let urlWithToken = url + '/api/admin/courses?auth_token=' + adminAuthToken;
  try {
    let response = await axios.get(urlWithToken);
    if (response.status != 200)
      return null;

    let coursesJson = response.data;
    var courseSlugsArray = [];
    for (course in coursesJson)
      courseSlugsArray[course] = coursesJson[course].course_slug;
    return courseSlugsArray;
  } catch (error) {
    return null;
  }
}
