const eadbox = require("../src/eadbox-api")
const models = require('./models')

async function start() {
  const url = 'https://unispk.com.br'
  const adminAuthToken = await eadbox.getUserAuthTokenFromLogin(url, models.adminEmailAndPassword);
  console.log(await eadbox.getScoreRanking(url));
  console.log(await eadbox.getBadgeRanking(url));
  console.log(await eadbox.getCollectorRanking(url));
}

start();
