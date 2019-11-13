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

exports.updateUserInformation = async (url, adminAuthToken, userId, userObject) => {
  urlWithToken = url + '/api/admin/users/' + userId + '?auth_token=' + adminAuthToken;
  try {
    const updateResponse = await axios.patch(urlWithToken, userObject);
    return updateResponse.data.valid;
  } catch (error) {
    console.warn(error);
    console.error('Não foi possível enviar a requisição de updateUserInformation');
    return false;
  }
}

exports.blockUser = async (url, adminAuthToken, userName) => {
  const userId = await this.getUserIdFromName(url, adminAuthToken, userName);
  const urlWithToken = url + '/api/admin/users/' + userId + '?auth_token=' + adminAuthToken;
  try {
    const blockResponse = await axios.delete(urlWithToken);
    return blockResponse.data.valid;
  } catch (error) {
    console.warn(error);
    console.error('Não foi possível alcançar o host destino');
    return false;
  }
}

exports.getUserIdFromName = async (url, adminAuthToken, userName) => {
  const allUsers = await this.getAllUsersActive(url, adminAuthToken);
  for (userArray of allUsers) {
    for (user of userArray) {
      if (user.name == userName)
        return user.user_id;
    }
  }
}

exports.getNumberOfUsers = async (url, adminAuthToken) => {
  let usersJson = await this.getAllUsersActive(url, adminAuthToken);
  let length = 0;
  for (let page of usersJson) {
    length += page.length;
  }
  return length;
}

exports.getAllUsersActive = async (url, adminAuthToken) => {
  let urlWithToken;
  let allUsers = [];
  let page = 1;
  let responseJsonUsersPage
  while (true) {
    try {
      urlWithToken = url + '/api/admin/users?page=' + page + '&active=true&auth_token=' + adminAuthToken;
      responseJsonUsersPage = await axios.get(urlWithToken);
    } catch (error) {
      return [];
    }
    if (responseJsonUsersPage.data[0] == undefined)
      break;
    allUsers.push(responseJsonUsersPage.data);
    page++;
  }
  return allUsers;
}

exports.unBlockUser = async (url, adminAuthToken, userName) => {
  const userId = await this.getUserIdLockedFromName(url, adminAuthToken, userName);
  const urlWithToken = url + '/api/admin/users/' + userId + '/unlock?auth_token=' + adminAuthToken;
  try {
    const unBlockResponse = await axios.post(urlWithToken);
    return unBlockResponse.data.valid;
  } catch (error) {
    console.warn(error);
    console.error('Não foi possível alcançar o host destino');
    return false;
  }
}

exports.getUserIdLockedFromName = async (url, adminAuthToken, userName) => {
  const allUsers = await this.getAllUsersLocked(url, adminAuthToken);
  for (userArray of allUsers) {
    for (user of userArray) {
      if (user.name == userName)
        return user.user_id;
    }
  }
}

exports.getNumberOfUsersLocked = async (url, adminAuthToken) => {
  let usersJson = await this.getAllUsersLocked(url, adminAuthToken);
  let length = 0;
  for (let page of usersJson) {
    length += page.length;
  }
  return length;
}

exports.getAllUsersLocked = async (url, adminAuthToken) => {
  let urlWithToken;
  let allUsers = [];
  let page = 1;
  let responseJsonUsersPage
  while (true) {
    try {
      urlWithToken = url + '/api/admin/users?page=' + page + '&locked=true&auth_token=' + adminAuthToken;
      responseJsonUsersPage = await axios.get(urlWithToken);
    } catch (error) {
      return [];
    }
    if (responseJsonUsersPage.data[0] == undefined)
      break;
    allUsers.push(responseJsonUsersPage.data);
    page++;
  }
  return allUsers;
}

exports.getNumberOfCourses = async (url, adminAuthToken) => {
  let coursesJson = await this.getAllCourses(url, adminAuthToken);
  let length = 0;
  for (let page of coursesJson) {
    length += page.length;
  }
  return length;
}

exports.getAllCourses = async (url, adminAuthToken) => {
  let urlWithToken;
  let allCourses = [];
  let page = 1;
  let responseJsonCoursesPage
  while (true) {
    try {
      urlWithToken = url + '/api/admin/courses?page=' + page + '&auth_token=' + adminAuthToken;
      responseJsonCoursesPage = await axios.get(urlWithToken);
    } catch (error) {
      return [];
    }
    if (responseJsonCoursesPage.data[0] == undefined)
      break;
    allCourses.push(responseJsonCoursesPage.data);
    page++;
  }
  return allCourses;
}

exports.getNumberOfTracks = async (url, adminAuthToken) => {
  let tracksJson = await this.getAllTracks(url, adminAuthToken);
  let length = 0;
  for (let page of tracksJson) {
    length += page.length;
  }
  return length;
}

exports.getAllTracks = async (url, adminAuthToken) => {
  let urlWithToken;
  let allTracks = [];
  let page = 1;
  let responseJsonTracksPage
  while (true) {
    try {
      urlWithToken = url + '/api/admin/tracks?page=' + page + '&active=true&auth_token=' + adminAuthToken;
      responseJsonTracksPage = await axios.get(urlWithToken);
    } catch (error) {
      return [];
    }
    if (responseJsonTracksPage.data[0] == undefined)
      break;
    allTracks.push(responseJsonTracksPage.data);
    page++;
  }
  return allTracks;
}

exports.getScoreRanking = async (url) => {
  try {
    const rankingScore = await axios.get(url + '/api/rankings/score');
    return rankingScore.data;
  } catch (error) {
    console.error('Não foi possível geral o ranking por score');
    console.error(error);
  }
}

exports.getBadgeRanking = async (url) => {
  try {
    const rankingBadge = await axios.get(url + '/api/rankings/badges');
    return rankingBadge.data;
  } catch (error) {
    console.error('Não foi possível geral o ranking por badges');
    console.error(error);
  }
}

exports.getCollectorRanking = async (url) => {
  try {
    const rankingCollector = await axios.get(url + '/api/rankings/collectors');
    return rankingCollector.data;
  } catch (error) {
    console.error('Não foi possível geral o ranking por collectors');
    console.error(error);
  }
}
