const eadbox = require("../src/eadbox-api")
const models = require('./models')

async function start() {
  const adminAuthToken = await eadbox.getUserAuthTokenFromLogin('https://unispk.com.br', models.adminEmailAndPassword);
  var allUsers = await eadbox.getJsonWithAllUsers('https://unispk.com.br', adminAuthToken);

  console.log(allUsers);

  const numberOfCourses = await eadbox.getNumberOfUsers('https://unispk.com.br', adminAuthToken);

  console.log(numberOfCourses + ' alunos cadastrados');
  console.log(adminAuthToken);
}

start();
