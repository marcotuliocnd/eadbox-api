const eadbox = require("../src/eadbox-api")

async function start() {
  const responseInsert = await eadbox.registerUser(apiObject, userObject);
  console.log(responseInsert);
}

start();
