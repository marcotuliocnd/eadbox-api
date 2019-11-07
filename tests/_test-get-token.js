const eadbox = require("../src/eadbox-api")
const models = require('./models')

async function start() {
  try {
      const marcoAuthToken = await eadbox.getUserAuthTokenFromLogin('https://unispk.com.br', models.emailAndPassword);
      console.log('Peguei o token: ' + marcoAuthToken);
  } catch (err) {
    console.log('Algo deu errado na hora de pegar o token =(');
  }

  try {
      const addedCourse = await eadbox.addCourseForUser('https://unispk.com.br', 'financeiro-gestor', this.marcoAuthToken);
      console.log("Curso foi adicionado com sucesso");
  } catch (err) {
    console.log(err)
  }


}

start();
