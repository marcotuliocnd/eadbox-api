const eadbox = require("../src/eadbox-api")
const models = require('./models')

async function start() {
  const marco = {};
  marco.email = 'api@marcotuliocnd.tech';
  marco.password = '123abc';
  marco.password_confirmation = '123abc';
  marco.name = 'Api Teste';
  marco.custom_fields = { empresa: 'Marco', 'tipo-pessoa': 'Colaborador' }

  const response = await eadbox.createNewUser('https://unispk.com.br', marco);

  console.log(response);
}

start();
