const eadbox = require("../src/eadbox-api")

async function start() {
  const userObject = {
    email: 'contato@marcotuliocnd.tech',
    password: 'ead2019',
    password_confirmation: 'ead2019',
    name: '(API) Marco Túlio',
    home_phone: 3438327543,
    mobile_phone: 43999085002,
    document_id: '110.527.796-89',
    profession: 'Programador',
    street: 'Rua João Pereira da Silva',
    number: 101,
    complement: 'Apto. 202',
    neighborhood: 'Santa Mônica',
    zip: '38408-198',
    city: 'Uberlândia',
    state: 'Minas Gerais',
    send_rest_password_mail: true
  }

  const apiObject = {
    url: 'https://universidade-spk.eadbox.com',
    token: 'CEjkke6yB9RRJZ6y57S1'
  }

  const responseRegister = await eadbox.registerUser(apiObject, userObject);
  console.log(responseRegister);
}

start();
