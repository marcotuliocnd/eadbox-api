const eadbox = require("../src/eadbox-api")
const models = require('./models')

async function start() {
  const url = 'https://unispk.com.br'
  const adminAuthToken = await eadbox.getUserAuthTokenFromLogin(url, models.adminEmailAndPassword);

  const userToken = await eadbox.addCourseForUser(url, adminAuthToken, 'Marco Tulio Candeo - SPK' , 'Fiscal');
  console.log(userToken);
}

start();
