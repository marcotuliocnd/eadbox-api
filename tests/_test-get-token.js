const eadbox = require("../src/eadbox-api")
const models = require('./models')

async function start() {
  const url = 'https://unispk.com.br'
  const marco = {};
  marco.email = 'marco@marcotuliocnd.tech';
  marco.password = '123abc';
  marco.password_confirmation = '123abc';
  marco.name = 'Marco';
  const userUpdate = {
    custom_fields: {
        'empresa': 'Spk Sistemas',
        'tipo-pessoa': 'Cliente'
      }
    }

  // eadbox.createNewUser(url, marco);
  const userId = await eadbox.makeLoginFromEmailAndPassword(url, { 'email':'marco@marcotuliocnd.tech', 'password':'123abc' } );
  const adminAuthToken = await eadbox.getUserAuthTokenFromLogin(url, models.adminEmailAndPassword);
  const updateResponse = await eadbox.updateUserInformation(url, adminAuthToken, userId.user.user_id, userUpdate);
  if (updateResponse == true)
    console.log('success');
  else
    console.log('error');
}

start();
