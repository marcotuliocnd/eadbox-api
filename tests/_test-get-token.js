const eadbox = require("../src/eadbox-api")
const models = require('./models')

async function start() {
  const jsonGetToken = await eadbox.getUserAuthTokenFromLogin('https://unispk.com.br', models.emailAndPassword);

  console.log(jsonGetToken);
}

start();
