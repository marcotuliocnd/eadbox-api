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
  } catch (err) {
    return err;
  }
}

exports.getNumberOfCourses = async (url, adminAuthToken) => {
  var coursesArray = await this.getAllCoursesSlugs(url, adminAuthToken);
  return coursesArray.length;
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

exports.getNumberOfUsers = async (url, adminAuthToken) => {
  let usersJson = await this.getJsonWithAllUsers(url, adminAuthToken);
  return usersJson.length;
}

exports.getJsonWithAllUsers = async (url, adminAuthToken) => {
  let urlWithToken = url + '/api/admin/users?page=1&created_at=2019-02-25T11:23:54.275-03:00&active=true&auth_token=' + adminAuthToken;
  try {
    let response = await axios.get(urlWithToken);
    if (response.status != 200)
      return null;

    let pageNumber = 1;
    while (response.data != []) {
      pageNumber++;
      urlWithToken = url + '/api/admin/users?page='+ pageNumber + '&active=true&auth_token=' + adminAuthToken;
      try {
        response = await axios.get(urlWithToken);
        if (response.status != 200)
          return null;
        allUsers.push(JSON.parse(response.data));
      } catch (error) {
        return null;
      }

    }
    return response.data;
  } catch (error) {
    return null;
  }
}
