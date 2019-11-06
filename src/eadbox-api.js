const axios = require('axios');

export async function registerUser(apiObject, userObject) {
  try {
    const responseSignUp = await axios.post(apiObject.url + '/api/signup', userObject);
    console.log(responseSignUp);
  } catch (err)
    console.log (err);
}
