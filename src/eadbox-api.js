const axios = require('axios');

class Eadbox {
  constructor(url) {
    this.api = axios.create({
      baseURL: url
    });
  }

  async makeLoginFromEmailAndPassword(userEmailPassword) {
    try {
      return (await this.api.post('/api/login', userEmailPassword)).data;
    } catch (error) {
      return err;
    }
  }

  async getUserAuthTokenFromLogin(userEmailPassword) {
    try {
      return (await this.makeLoginFromEmailAndPassword(userEmailPassword)).authentication_token;
    } catch (err) {
      return err;
    }
  }

  async addCourseForUser(adminAuthToken, userName, courseName) {
    const user_id = await this.getUserIdFromName(adminAuthToken, userName);
    const urlWithToken = '/api/admin/subscriptions?auth_token=' + adminAuthToken;
    const course_id = await this.getCourseIdFromName(adminAuthToken, courseName);
    try {
      const addResponse = await this.api.post(urlWithToken, {
        user_id,
        course_id
      });
      return addResponse.data.valid;
    } catch (error) {
      console.warn(error);
      console.error('Não foi possível alcançar o host destino');
      return false;
    }
  }

  async getCourseIdFromName(adminAuthToken, courseName) {
    const allCourses = await this.getAllCourses(adminAuthToken);
    for (let courseArray of allCourses) {
      for (let course of courseArray) {
        if (course.title == courseName)
          return course.course_id;
      }
    }
  }

  async getAllCourses(adminAuthToken) {
    let urlWithToken;
    let allCourses = [];
    let page = 1;
    let responseJsonCoursesPage
    while (true) {
      try {
        urlWithToken = '/api/admin/courses?page=' + page + '&auth_token=' + adminAuthToken;
        responseJsonCoursesPage = await this.api.get(urlWithToken);
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

  async getUserIdFromName(adminAuthToken, userName) {
    const allUsers = await this.getAllUsersActive(adminAuthToken);
    for (let userArray of allUsers) {
      for (let user of userArray) {
        if (user.name == userName)
          return user.user_id;
      }
    }
  }

  async getNumberOfUsers(adminAuthToken) {
    let usersJson = await this.getAllUsersActive(adminAuthToken);
    let length = 0;
    for (let page of usersJson) {
      length += page.length;
    }
    return length;
  }

  async getAllUsersActive(adminAuthToken) {
    let urlWithToken;
    let allUsers = [];
    let page = 1;
    let responseJsonUsersPage
    while (true) {
      try {
        urlWithToken = '/api/admin/users?page=' + page + '&active=true&auth_token=' + adminAuthToken;
        responseJsonUsersPage = await this.api.get(urlWithToken);
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

  async createNewUser(userObject) {
    try {
      return (await this.api.post('/api/signup', userObject)).data;
    } catch (err) {
      return err;
    }
  }

  async updateUserInformation(adminAuthToken, userId, userObject) {
    const urlWithToken = '/api/admin/users/' + userId + '?auth_token=' + adminAuthToken;
    try {
      const updateResponse = await this.api.patch(urlWithToken, userObject);
      return updateResponse.data.valid;
    } catch (error) {
      console.warn(error);
      console.error('Não foi possível enviar a requisição de updateUserInformation');
      return false;
    }
  }

  async blockUser(adminAuthToken, userName) {
    const userId = await this.getUserIdFromName(adminAuthToken, userName);
    const urlWithToken = '/api/admin/users/' + userId + '?auth_token=' + adminAuthToken;
    try {
      const blockResponse = await this.api.delete(urlWithToken);
      return blockResponse.data.valid;
    } catch (error) {
      console.warn(error);
      console.error('Não foi possível alcançar o host destino');
      return false;
    }
  }

  async unBlockUser(adminAuthToken, userName) {
    const userId = await this.getUserIdLockedFromName(adminAuthToken, userName);
    const urlWithToken = '/api/admin/users/' + userId + '/unlock?auth_token=' + adminAuthToken;
    try {
      const unBlockResponse = await this.api.post(urlWithToken);
      return unBlockResponse.data.valid;
    } catch (error) {
      console.warn(error);
      console.error('Não foi possível alcançar o host destino');
      return false;
    }
  }

  async getUserIdLockedFromName(adminAuthToken, userName) {
    const allUsers = await this.getAllUsersLocked(adminAuthToken);
    for (let userArray of allUsers) {
      for (let user of userArray) {
        if (user.name == userName)
          return user.user_id;
      }
    }
  }

  async getNumberOfUsersLocked(adminAuthToken) {
    let usersJson = await this.getAllUsersLocked(adminAuthToken);
    let length = 0;
    for (let page of usersJson) {
      length += page.length;
    }
    return length;
  }

  async getAllUsersLocked(adminAuthToken) {
    let urlWithToken;
    let allUsers = [];
    let page = 1;
    let responseJsonUsersPage
    while (true) {
      try {
        urlWithToken = '/api/admin/users?page=' + page + '&locked=true&auth_token=' + adminAuthToken;
        responseJsonUsersPage = await this.api.get(urlWithToken);
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

  async getNumberOfTracks(adminAuthToken) {
    let tracksJson = await this.getAllTracks(adminAuthToken);
    let length = 0;
    for (let page of tracksJson) {
      length += page.length;
    }
    return length;
  }

  async getAllTracks(adminAuthToken) {
    let urlWithToken;
    let allTracks = [];
    let page = 1;
    let responseJsonTracksPage
    while (true) {
      try {
        urlWithToken = '/api/admin/tracks?page=' + page + '&active=true&auth_token=' + adminAuthToken;
        responseJsonTracksPage = await this.api.get(urlWithToken);
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

  async getScoreRanking() {
    try {
      const rankingScore = await this.api.get('/api/rankings/score');
      return rankingScore.data;
    } catch (error) {
      console.error('Não foi possível geral o ranking por score');
      console.error(error);
    }
  }

  async getBadgeRanking() {
    try {
      const rankingBadge = await this.api.get('/api/rankings/badges');
      return rankingBadge.data;
    } catch (error) {
      console.error('Não foi possível geral o ranking por badges');
      console.error(error);
    }
  }

  async getCollectorRanking() {
    try {
      const rankingCollector = await this.api.get('/api/rankings/collectors');
      return rankingCollector.data;
    } catch (error) {
      console.error('Não foi possível geral o ranking por collectors');
      console.error(error);
    }
  }
}

module.exports = Eadbox;
