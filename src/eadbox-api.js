const axios = require('axios');

exports.registerUser = async (apiObject, userObject) => {
  try {
    return await axios.post(apiObject.url + '/api/signup', userObject);
  } catch (err){
    return err;
  }
}
