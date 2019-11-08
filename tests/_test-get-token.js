const eadbox = require("../src/eadbox-api")
const models = require('./models')

async function start() {
    const adminToken = await eadbox.getUserAuthTokenFromLogin('https://unispk.com.br', models.adminEmailAndPassword);
    console.log('Peguei o token do admin: ' + adminToken);

    const marcoInfo = await eadbox.makeLoginFromEmailAndPassword('https://unispk.com.br', models.emailAndPassword);
    console.log(marcoInfo);

    const addedCourse = await eadbox.addCourseForUser('https://unispk.com.br', 'financeiro-gestor', marcoAuthToken);
    console.log("Curso foi adicionado com sucesso");
}

start();
