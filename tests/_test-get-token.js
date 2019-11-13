const eadbox = require("../src/eadbox-api")
const models = require('./models')

async function start() {
  const url = 'https://unispk.com.br'
  const adminAuthToken = await eadbox.getUserAuthTokenFromLogin(url, models.adminEmailAndPassword);

  const unblock = await eadbox.unBlockUser(url, adminAuthToken, 'Marco Tulio Candeo - SPK');

  console.log(unblock);
}

start();
