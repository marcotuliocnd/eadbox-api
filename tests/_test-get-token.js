const eadbox = require("../src/eadbox-api")
const models = require('./models')

async function start() {
  const url = 'https://unispk.com.br'
  const adminAuthToken = await eadbox.getUserAuthTokenFromLogin(url, models.adminEmailAndPassword);
  const userId = await eadbox.getUserIdFromName(url, adminAuthToken, '115025 - Carlos Ricci');
  console.log(userId);
}

start();
