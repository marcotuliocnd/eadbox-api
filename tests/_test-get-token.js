const eadbox = require("../src/eadbox-api")
const models = require('./models')

async function start() {
  const url = 'https://unispk.com.br'
  const adminAuthToken = await eadbox.getUserAuthTokenFromLogin(url, models.adminEmailAndPassword);
  const num = await eadbox.getNumberOfTracks(url, adminAuthToken);
  console.log(`A plataforma possui ${num} trilhas publicadas`);
  const allCourses = await eadbox.getAllTracks(url, adminAuthToken);
  console.log(allCourses);
}

start();
