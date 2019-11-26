const Eadbox = require("../src/eadbox-api");
const config = require('./config');

async function start() {
  url = 'https://unispk.com.br';
  const ead = new Eadbox(url);

  try {
    const adminAuthToken = await ead.getUserAuthTokenFromLogin(config.adminEmailAndPassword);
    console.log(adminAuthToken);
  } catch (error) {
    console.error("Não foi possível buscar o auth token");
    console.warn(error);
    return;
  }
}

start();
