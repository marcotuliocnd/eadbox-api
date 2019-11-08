const eadbox = require("../src/eadbox-api")
const models = require('./models')

async function start() {
  const adminAuthToken = await eadbox.getUserAuthTokenFromLogin('https://unispk.com.br', models.adminEmailAndPassword);
  var allCourses = await eadbox.getAllCoursesSlugs('https://unispk.com.br', adminAuthToken);

  for (course in allCourses)
    console.log(allCourses[course]);
}

start();
